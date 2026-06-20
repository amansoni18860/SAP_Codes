sap.ui.define(["sap/ui/core/mvc/Controller",
    "sap/ui/core/Fragment","sap/ui/model/json/JSONModel","sap/m/MessageToast"
],function(Controller,Fragment,JSONModel,MessageToast){

    "use strict";

    return Controller.extend("demo.frag.fragmentconcept.controller.Employee",{

        onInit:function(){
            var oEmployee=new JSONModel({
                employees:[]
            });

            this.getView().setModel(oEmployee);
        },

        onOpenForm:async function(){

            var oDialogModel=new JSONModel({
                id:"",
                name:"",
                dept:""
            })

            this.getView().setModel(oDialogModel,"dialog")

            if(!this.oDialog){
               this.oDialog = await Fragment.load({
                name:"demo.frag.fragmentconcept.fragment.AddEmployee",
                controller:this
               })

               this.getView().addDependent(this.oDialog);
            }
            this.oDialog.open();
        },

        onCloseDialog:function(){
            this.oDialog.close();
        },


        onSaveData:function(){
            var oDialogModel=this.getView().getModel("dialog");
            var oData=oDialogModel.getData();

            var mainModel=this.getView().getModel();

            var aEmployee=mainModel.getProperty("/employees")

            aEmployee.push({
                name:oData.name,
                id:oData.id,
                dept:oData.dept
            })

            mainModel.refresh();

            MessageToast.show("Employee Added")

            this.oDialog.close()
        }
    })

})