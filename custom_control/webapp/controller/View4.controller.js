sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast"
], function (
    Controller,
    MessageToast
) {

    "use strict";

    return Controller.extend(
        "demo.custom.customcontrol.controller.View4",
        {

            onApproveCustomer: function (
                oEvent
            ) {

                MessageToast.show(

                    "Approved : " +

                    oEvent.getParameter(
                        "customerName"
                    )

                );

            },

            onRejectCustomer: function (
                oEvent
            ) {

                MessageToast.show(

                    "Rejected : " +

                    oEvent.getParameter(
                        "customerName"
                    )

                );

            }

        }

    );

});