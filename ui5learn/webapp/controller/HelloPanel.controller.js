sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/ui/core/Fragment"
], function (Controller, MessageToast, Fragment) {
    "use strict";

    return Controller.extend("sap.ui.demo.learn.controller.HelloPanel", {

        onPress: function () {
            var oBundle = this.getView()
                .getModel("i18n")
                .getResourceBundle();

            MessageToast.show(
                oBundle.getText(
                    "helloMessage",
                    [this.getView().getModel().getProperty("/recipient/name")]
                )
            );
        },

        onPressDialog: function () {
            var oView = this.getView();

            if (!this.oDialog) {
                Fragment.load({
                    id: oView.getId(),
                    name: "sap.ui.demo.learn.view.HelloDialogFrag",
                    controller: this
                }).then(function (oDialog) {
                    oView.addDependent(oDialog);
                    this.oDialog = oDialog;
                    oDialog.open();
                }.bind(this));
            } else {
                this.oDialog.open();
            }
        },

        onCloseDialog: function () {
            this.oDialog.close();
        }

    });
});
