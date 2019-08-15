'use strict'
jQuery.sap.require('SapUI5Tutorial.Router')
sap.ui.define(
  [
    'sap/ui/core/UIComponent'
  ],
  function (UIComponent) {
    return UIComponent.extend('SapUI5Tutorial.Component', {
      metadata: {
        routing: {
          config: {
            routerClass: SapUI5Tutorial.Router,
            viewType: 'XML',
            targetAggregation: 'pages',
            clearTarget: false
          },
          routes: [{
            pattern: '',
            viewPath: 'SapUI5Tutorial.Application.Start.views',
            name: 'Start',
            view: 'Start',
            targetControl: 'masterAppView'
          }
          ]
        }
      },
      init: function () {
        UIComponent.prototype.init.apply(this, arguments);
        this.getRouter().initialize();
      },
      createContent: function () {
        var oViewData = {
          component: this
        }
        return sap.ui.view({
          viewName: 'SapUI5Tutorial.RootApp',
          type: sap.ui.core.mvc.ViewType.XML,
          id: 'app',
          viewData: oViewData
        })
      }
    })
  }
)