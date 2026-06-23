sap.ui.define([
    "sap/ui/core/Control"
], function (Control) {

    "use strict";

    return Control.extend(
        "demo.control.ProductCard",
        {

            /*
             * Metadata section
             * Used to define:
             * 1. Properties
             * 2. Events
             * 3. Aggregations
             */
            metadata: {

                properties: {

                    /*
                     * Like:
                     * title="Laptop"
                     */
                    title: {
                        type: "string",
                        defaultValue: ""
                    },

                    /*
                     * category="Electronics"
                     */
                    category: {
                        type: "string",
                        defaultValue: ""
                    },

                    /*
                     * price="75000"
                     */
                    price: {
                        type: "float",
                        defaultValue: 0
                    }

                },

                events: {

                    /*
                     * Custom event
                     *
                     * press=".onCardPress"
                     */
                    press: {}

                }

            },

            /*
             * Triggered when user clicks card
             */
            onclick: function () {

                /*
                 * Fire custom event
                 */
                this.firePress();

            },

            /*
             * Renderer
             *
             * Responsible for generating HTML
             */
            renderer: function (
                oRM,
                oControl
            ) {

                /*
                 * Creates:
                 *
                 * <div>
                 */
                oRM.openStart(
                    "div",
                    oControl
                );

                /*
                 * Add CSS Class
                 */
                oRM.class(
                    "productCard"
                );

                oRM.openEnd();

                /*
                 * Product Title
                 *
                 * <h2>Laptop</h2>
                 */
                oRM.openStart("h2");
                oRM.openEnd();

                oRM.text(
                    oControl.getTitle()
                );

                oRM.close("h2");

                /*
                 * Category
                 */
                oRM.openStart("p");
                oRM.openEnd();

                oRM.text(
                    "Category : " +
                    oControl.getCategory()
                );

                oRM.close("p");

                /*
                 * Price
                 */
                oRM.openStart("p");
                oRM.openEnd();

                oRM.text(
                    "Price : ₹" +
                    oControl.getPrice()
                );

                oRM.close("p");

                /*
                 * Close Div
                 */
                oRM.close("div");

            }

        }
    );

});