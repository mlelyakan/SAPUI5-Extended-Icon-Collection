sap.ui.define([
   "sap/ui/core/mvc/Controller",
   "sap/ui/model/Filter",
   "sap/ui/model/FilterOperator",
], function (Controller, Filter, FilterOperator) {
   "use strict";
   var base;
   return Controller.extend("SapUI5Tutorial.Application.Start.controller.Start", {
      onInit: function () {
         base = this;
         base.getView().setModel(oModel);
      },
      onSelectColorType: function (oEvent) {
         var allColorFilters = [];
         var oBinding, colorList, selectedColors;
         colorList = base.getView().byId("colorList_Id");
         oBinding = colorList.getBinding("items");
         selectedColors = oEvent.getSource().getSelectedKeys();
         if (selectedColors.length > 0) {
            for (let i = 0; i < selectedColors.length; i++) {
               allColorFilters.push(new Filter("color", FilterOperator.Contains, selectedColors[i]));
            }
            oBinding.filter(new Filter(allColorFilters, false));
         } else {
            oBinding.filter([]);
         }
      },
      onSelectFontIconFamily: function (oEvent) {
         base.getView().byId("iconSearchInput_ID").setValue("");
         var iconNavContainer = base.getView().byId("iconNavContainer_ID");
         var selectedFontKey = oEvent.getSource().getSelectedKey();
         if (selectedFontKey === "simplelineicons") {
            iconNavContainer.to(base.getView().byId("simpleLineIconsPage_ID"), "slide");
            oModel.setProperty("/IconListCount", oModel.getProperty("/SimpleLineIconList").length);
            if (base.simpleLineIconGridListItems !== " " && base.simpleLineIconGridListItems)
               base.simpleLineIconGridListItems.filter([]);
         }
         else if (selectedFontKey === "fontawesomeicons") {
            iconNavContainer.to(base.getView().byId("fontAwesomeIconsPage_ID"), "slide");
            oModel.setProperty("/IconListCount", oModel.getProperty("/FontAwesomeIconList").length);
            if (base.fontAwesomeGridListItems !== " " && base.fontAwesomeGridListItems)
               base.fontAwesomeGridListItems.filter([]);
         }
         else {
            iconNavContainer.to(base.getView().byId("fontIconsPage_ID"), "slide");
            oModel.setProperty("/IconListCount", oModel.getProperty("/FontIconList").length);
            if (base.fontIconGridListItems !== " " && base.fontIconGridListItems)
               base.fontIconGridListItems.filter([]);
         }
      },
      onSearchFontIcon: function (oEvent) {
         var searchIconText = oEvent.getSource().getValue();
         var selectedFontFamily = base.getView().byId("segmentedButtonsFont_ID").getSelectedKey();
         if (!base.fontAwesomeGridListItems && !base.simpleLineIconGridListItems && !base.fontIconGridListItems) {
            base.fontAwesomeGridListItems = " ";
            base.simpleLineIconGridListItems = " ";
            base.fontIconGridListItems = " ";
         }
         if (searchIconText.trim().length >= 3) {
            var searchFilter = new Filter("name", FilterOperator.Contains, searchIconText);
            switch (selectedFontFamily) {
               case "fontawesomeicons":
                  base.fontAwesomeGridListItems = base.getView().byId("fontAwesomeGridList_ID").getBinding("items");
                  base.fontAwesomeGridListItems.filter(searchFilter);
                  oModel.setProperty("/IconListCount", base.fontAwesomeGridListItems.getLength());
                  break;
               case "simplelineicons":
                  base.simpleLineIconGridListItems = base.getView().byId("simpleLineIconGridList_ID").getBinding("items");
                  base.simpleLineIconGridListItems.filter(searchFilter);
                  oModel.setProperty("/IconListCount", base.simpleLineIconGridListItems.getLength());
                  break;
               case "fonticons":
                  base.fontIconGridListItems = base.getView().byId("fontIconGridList_ID").getBinding("items");
                  base.fontIconGridListItems.filter(searchFilter);
                  oModel.setProperty("/IconListCount", base.fontIconGridListItems.getLength());
                  break;
               default:
                  break;
            }
         }
         if (searchIconText.trim().length === 0) {
            switch (selectedFontFamily) {
               case "fontawesomeicons":
                  base.fontAwesomeGridListItems.filter([]);
                  oModel.setProperty("/IconListCount", base.fontAwesomeGridListItems.getLength());
                  break;
               case "simplelineicons":
                  base.simpleLineIconGridListItems.filter([]);
                  oModel.setProperty("/IconListCount", base.simpleLineIconGridListItems.getLength());
                  break;
               case "fonticons":
                  base.fontIconGridListItems.filter([]);
                  oModel.setProperty("/IconListCount", base.fontIconGridListItems.getLength());
                  break;
               default:
                  break;
            }
         }
      }
   });
});