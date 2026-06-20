sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/Fragment",
    "sap/m/MessageToast"
], (Controller, Fragment, MessageToast) => {
    "use strict";

    return Controller.extend("demo.frag.fragmentconcept.controller.View1", {
        onOpenDialog: async function () {
            if (!this.oDialog) {
                this.oDialog = await Fragment.load({
                    name: "demo.frag.fragmentconcept.fragment.UserDialog",
                    controller: this
                })

                this.getView().addDependent(this.oDialog)

            }
            this.oDialog.open()
        },

        onSave: function () {
            MessageToast.show("Data Saved");
            this.oDialog.close()
        },

        onCancel: function () {
            this.oDialog.close()
        }
    });
});