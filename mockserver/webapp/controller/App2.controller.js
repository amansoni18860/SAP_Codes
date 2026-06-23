sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/ui/core/Fragment",
    "sap/m/MessageToast",
    "sap/m/MessageBox",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/ui/model/Sorter",
    "sap/ui/export/Spreadsheet"
], function (
    Controller,
    JSONModel,
    Fragment,
    MessageToast,
    MessageBox,
    Filter,
    FilterOperator,
    Sorter,
    Spreadsheet
) {
    "use strict";

    return Controller.extend("demo.mock.mockserver.controller.App2", {

        onInit: function () {

            this._bPriceDescending = false;

            this.getView().setModel(
                new JSONModel({}),
                "productDialog"
            );

        },

        // =========================
        // CREATE
        // =========================

        onCreate: async function () {

            this._mode = "CREATE";

            this.getView()
                .getModel("productDialog")
                .setData({
                    ProductID: Date.now(),
                    Name: "",
                    Category: "",
                    Price: 0,
                    Stock: 0,
                    CreatedOn: new Date()
                });

            await this._openProductDialog();

        },

        // =========================
        // EDIT
        // =========================

        onEdit: async function () {

            var oItem = this.byId("productTable")
                .getSelectedItem();

            if (!oItem) {

                MessageToast.show("Select a product");
                return;

            }

            this._mode = "UPDATE";

            this._sPath = oItem
                .getBindingContext()
                .getPath();

            var oProduct = oItem
                .getBindingContext()
                .getObject();

            this.getView()
                .getModel("productDialog")
                .setData({

                    ProductID: oProduct.ProductID,
                    Name: oProduct.Name,
                    Category: oProduct.Category,
                    Price: oProduct.Price,
                    Stock: oProduct.Stock,
                    CreatedOn: oProduct.CreatedOn

                });

            await this._openProductDialog();

        },

        // =========================
        // SAVE
        // =========================

        onSave: function () {

            var oModel = this.getView().getModel();

            var oData = this.getView()
                .getModel("productDialog")
                .getData();

            var oPayload = {

                ProductID: oData.ProductID,
                Name: oData.Name,
                Category: oData.Category,
                Price: oData.Price,
                Stock: oData.Stock,
                CreatedOn: oData.CreatedOn

            };

            if (this._mode === "CREATE") {

                oModel.create("/Products", oPayload, {

                    success: function () {

                        MessageToast.show(
                            "Product Created Successfully"
                        );

                        this.onRefresh();

                    }.bind(this),

                    error: function () {

                        MessageBox.error(
                            "Product creation failed"
                        );

                    }

                });

            } else {

                oModel.update(
                    this._sPath,
                    oPayload,
                    {

                        success: function () {

                            MessageToast.show(
                                "Product Updated Successfully"
                            );

                            this.onRefresh();

                        }.bind(this),

                        error: function () {

                            MessageBox.error(
                                "Product update failed"
                            );

                        }

                    }
                );

            }

            this._oDialog.close();

        },

        // =========================
        // DELETE
        // =========================

        onDelete: function () {

            var oItem = this.byId("productTable")
                .getSelectedItem();

            if (!oItem) {

                MessageToast.show(
                    "Select a product"
                );

                return;

            }

            var sPath = oItem
                .getBindingContext()
                .getPath();

            MessageBox.confirm(
                "Delete selected product?",
                {

                    onClose: function (sAction) {

                        if (sAction !== MessageBox.Action.OK) {
                            return;
                        }

                        this.getView()
                            .getModel()
                            .remove(
                                sPath,
                                {

                                    success: function () {

                                        MessageToast.show(
                                            "Product Deleted"
                                        );

                                        this.onRefresh();

                                    }.bind(this),

                                    error: function () {

                                        MessageBox.error(
                                            "Delete failed"
                                        );

                                    }

                                }
                            );

                    }.bind(this)

                }
            );

        },

        // =========================
        // SEARCH
        // =========================

        onSearchProducts: function (oEvent) {

            var sValue = oEvent.getParameter(
                "newValue"
            );

            var oBinding = this.byId(
                "productTable"
            ).getBinding("items");

            if (!sValue) {

                oBinding.filter([]);
                return;

            }

            var oFilter = new Filter({

                filters: [

                    new Filter(
                        "Name",
                        FilterOperator.Contains,
                        sValue
                    ),

                    new Filter(
                        "Category",
                        FilterOperator.Contains,
                        sValue
                    )

                ],

                and: false

            });

            oBinding.filter([oFilter]);

        },

        // =========================
        // REFRESH
        // =========================

        onRefresh: function () {

            var oBinding = this.byId(
                "productTable"
            ).getBinding("items");

            if (oBinding) {

                oBinding.refresh();

            }

        },

        // =========================
        // SORT PRICE
        // =========================

        onSortPrice: function () {

            this._bPriceDescending =
                !this._bPriceDescending;

            this.byId("productTable")
                .getBinding("items")
                .sort(
                    new Sorter(
                        "Price",
                        this._bPriceDescending
                    )
                );

        },

        // =========================
        // EXPORT
        // =========================

        onExport: function () {

            var aData = this.byId(
                "productTable"
            )
                .getBinding("items")
                .getContexts()
                .map(function (oContext) {

                    return oContext.getObject();

                });

            var oSheet = new Spreadsheet({

                workbook: {

                    columns: [

                        {
                            label: "Product ID",
                            property: "ProductID"
                        },

                        {
                            label: "Name",
                            property: "Name"
                        },

                        {
                            label: "Category",
                            property: "Category"
                        },

                        {
                            label: "Price",
                            property: "Price"
                        },

                        {
                            label: "Stock",
                            property: "Stock"
                        },

                        {
                            label: "Created On",
                            property: "CreatedOn"
                        }

                    ]

                },

                dataSource: aData,

                fileName: "Products.xlsx"

            });

            oSheet.build()
                .finally(function () {

                    oSheet.destroy();

                });

        },

        // =========================
        // DIALOG
        // =========================

        _openProductDialog: async function () {

            if (!this._oDialog) {

                this._oDialog = await Fragment.load({

                    name: "demo.mock.mockserver.fragment.ProductDialog",

                    controller: this

                });

                this.getView()
                    .addDependent(
                        this._oDialog
                    );

            }

            this._oDialog.open();

        },

        // =========================
        // CANCEL
        // =========================

        onCancel: function () {

            this._oDialog.close();

        }

    });

});