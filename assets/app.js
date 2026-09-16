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