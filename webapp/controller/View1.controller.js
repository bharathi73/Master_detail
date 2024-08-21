sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/ui/model/FilterType",
    "sap/ui/model/json/JSONModel"
],
function (Controller, Filter, FilterOperator, FilterType, JSONModel) {
    "use strict";

    return Controller.extend("com.techm.masterdetail.controller.View1", {
        onListPress: function(oEvent){
            var orderID=oEvent.getParameter("listItem").getBindingContext().getProperty("OrderID");
            var oFilter=new Filter("OrderID", FilterOperator.EQ,orderID);
            this.getView().byId("orderTable").getBinding("items").filter(oFilter,FilterType.Application);
            that.getSplitContObj().to(this.createId("orderDetail"));
        },
        onPressOrderDetail:function(oEvent){
            var that=this;
            var productId=oEvent.getSource().getBindingContext().getProperty("ProductID");
            var oModel=this.getOwnerComponent().getModel();
            oModel.read("/Products("+productId+")",{
                success:function(oData){
                    var jData=new JSONModel(oData);
                    that.getView().byId("productForm").setModel(jData);
                    that.getSplitContObj().to(that.createId("productDetail"));
                },error: function(oError){
                    console.log(oError);
                }
            })
        },
        getSplitContObj:function(){
            var result=this.byId("SplitCont");
            return result;
        },
        onProductBack:function(){
            this.getSplitContObj().backDetail();
        }

    });
});
