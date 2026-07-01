sap.ui.define([], function () {

    "use strict";

    return {

        calculateRevenue: function (quantity, price) {
            return quantity * price;
        },

        calculateProfit: function (
            revenue,
            cost
        ) {
            return revenue - cost;
        }

    };

});