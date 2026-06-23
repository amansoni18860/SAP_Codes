sap.ui.define([
    "sap/ui/core/Control"
], function (Control) {

    "use strict";

    return Control.extend(
        "demo.custom.customcontrol.control.TrafficLight",
        {

            metadata: {

                properties: {

                    status: {

                        type: "string",

                        defaultValue: "Red"

                    }

                }

            },

            renderer: function (
                oRM,
                oControl
            ) {

                // Get status property value
                var sStatus =
                    oControl.getStatus();

                // Default color
                var sColor = "red";

                if (sStatus === "Green") {

                    sColor = "green";

                } else if (
                    sStatus === "Yellow"
                ) {

                    sColor = "yellow";
                }

                // Create DIV
                oRM.openStart(
                    "div",
                    oControl
                );

                // Circle styles
                oRM.style(
                    "width",
                    "50px"
                );

                oRM.style(
                    "height",
                    "50px"
                );

                oRM.style(
                    "border-radius",
                    "50%"
                );

                oRM.style(
                    "background-color",
                    sColor
                );

                oRM.style(
                    "border",
                    "1px solid black"
                );

                oRM.openEnd();

                oRM.close("div");

            }

        }

    );

});