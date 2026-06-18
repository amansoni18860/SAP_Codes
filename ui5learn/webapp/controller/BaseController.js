sap.ui.define([
    "sap/ui/core/mvc/Controller"
], function (Controller) {
    "use strict";

    return Controller.extend(
        "sap.ui.demo.learn.controller.BaseController",
        {

            /**
             * Returns global dialog service
             */
            getDialogService: function () {

                return this
                    .getOwnerComponent()
                    .dialogService;
            },

            /**
             * Open Hello Dialog
             */
            showHelloDialog: function () {

                return this
                    .getDialogService()
                    .open(
                        this.getView(),
                        "sap.ui.demo.learn.view.HelloDialogFrag",
                        this
                    );
            },

            /**
             * Close Hello Dialog
             */
            closeHelloDialog: function () {

                this
                    .getDialogService()
                    .close(
                        "sap.ui.demo.learn.view.HelloDialogFrag"
                    );
            }
        }
    );
});