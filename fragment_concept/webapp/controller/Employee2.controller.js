sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "demo/frag/fragmentconcept/util/DialogManager"
], function (Controller, DialogManager) {
    "use strict";

    return Controller.extend(
        "demo.frag.fragmentconcept.controller.Employee2",
        {

            onInit: function () {

            },

            onOpenEmployeeDialog: async function () {

                const oEmployeeDialog =
                    await DialogManager.getDialog(
                        this,
                        "demo.frag.fragmentconcept.fragment.EmployeeDialog"
                    );

                oEmployeeDialog.open();
            },

            onCloseDialog: function () {

                if (this._oDialog) {
                    this._oDialog.close();
                }

            }

        }
    );
});