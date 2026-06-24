sap.ui.define([
    "sap/ui/core/XMLComposite"
], function (XMLComposite) {
    "use strict";

    return XMLComposite.extend(
        "factory.lib.controls.EmployeeCard",
        {
            metadata: {
                properties: {

                    employeeName: {
                        type: "string",
                        defaultValue: ""
                    },

                    salary: {
                        type: "float",
                        defaultValue: 0
                    },

                    bonus: {
                        type: "float",
                        defaultValue: 0
                    }
                }
            }
        }
    );
});