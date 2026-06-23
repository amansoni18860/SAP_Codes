sap.ui.define([
    "sap/ui/core/XMLComposite"
], function (XMLComposite) {

    "use strict";

    return XMLComposite.extend(
        "demo.custom.customcontrol.control.CustomerCard",
        {

            metadata: {

                properties: {

                    customerId: {
                        type: "string"
                    },

                    customerName: {
                        type: "string"
                    },

                    city: {
                        type: "string"
                    },

                    creditLimit: {
                        type: "float"
                    },

                    status: {
                        type: "string"
                    }

                },

                events: {

                    approve: {},

                    reject: {}

                }

            },

            onApprove: function () {

                this.fireApprove({

                    customerId:
                        this.getCustomerId(),

                    customerName:
                        this.getCustomerName()

                });

            },

            onReject: function () {

                this.fireReject({

                    customerId:
                        this.getCustomerId(),

                    customerName:
                        this.getCustomerName()

                });

            }

        }

    );

});