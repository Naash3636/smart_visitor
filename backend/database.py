import sqlite3
import os


# Always keep the database inside the backend folder
BASE_DIR = os.path.dirname(os.path.abspath(__file__))

DATABASE = os.path.join(
    BASE_DIR,
    "visitor.db"
)


def get_db():

    conn = sqlite3.connect(DATABASE)

    conn.row_factory = sqlite3.Row

    return conn


def init_db():

    conn = get_db()

    conn.execute("""
        CREATE TABLE IF NOT EXISTS visitors (

            id INTEGER PRIMARY KEY AUTOINCREMENT,

            visitor_id TEXT UNIQUE NOT NULL,

            name TEXT NOT NULL,

            email TEXT,

            phone TEXT,

            id_type TEXT,

            id_number TEXT,

            host TEXT,

            department TEXT,

            purpose TEXT,

            visit_date TEXT,

            visit_time TEXT,

            status TEXT DEFAULT 'PENDING',

            created_at TEXT,

            check_in_time TEXT,

            check_out_time TEXT

        )
    """)

    conn.commit()

    conn.close()


if __name__ == "__main__":

    init_db()

    print("Database created successfully.")

    print("Database location:")

    print(DATABASE)