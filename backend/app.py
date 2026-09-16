from flask import Flask, request, jsonify
from flask_cors import CORS

from database import get_db, init_db

from datetime import datetime
import secrets


app = Flask(__name__)

# Allow your HTML/JS frontend to communicate with Flask
CORS(app)


# Create database/table
init_db()


# =====================================================
# HOME
# =====================================================

@app.route("/")
def home():

    return "JAIN Smart Visitor Backend Running"


# =====================================================
# REGISTER VISITOR
# =====================================================

@app.route("/api/register", methods=["POST"])
def register():

    try:

        data = request.get_json()

        if not data:

            return jsonify({
                "success": False,
                "message": "No visitor data received."
            }), 400


        # Generate unique visitor ID
        visitor_id = (
            "VIS" +
            secrets.token_hex(4).upper()
        )


        created_at = datetime.now().isoformat()


        conn = get_db()


        conn.execute("""
            INSERT INTO visitors
            (
                visitor_id,
                name,
                email,
                phone,
                id_type,
                id_number,
                host,
                department,
                purpose,
                visit_date,
                visit_time,
                status,
                created_at
            )

            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        """, (

            visitor_id,

            data.get("name"),

            data.get("email"),

            data.get("phone"),

            data.get("idType"),

            data.get("idNumber"),

            data.get("host"),

            data.get("department"),

            data.get("purpose"),

            data.get("visitDate"),

            data.get("visitTime"),

            "PENDING",

            created_at

        ))


        conn.commit()

        conn.close()


        return jsonify({

            "success": True,

            "message":
                "Visitor registered successfully.",

            "visitor_id":
                visitor_id,

            "status":
                "PENDING"

        })


    except Exception as e:

        print("REGISTER ERROR:", e)

        return jsonify({

            "success": False,

            "message": str(e)

        }), 500


# =====================================================
# GET ALL VISITORS
# =====================================================

@app.route("/api/visitors", methods=["GET"])
def get_visitors():

    try:

        conn = get_db()


        visitors = conn.execute("""
            SELECT *
            FROM visitors
            ORDER BY id DESC
        """).fetchall()


        conn.close()


        return jsonify([

            dict(visitor)

            for visitor in visitors

        ])


    except Exception as e:

        print("GET VISITORS ERROR:", e)

        return jsonify({

            "success": False,

            "message": str(e)

        }), 500


# =====================================================
# GET ONE VISITOR
# =====================================================

@app.route(
    "/api/visitor/<visitor_id>",
    methods=["GET"]
)
def get_visitor(visitor_id):

    try:

        conn = get_db()


        visitor = conn.execute("""
            SELECT *
            FROM visitors
            WHERE visitor_id = ?
        """, (

            visitor_id,

        )).fetchone()


        conn.close()


        if visitor is None:

            return jsonify({

                "success": False,

                "message":
                    "Visitor not found."

            }), 404


        return jsonify({

            "success": True,

            "visitor":
                dict(visitor)

        })


    except Exception as e:

        print("GET VISITOR ERROR:", e)

        return jsonify({

            "success": False,

            "message": str(e)

        }), 500


# =====================================================
# UPDATE STATUS
# =====================================================

@app.route(
    "/api/visitor/<visitor_id>/status",
    methods=["PUT"]
)
def update_status(visitor_id):

    try:

        data = request.get_json()

        status = data.get("status")


        if not status:

            return jsonify({

                "success": False,

                "message":
                    "Status is required."

            }), 400


        conn = get_db()


        result = conn.execute("""
            UPDATE visitors

            SET status = ?

            WHERE visitor_id = ?
        """, (

            status,

            visitor_id

        ))


        conn.commit()


        if result.rowcount == 0:

            conn.close()

            return jsonify({

                "success": False,

                "message":
                    "Visitor not found."

            }), 404


        conn.close()


        return jsonify({

            "success": True,

            "visitor_id":
                visitor_id,

            "status":
                status

        })


    except Exception as e:

        print("STATUS UPDATE ERROR:", e)

        return jsonify({

            "success": False,

            "message": str(e)

        }), 500


# =====================================================
# CHECK IN
# =====================================================

@app.route(
    "/api/visitor/<visitor_id>/checkin",
    methods=["PUT"]
)
@app.route(
    "/api/visitor/<visitor_id>/checkin",
    methods=["PUT"]
)
def check_in(visitor_id):

    try:

        conn = get_db()

        visitor = conn.execute("""
            SELECT status
            FROM visitors
            WHERE visitor_id = ?
        """, (
            visitor_id,
        )).fetchone()

        if visitor is None:

            conn.close()

            return jsonify({
                "success": False,
                "message": "Visitor not found."
            }), 404

        if visitor["status"] != "APPROVED":

            conn.close()

            return jsonify({
                "success": False,
                "message": "Visitor is not approved."
            }), 400

        check_in_time = datetime.now().isoformat()

        conn.execute("""
            UPDATE visitors
            SET
                status = 'CHECKED_IN',
                check_in_time = ?
            WHERE visitor_id = ?
        """, (
            check_in_time,
            visitor_id
        ))

        conn.commit()
        conn.close()

        return jsonify({
            "success": True,
            "visitor_id": visitor_id,
            "status": "CHECKED_IN",
            "check_in_time": check_in_time
        })

    except Exception as e:

        print("CHECK-IN ERROR:", e)

        return jsonify({
            "success": False,
            "message": str(e)
        }), 500

# =====================================================
# CHECK OUT
# =====================================================

@app.route(
    "/api/visitor/<visitor_id>/checkout",
    methods=["PUT"]
)
def check_out(visitor_id):

    try:

        conn = get_db()


        check_out_time = datetime.now().isoformat()


        result = conn.execute("""
            UPDATE visitors

            SET
                status = 'COMPLETED',
                check_out_time = ?

            WHERE visitor_id = ?
        """, (

            check_out_time,

            visitor_id

        ))


        conn.commit()


        if result.rowcount == 0:

            conn.close()

            return jsonify({

                "success": False,

                "message":
                    "Visitor not found."

            }), 404


        conn.close()


        return jsonify({

            "success": True,

            "visitor_id":
                visitor_id,

            "status":
                "COMPLETED",

            "check_out_time":
                check_out_time

        })


    except Exception as e:

        print("CHECK-OUT ERROR:", e)

        return jsonify({

            "success": False,

            "message": str(e)

        }), 500


# =====================================================
# RUN SERVER
# =====================================================

if __name__ == "__main__":

    app.run(
        host="0.0.0.0",
        port=5000,
        debug=True
    )