sap.ui.define([
    "sap/ui/core/Control"
], function (Control) {

    "use strict";

    return Control.extend(
        "demo.custom.customcontrol.control.RatingControl",
        {

            metadata: {

                properties: {

                    // Number of stars selected
                    rating: {
                        type: "int",
                        defaultValue: 0
                    }

                },

                events: {

                    // Custom event
                    rate: {}

                }

            },

            onclick: function () {

                // Increase rating

                var iRating =
                    this.getRating();

                iRating++;

                if (iRating > 5) {
                    iRating = 1;
                }

                this.setRating(iRating);

                // Notify application
                this.fireRate({
                    rating: iRating
                });

            },

            renderer: function (
                oRM,
                oControl
            ) {

                var iRating =
                    oControl.getRating();

                oRM.openStart(
                    "div",
                    oControl
                );

                oRM.style(
                    "cursor",
                    "pointer"
                );

                oRM.style(
                    "font-size",
                    "30px"
                );

                oRM.openEnd();

                // Draw 5 stars

                for (
                    var i = 1;
                    i <= 5;
                    i++
                ) {

                    if (i <= iRating) {

                        oRM.text("★");

                    } else {

                        oRM.text("☆");

                    }

                }

                oRM.close("div");

            }

        }

    );

});