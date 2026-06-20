sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "demo/frag/fragmentconcept/util/DialogManager"
], function (Controller, DialogManager) {
    "use strict";

    return Controller.extend(
        "demo.frag.fragmentconcept.controller.Product2",
        {

            onInit: function () {

            },

            onOpenProductDialog: async function () {

                const oProductDialog =
                    await DialogManager.getDialog(
                        this,
                        "demo.frag.fragmentconcept.fragment.ProductDialog"
                    );

                oProductDialog.open();
            },

            onCloseDialog: function () {

                if (this._oDialog) {
                    this._oDialog.close();
                }

            }

        }
    );
});
