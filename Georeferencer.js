///////////////////////////////////////////////////////////////////////////
// Copyright © 2014 - 2018 Esri. All Rights Reserved.
//
// Licensed under the Apache License Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//    http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
///////////////////////////////////////////////////////////////////////////

define([
  "dojo/_base/declare",
  "dojo/_base/lang",
  "dojo/_base/array",
  "dojo/_base/html",
  "dojo/dom-construct",
  "dijit/_TemplatedMixin",
  "dijit/_WidgetBase"
],
  function (declare, lang, array, html, domConstruct,
            _TemplatedMixin, _WidgetBase) {
    return declare([_WidgetBase, _TemplatedMixin], {
      name: "Georeferencer",
      baseClass: "jimu-widget-Georeferencer",
      declaredClass: 'jimu.dijit.Georeferencer',
      templateString: "<div style='width:100%'>" +
        "<div data-dojo-attach-point='GeoreferencerDiv'></div></div>",
      _settings: null,
      _editWidget: null,
      _origGetItemsFromLayerFunc: null
    });
  });
