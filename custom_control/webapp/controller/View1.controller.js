sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast"
], function (
    Controller,
    MessageToast
) {

    "use strict";

    return Controller.extend(
        "demo.custom.customcontrol.controller.View1",
        {

            onCardPress: function (
                oEvent
            ) {

                var oSource =
                    oEvent.getSource();

                MessageToast.show(

                    "Product : " +

                    oSource.getTitle()

                );

            }

        }

    );

});