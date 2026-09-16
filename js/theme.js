/* ==========================================
   JAIN SMART VISITOR
   GLOBAL THEME SYSTEM
========================================== */

(function () {

    const THEME_KEY = "jainTheme";

    const savedTheme =
        localStorage.getItem(THEME_KEY);

    /* Apply saved theme */

    if (savedTheme === "dark") {
        document.body.classList.add("dark-mode");
    }


    document.addEventListener(
        "DOMContentLoaded",
        function () {

            const themeControl =
                document.getElementById("themeToggle");

            if (!themeControl) {
                return;
            }


            /* ==========================================
               DASHBOARD SWITCH
            ========================================== */

            if (
                themeControl.tagName === "INPUT" &&
                themeControl.type === "checkbox"
            ) {

                themeControl.checked =
                    document.body.classList.contains(
                        "dark-mode"
                    );


                themeControl.addEventListener(
                    "change",
                    function () {

                        const isDark =
                            themeControl.checked;

                        document.body.classList.toggle(
                            "dark-mode",
                            isDark
                        );

                        localStorage.setItem(
                            THEME_KEY,
                            isDark ? "dark" : "light"
                        );

                    }
                );

                return;
            }


            /* ==========================================
               NORMAL THEME BUTTON
            ========================================== */

            updateButton();


            themeControl.addEventListener(
                "click",
                function () {

                    document.body.classList.toggle(
                        "dark-mode"
                    );

                    const isDark =
                        document.body.classList.contains(
                            "dark-mode"
                        );

                    localStorage.setItem(
                        THEME_KEY,
                        isDark ? "dark" : "light"
                    );

                    updateButton();

                }
            );

        }
    );


    function updateButton() {

        const button =
            document.getElementById("themeToggle");

        if (!button) {
            return;
        }


        if (
            document.body.classList.contains(
                "dark-mode"
            )
        ) {

            button.textContent = "☀️";

            button.setAttribute(
                "aria-label",
                "Switch to light mode"
            );

        }

        else {

            button.textContent = "🌙";

            button.setAttribute(
                "aria-label",
                "Switch to dark mode"
            );

        }

    }

})();