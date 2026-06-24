sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "com/training/factory/factorymonitor/factory/lib/MachineAnalyzer"
], function (
    Controller,
    MachineAnalyzer
) {
    "use strict";

    return Controller.extend(
        "com.training.factory.factorymonitor.controller.View1",
        {

            onCheckMachine: function () {

                var iTemp =
                    parseInt(
                        this.byId("tempInput").getValue(),
                        10
                    );

                var sStatus =
                    MachineAnalyzer.getMachineStatus(iTemp);

                var oCard =
                    this.byId("machineCard");

                oCard.setTemperature(iTemp);
                oCard.setStatus(sStatus);
            }

        }
    );
});