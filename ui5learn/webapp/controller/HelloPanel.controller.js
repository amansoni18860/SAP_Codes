sap.ui.define([
    "sap/ui/demo/learn/controller/BaseController",
    "sap/m/MessageToast"
], function (
    BaseController,
    MessageToast
) {
    "use strict";

    return BaseController.extend(
        "sap.ui.demo.learn.controller.HelloPanel",
        {

            onPress: function () {

                MessageToast.show(
                    "Hello " +
                    this.getView()
                        .getModel()
                        .getProperty("/recipient/name")
                );
            },

            onPressDialog: function () {

                this.showHelloDialog();
            },

            onCloseDialog: function () {

                this.closeHelloDialog();
            }
        }
    );
});
