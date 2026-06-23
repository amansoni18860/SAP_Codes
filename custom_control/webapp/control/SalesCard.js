sap.ui.define([
    "sap/ui/core/XMLComposite"
], function (XMLComposite) {

    "use strict";

    return XMLComposite.extend(
        "demo.custom.customcontrol.control.SalesCard",
        {

            metadata: {

                properties: {

                    title: {
                        type: "string"
                    },

                    amount: {
                        type: "string"
                    },

                    growth: {
                        type: "string"
                    }

                },

                events: {

                    detailsPress: {}

                }

            },

            onPressDetails: function () {

                this.fireDetailsPress({

                    title: this.getTitle(),

                    amount: this.getAmount()

                });

            }

        }

    );

});