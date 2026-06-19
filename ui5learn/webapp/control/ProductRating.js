sap.ui.define([
    "sap/ui/core/Control",
    "sap/m/RatingIndicator",
    "sap/m/Label",
    "sap/m/Button"
], function (
    Control,
    RatingIndicator,
    Label,
    Button
) {
    "use strict";

    return Control.extend(
        "sap.ui.demo.learn.control.ProductRating",
        {
            metadata: {
                properties: {
                    value: {
                        type: "float",
                        defaultValue: 0
                    }
                },

                aggregations: {
                    _rating: {
                        type: "sap.m.RatingIndicator",
                        multiple: false,
                        visibility: "hidden"
                    },

                    _label: {
                        type: "sap.m.Label",
                        multiple: false,
                        visibility: "hidden"
                    },

                    _button: {
                        type: "sap.m.Button",
                        multiple: false,
                        visibility: "hidden"
                    }
                },

                events: {
                    change: {
                        parameters: {
                            value: {
                                type: "float"
                            }
                        }
                    }
                }
            },

            init: function () {

                this.setAggregation(
                    "_rating",
                    new RatingIndicator({
                        value: this.getValue(),
                        maxValue: 5,
                        iconSize: "2rem",
                        visualMode: "Half",
                        liveChange: this._onRate.bind(this)
                    })
                );

                this.setAggregation(
                    "_label",
                    new Label({
                        text: "Select your rating"
                    }).addStyleClass(
                        "sapUiSmallMarginBegin"
                    )
                );

                this.setAggregation(
                    "_button",
                    new Button({
                        text: "Submit Rating",
                        type: "Emphasized",
                        icon: "sap-icon://accept",
                        press: this._onSubmit.bind(this)
                    }).addStyleClass(
                        "sapUiSmallMarginBegin"
                    )
                );
            },

            setValue: function (fValue) {

                this.setProperty(
                    "value",
                    fValue,
                    true
                );

                var oRating =
                    this.getAggregation("_rating");

                if (oRating) {
                    oRating.setValue(fValue);
                }

                return this;
            },

            reset: function () {

                this.setValue(0);

                this.getAggregation("_rating")
                    .setEnabled(true);

                this.getAggregation("_label")
                    .setText("Select your rating")
                    .setDesign("Standard");

                this.getAggregation("_button")
                    .setEnabled(true);
            },

            _onRate: function (oEvent) {

                var fValue =
                    oEvent.getParameter("value");

                var iMax =
                    oEvent.getSource().getMaxValue();

                this.setProperty(
                    "value",
                    fValue,
                    true
                );

                this.getAggregation("_label")
                    .setText(
                        "You rated " +
                        fValue +
                        " out of " +
                        iMax +
                        " stars"
                    )
                    .setDesign("Bold");
            },

            _onSubmit: function () {

                this.getAggregation("_rating")
                    .setEnabled(false);

                this.getAggregation("_button")
                    .setEnabled(false);

                this.getAggregation("_label")
                    .setText(
                        "Thank you for your rating!"
                    );

                this.fireEvent(
                    "change",
                    {
                        value: this.getValue()
                    }
                );
            },

            renderer: function (
                oRm,
                oControl
            ) {

                oRm.openStart(
                    "div",
                    oControl
                );

                oRm.class(
                    "myAppDemoWTProductRating"
                );

                oRm.style(
                    "display",
                    "flex"
                );

                oRm.style(
                    "align-items",
                    "center"
                );

                oRm.style(
                    "gap",
                    "1rem"
                );

                oRm.style(
                    "padding",
                    "1rem"
                );

                oRm.openEnd();

                oRm.renderControl(
                    oControl.getAggregation(
                        "_rating"
                    )
                );

                oRm.renderControl(
                    oControl.getAggregation(
                        "_label"
                    )
                );

                oRm.renderControl(
                    oControl.getAggregation(
                        "_button"
                    )
                );

                oRm.close("div");
            }
        }
    );
});