sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast"
], function (
    Controller,
    MessageToast
) {

    "use strict";

    return Controller.extend(
        "demo.custom.customcontrol.controller.View2",
        {

            onRate: function (
                oEvent
            ) {

                var iRating =
                    oEvent.getParameter(
                        "rating"
                    );

                MessageToast.show(
                    "Rating: " +
                    iRating
                );

            }

        }

    );

});