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
    "sap/m/MessageBox"

], function (
    Controller,
    JSONModel,
    Fragment,
    MessageToast,
    MessageBox
) {
    "use strict";

    return Controller.extend(
        "demo.mock.mockserver.controller.View1",
        {

            /**
             * Called when controller is initialized.
             */
            onInit: function () {

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

            }

        }
    );
});