sap.ui.define([], function () {
    "use strict";

    return {

        getBonus: function (salary) {

            if (salary >= 100000) {
                return salary * 0.20;
            }

            if (salary >= 50000) {
                return salary * 0.10;
            }

            return salary * 0.05;
        }

    };
});