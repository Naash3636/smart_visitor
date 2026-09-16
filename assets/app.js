/* =====================================================
   HOME PAGE
===================================================== */

function bookVisit() {

    window.location.href = "register.html";

}


function visitorLogin() {

    alert(
        "Visitor Login\n\n" +
        "Login module will be available soon."
    );

}


/* =====================================================
   VISITOR REGISTRATION
===================================================== */

document.addEventListener("DOMContentLoaded", function () {

    const visitorForm =
        document.getElementById("visitorForm");


    // Only run this code if registration form exists

    if (!visitorForm) {
        return;
    }


    visitorForm.addEventListener("submit", function (event) {

        // IMPORTANT:
        // Prevent the page from refreshing

        event.preventDefault();


        /* ---------------------------------------------
           GET FORM VALUES
        --------------------------------------------- */

        const name =
            document.getElementById("visitorName").value.trim();

        const email =
            document.getElementById("visitorEmail").value.trim();

        const phone =
            document.getElementById("visitorPhone").value.trim();

        const idType =
            document.getElementById("idType").value;

        const idNumber =
            document.getElementById("idNumber").value.trim();

        const host =
            document.getElementById("host").value;

        const department =
            document.getElementById("department").value;

        const purpose =
            document.getElementById("purpose").value.trim();

        const visitDate =
            document.getElementById("visitDate").value;

        const visitTime =
            document.getElementById("visitTime").value;


        /* ---------------------------------------------
           CHECK CONFIRMATION
        --------------------------------------------- */

        const terms =
            document.getElementById("terms").checked;


        if (!terms) {

            alert(
                "Please confirm that the information " +
                "provided is accurate."
            );

            return;
        }


        /* ---------------------------------------------
           GENERATE VISITOR ID
        --------------------------------------------- */

        const visitorID =
            "VIS" +
            Math.floor(
                100000 +
                Math.random() * 900000
            );


        /* ---------------------------------------------
           CREATE VISITOR OBJECT
        --------------------------------------------- */

        const visitor = {

            visitorID: visitorID,

            name: name,

            email: email,

            phone: phone,

            idType: idType,

            idNumber: idNumber,

            host: host,

            department: department,

            purpose: purpose,

            visitDate: visitDate,

            visitTime: visitTime,

            status: "PENDING",

            createdAt:
                new Date().toISOString()

        };


        /* ---------------------------------------------
           SAVE DATA
        --------------------------------------------- */

        localStorage.setItem(
            "visitorData",
            JSON.stringify(visitor)
        );


        /* ---------------------------------------------
           CONFIRMATION
        --------------------------------------------- */

        alert(
            "✓ VISIT REQUEST SUBMITTED\n\n" +

            "Visitor ID: " +
            visitorID +

            "\n\n" +

            "Status: PENDING APPROVAL\n\n" +

            "Your request has been sent to the host."
        );


        /* ---------------------------------------------
           GO TO STATUS PAGE
        --------------------------------------------- */

        window.location.href =
            "visitor-status.html";

    });

});

/* =====================================================
   HOST LOGIN
===================================================== */

document.addEventListener("DOMContentLoaded", function () {

    const hostLoginForm =
        document.getElementById("hostLoginForm");


    if (!hostLoginForm) {
        return;
    }


    hostLoginForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            const email =
                document.getElementById(
                    "hostEmail"
                ).value.trim();


            const password =
                document.getElementById(
                    "hostPassword"
                ).value.trim();


            /*
             * DEMO LOGIN
             */

            if (
                email === "dean@jain.edu" &&
                password === "123456"
            ) {

                localStorage.setItem(
                    "hostLoggedIn",
                    "true"
                );


                localStorage.setItem(
                    "hostName",
                    "Dean - Academics"
                );


                window.location.href =
                    "host-dashboard.html";


            } else {

                alert(
                    "Invalid login details.\n\n" +
                    "Use the demo account shown below."
                );

            }

        }
    );

});

window.addEventListener(
    "pageshow",
    function(event) {

        if (
            event.persisted ||
            localStorage.getItem(
                "hostLoggedIn"
            ) !== "true"
        ) {

            window.location.replace(
                "host-login.html"
            );

        }

    }
);

window.addEventListener(
    "pageshow",
    function(event) {

        if (
            event.persisted ||
            localStorage.getItem(
                "securityLoggedIn"
            ) !== "true"
        ) {

            window.location.replace(
                "security-login.html"
            );

        }

    }
);