sap.ui.define([], function () {
    "use strict";

    return {

        getMachineStatus: function (iTemp) {

            if (iTemp > 80) {
                return "Critical";
            }

            if (iTemp > 50) {
                return "Warning";
            }

            return "Normal";
        }

    };
});