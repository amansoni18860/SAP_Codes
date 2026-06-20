sap.ui.define([
    "sap/ui/core/UIComponent",
    "demo/frag/fragmentconcept/model/models",
    "demo/frag/fragmentconcept/util/DialogManager"
], function (UIComponent, models, DialogManager) {
    "use strict";

    return UIComponent.extend("demo.frag.fragmentconcept.Component", {
        metadata: {
            manifest: "json",
            interfaces: [
                "sap.ui.core.IAsyncContentCreation"
            ]
        },

        init: function () {

            UIComponent.prototype.init.apply(this, arguments);

            this.setModel(models.createDeviceModel(), "device");

            this._dialogManager = DialogManager;

            this.getRouter().initialize();
        }
    });
});