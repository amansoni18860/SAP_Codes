sap.ui.define([
    "sap/ui/core/UIComponent",
    "sap/ui/model/json/JSONModel",
    "sap/ui/demo/learn/service/DialogService"
], function (
    UIComponent,
    JSONModel,
    DialogService
) {
    "use strict";

    return UIComponent.extend(
        "sap.ui.demo.learn.Component",
        {

            metadata: {
                manifest: "json"
            },

            init: function () {

                UIComponent.prototype.init.apply(
                    this,
                    arguments
                );

                // Application Model
                this.setModel(new JSONModel({
                    recipient: {
                        name: "UI5 Team"
                    }
                }));

                // Global dialog service
                this.dialogService = DialogService;
            }
        }
    );
});