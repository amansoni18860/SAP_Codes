sap.ui.define([

    // Base Controller
    "sap/ui/core/mvc/Controller",

    // Local JSON model used for dialog
    "sap/ui/model/json/JSONModel",

    // Fragment loader
    "sap/ui/core/Fragment",

    // Success messages
    "sap/m/MessageToast",

    // Error and confirmation dialogs
    "sap/m/MessageBox",

    // Filter and operator for search
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

    return Controller.extend(
        "demo.mock.mockserver.controller.View1",
        {

            /**
             * Called when controller is initialized.
             */
            onInit: function () {



                this._bSalaryDescending = false;


                // Model used by Create/Edit dialog
                this.getView().setModel(
                    new JSONModel({}),
                    "dialog"
                );

            },

            /**
             * Create Employee
             */
            onCreate: async function () {

                // Remember current mode
                this._mode = "CREATE";

                // Initialize dialog model with empty values
                this.getView()
                    .getModel("dialog")
                    .setData({

                        EmployeeID: Date.now(),

                        FirstName: "",

                        LastName: "",

                        Email: "",

                        HireDate: new Date(),

                        Salary: 0,

                        DepartmentID: ""

                    });

                await this._openDialog();

            },

            /**
             * Edit selected employee
             */
            onEdit: async function () {

                var oTable =
                    this.byId("employeeTable");

                var oItem =
                    oTable.getSelectedItem();

                // Validation
                if (!oItem) {

                    MessageToast.show(
                        "Select an employee"
                    );

                    return;
                }

                // Update mode
                this._mode = "UPDATE";

                // Save entity path for update call
                this._sPath =
                    oItem
                        .getBindingContext()
                        .getPath();

                // Selected employee data
                var oEmployee =
                    oItem
                        .getBindingContext()
                        .getObject();

                // Copy only required properties
                this.getView()
                    .getModel("dialog")
                    .setData({

                        EmployeeID:
                            oEmployee.EmployeeID,

                        FirstName:
                            oEmployee.FirstName,

                        LastName:
                            oEmployee.LastName,

                        Email:
                            oEmployee.Email,

                        HireDate:
                            oEmployee.HireDate,

                        Salary:
                            oEmployee.Salary,

                        DepartmentID:
                            oEmployee.DepartmentID

                    });

                await this._openDialog();

            },

            /**
             * Save Employee
             * Handles both Create and Update
             */
            onSave: function () {

                var oODataModel =
                    this.getView().getModel();

                var oData =
                    this.getView()
                        .getModel("dialog")
                        .getData();

                // Build clean payload
                var oPayload = {

                    EmployeeID:
                        oData.EmployeeID,

                    FirstName:
                        oData.FirstName,

                    LastName:
                        oData.LastName,

                    Email:
                        oData.Email,

                    HireDate:
                        oData.HireDate,

                    Salary:
                        oData.Salary,

                    DepartmentID:
                        parseInt(
                            oData.DepartmentID,
                            10
                        )

                };

                /**
                 * CREATE
                 */
                if (
                    this._mode === "CREATE"
                ) {

                    oODataModel.create(
                        "/Employees",
                        oPayload,
                        {

                            success: function () {

                                MessageToast.show(
                                    "Employee Created"
                                );

                                this.onRefresh();

                            }.bind(this),

                            error: function () {

                                MessageBox.error(
                                    "Employee creation failed"
                                );

                            }

                        }
                    );

                }

                /**
                 * UPDATE
                 */
                else {

                    oODataModel.update(
                        this._sPath,
                        oPayload,
                        {

                            success: function () {

                                MessageToast.show(
                                    "Employee Updated"
                                );

                                this.onRefresh();

                            }.bind(this),

                            error: function () {

                                MessageBox.error(
                                    "Employee update failed"
                                );

                            }

                        }
                    );

                }

                // Close dialog
                if (this._oDialog) {

                    this._oDialog.close();

                }

            },

            /**
             * Delete selected employee
             */
            onDelete: function () {

                var oTable =
                    this.byId("employeeTable");

                var oItem =
                    oTable.getSelectedItem();

                if (!oItem) {

                    MessageToast.show(
                        "Select an employee"
                    );

                    return;

                }

                var sPath =
                    oItem
                        .getBindingContext()
                        .getPath();

                MessageBox.confirm(
                    "Delete selected employee?",
                    {

                        onClose: function (
                            sAction
                        ) {

                            if (
                                sAction !==
                                MessageBox.Action.OK
                            ) {

                                return;

                            }

                            this.getView()
                                .getModel()
                                .remove(
                                    sPath,
                                    {

                                        success: function () {

                                            MessageToast.show(
                                                "Employee Deleted"
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

            /**
             * Refresh table binding
             */
            onRefresh: function () {

                var oBinding =
                    this.byId(
                        "employeeTable"
                    ).getBinding(
                        "items"
                    );

                if (oBinding) {

                    oBinding.refresh();

                }

            },

            /**
             * Loads dialog fragment only once
             */
            _openDialog: async function () {

                if (!this._oDialog) {

                    this._oDialog =
                        await Fragment.load({

                            // Update this path if required
                            name:
                                "demo.mock.mockserver.fragment.EmployeeDialog",

                            controller:
                                this

                        });

                    this.getView()
                        .addDependent(
                            this._oDialog
                        );

                }

                this._oDialog.open();

            },

            /**
             * Close dialog
             */
            onCancel: function () {

                if (this._oDialog) {

                    this._oDialog.close();

                }

            },

            // Search employee by First Name
            onSearch: function (oEvent) {

                var sValue =
                    oEvent.getParameter("newValue");

                var oBinding =
                    this.byId("employeeTable")
                        .getBinding("items");

                // Clear filter when search is empty
                if (!sValue) {

                    oBinding.filter([]);
                    return;

                }

                var oFilter =
                    new Filter(
                        "FirstName",
                        FilterOperator.Contains,
                        sValue
                    );

                oBinding.filter([oFilter]);

            },



            // Global search on Employee table
            onMultiSearch: function (oEvent) {

                // Search text entered by user
                var sValue =
                    oEvent.getParameter("newValue");

                // Table binding
                var oBinding =
                    this.byId("employeeTable")
                        .getBinding("items");

                // Remove filters when search box is empty
                if (!sValue) {

                    oBinding.filter([]);
                    return;

                }

                // Fields which support text search
                var aFields = [
                    "FirstName",
                    "LastName",
                    "Email"
                ];

                // Create Contains filters dynamically
                var aFilters = aFields.map(function (sField) {

                    return new Filter(
                        sField,
                        FilterOperator.Contains,
                        sValue
                    );

                });

                // Salary search
                // Example:
                // 75000 -> Salary = 75000
                if (!isNaN(sValue)) {

                    var aContexts =
                        oBinding.getCurrentContexts();

                    aContexts.forEach(function (oContext) {

                        var oData =
                            oContext.getObject();

                        if (
                            oData.Salary &&
                            oData.Salary
                                .toString()
                                .includes(sValue)
                        ) {

                            aFilters.push(
                                new Filter(
                                    "Salary",
                                    FilterOperator.EQ,
                                    oData.Salary
                                )
                            );

                        }

                    });

                }
                // Combine all filters using OR
                var oFilter = new Filter({
                    filters: aFilters,
                    and: false
                });

                // Apply filter to table
                oBinding.filter([oFilter]);

            },

            /**
             * Sort salary ascending / descending
             */
            onSortBySalary: function () {

                // Toggle sort direction
                this._bSalaryDescending =
                    !this._bSalaryDescending;

                var oBinding =
                    this.byId("employeeTable")
                        .getBinding("items");

                var oSorter =
                    new Sorter(
                        "Salary",
                        this._bSalaryDescending
                    );

                oBinding.sort(oSorter);

                // Update icon
                this.byId("salarySortBtn")
                    .setIcon(
                        this._bSalaryDescending
                            ? "sap-icon://sort-descending"
                            : "sap-icon://sort-ascending"
                    );

            },
            // EXPORT TO EXCEL
            onExport: function () {

    var oTable =
        this.byId("employeeTable");

    var aData =
        oTable.getBinding("items")
            .getContexts()
            .map(function (oContext) {

                var oEmployee =
                    oContext.getObject();

                return {
                    EmployeeID:
                        oEmployee.EmployeeID,

                    FirstName:
                        oEmployee.FirstName,

                    LastName:
                        oEmployee.LastName,

                    Email:
                        oEmployee.Email,

                    Salary:
                        oEmployee.Salary,

                    Department:
                        oEmployee.Department
                            ? oEmployee.Department.DepartmentName
                            : ""
                };

            });

    var oSettings = {

        workbook: {

            columns: [

                {
                    label: "Employee ID",
                    property: "EmployeeID"
                },

                {
                    label: "First Name",
                    property: "FirstName"
                },

                {
                    label: "Last Name",
                    property: "LastName"
                },

                {
                    label: "Email",
                    property: "Email"
                },

                {
                    label: "Salary",
                    property: "Salary",
                    type: "Number"
                },

                {
                    label: "Department",
                    property: "Department"
                }

            ]

        },

        dataSource: aData,

        fileName:
            "Employees.xlsx"

    };

    var oSpreadsheet =
        new Spreadsheet(
            oSettings
        );

    oSpreadsheet.build()
        .finally(function () {

            oSpreadsheet.destroy();

        });

}



        }
    );
});