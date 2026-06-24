sap.ui.define([
    "sap/ui/core/UIComponent",
    "demo/dash/dashboard/model/models",
    "sap/ui/model/json/JSONModel"
], (UIComponent, models, JSONModel) => {
    "use strict";

    return UIComponent.extend("demo.dash.dashboard.Component", {
        metadata: {
            manifest: "json",
            interfaces: [
                "sap.ui.core.IAsyncContentCreation"
            ]
        },

        init() {
            // Default model: holds the dashboard business data loaded from mockData.json.
      var oDataModel = new JSONModel();
                 // Named "view" model: holds screen state such as selected filter values.
      var oViewModel = new JSONModel({
        selectedYear: "2026",
        selectedRegion: "All",
        selectedCategory: "All"
      });

      // setModel(model) without a name creates the default model used by "{/path}" bindings.
      this.setModel(oDataModel);

      // setModel(model, "view") creates a named model used by "{view>/path}" bindings.
      this.setModel(oViewModel, "view");

      // Starts the standard UI5 component lifecycle and creates the root XML view.
      UIComponent.prototype.init.apply(this, arguments);

      // Load tutorial data after the controller has subscribed to request events.
      oDataModel.loadData(sap.ui.require.toUrl("demo/dash/dashboard/model/mockData.json"));
   

            // set the device model
            this.setModel(models.createDeviceModel(), "device");

            // enable routing
            this.getRouter().initialize();
        }
    });
});