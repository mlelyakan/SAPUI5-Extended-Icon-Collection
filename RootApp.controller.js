sap.ui.define([
  "sap/ui/core/mvc/Controller",
], function (Controller) {
  "use strict";
  var base;
  return Controller.extend("BNetSapUI5.RootApp", {
    onInit: function () {
      base = this;
      base.getView().setModel(oModel);
      base.getColors();
      base.getFontAwesomeIcons();
      base.getSimpleLineIcons();
      base.getFontIcons();
    },
    getColors: function () {
      var colorTypes = [
        {
          "ColorKey": "Red",
          "ColorName": "Red",
          "ColorDescription": "Primary Colors"
        }, {
          "ColorKey": "Green",
          "ColorName": "Green",
          "ColorDescription": "Primary Colors"
        }, {
          "ColorKey": "Blue",
          "ColorName": "Blue",
          "ColorDescription": "Primary Colors"
        }, {
          "ColorKey": "Yellow",
          "ColorName": "Yellow",
          "ColorDescription": "Primary Colors"
        },
      ]
      oModel.setProperty("/ColorCollection", colorTypes);
      ColorLibrary.getColors(function (allColors) {
        oModel.setProperty("/ColorList", allColors);
        oModel.setProperty("/ColorListCount", allColors.length);
      });
    },
    getFontAwesomeIcons: function () {
      oModel.setProperty("/FontAwesomeIconList", []);
      FontAwesomeIcons.getIcons(function (allIcons) {
        oModel.setProperty("/IconListCount", allIcons.length);
        allIcons.map(function (icon) {
          if (icon.unicode && icon.brand === "regular") {
            sap.ui.core.IconPool.addIcon(icon.name, "fontawesome-regular", "fontawesome-regular", icon.unicode);
            oModel.getProperty("/FontAwesomeIconList").push({
              "src": "sap-icon://fontawesome-regular/" + icon.name,
              "name": icon.name,
              "unicode": icon.unicode
            });
          }
          else if (icon.unicode && icon.brand === "brands") {
            sap.ui.core.IconPool.addIcon(icon.name, "fontawesome-brands", "fontawesome-brands", icon.unicode);
            oModel.getProperty("/FontAwesomeIconList").push({
              "src": "sap-icon://fontawesome-brands/" + icon.name,
              "name": icon.name,
              "unicode": icon.unicode
            });
          }
          else {
            sap.ui.core.IconPool.addIcon(icon.name, "fontawesome-solid", "fontawesome-solid", icon.unicode);
            oModel.getProperty("/FontAwesomeIconList").push({
              "src": "sap-icon://fontawesome-solid/" + icon.name,
              "name": icon.name,
              "unicode": icon.unicode
            });
          }
        });
        oModel.refresh(true);
      });
    },
    getSimpleLineIcons: function () {
      oModel.setProperty("/SimpleLineIconList", []);
      SimpleLineIcons.getIcons(function (allIcons) {
        allIcons.map(function (icon) {
          if (icon.unicode) {
            sap.ui.core.IconPool.addIcon(icon.name, "lineicons", "lineicons", icon.unicode);
            oModel.getProperty("/SimpleLineIconList").push({
              "src": "sap-icon://lineicons/" + icon.name,
              "name": icon.name,
              "unicode": icon.unicode
            });
          }
        });
        oModel.refresh(true);
      });
    },
    getFontIcons: function () {
      oModel.setProperty("/FontIconList", []);
      FontIcons.getIcons(function (allIcons) {
        allIcons.map(function (icon) {
          if (icon.unicode) {
            sap.ui.core.IconPool.addIcon(icon.name, "icofont", "icofont", icon.unicode);
            oModel.getProperty("/FontIconList").push({
              "src": "sap-icon://icofont/" + icon.name,
              "name": icon.name,
              "unicode": icon.unicode
            });
          }
        });
        oModel.refresh(true);
      });
    },
  });
});
