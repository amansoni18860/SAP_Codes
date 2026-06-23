sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast"
], function (
    Controller,
    MessageToast
) {

    "use strict";

    return Controller.extend(
        "demo.custom.customcontrol.controller.View5",
        {

            onShowReport: function (
                oEvent
            ) {

                MessageToast.show(

                    "Sales: " +

                    oEvent.getParameter(
                        "title"
                    ) +

                    " | Amount: ₹" +

                    oEvent.getParameter(
                        "amount"
                    )

                );

            }

        }

    );

});