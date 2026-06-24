sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "factory/lib/BonusCalculator"
], function (
    Controller,
    BonusCalculator
) {
    "use strict";

    return Controller.extend(
        "com.training.factory.factorymonitor.controller.View2",
        {

            onCalculate: function () {

                var sName =
                    this.byId("empName").getValue();

                var fSalary =
                    parseFloat(
                        this.byId("salary").getValue()
                    );

                var fBonus =
                    BonusCalculator.getBonus(
                        fSalary
                    );

                var oCard =
                    this.byId("empCard");

                oCard.setEmployeeName(sName);
                oCard.setSalary(fSalary);
                oCard.setBonus(fBonus);
            }

        }
    );
});