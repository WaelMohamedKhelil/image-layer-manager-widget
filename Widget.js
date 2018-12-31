define(['dojo/_base/declare', 'jimu/BaseWidget', "esri/geometry/Extent",
"esri/layers/MapImage", "esri/layers/MapImageLayer", "esri/toolbars/draw",
"esri/symbols/SimpleMarkerSymbol", "esri/layers/GraphicsLayer", "esri/graphic"],
function(declare, BaseWidget, Extent, MapImage, MapImageLayer, Draw, SimpleMarkerSymbol, GraphicsLayer, Graphic) {
  var point1 = null;
  var graphic1 = null;
  var point2 = null;
  var graphic2 = null;
  var graphicLayer = null;
  var tb1 = null;
  var tb2 = null;
  function addGraphic1(evt) {
    //delete previous point
    if(graphic1 != null)
    graphicLayer.remove(graphic1);
    //deactivate the toolbar and clear existing graphics 
    tb1.deactivate(); 
    this.map.enableMapNavigation();
    
    // figure out which symbol to use
    var symbol = new SimpleMarkerSymbol();
    point1 = evt.geometry;
    
    graphic1 = new Graphic(point1, symbol)
    graphicLayer.add(graphic1);
    
    console.log("Y(p1): " + point1.y);
    console.log("X(p1): " + point1.x);
  }
  function addGraphic2(evt) {
    //delete previous point
    if(graphic2 != null)
    graphicLayer.remove(graphic2);
    //deactivate the toolbar and clear existing graphics 
    tb2.deactivate(); 
    this.map.enableMapNavigation();
    
    // figure out which symbol to use
    var symbol = new SimpleMarkerSymbol();
    point2 = evt.geometry;
    
    graphic2 = new Graphic(point2, symbol)
    graphicLayer.add(graphic2);
    
    console.log("Y(p2): " + point2.y);
    console.log("X(p2): " + point2.x);
  }
  
  //To create a widget, you need to derive from BaseWidget.
  return declare([BaseWidget], {
    // Custom widget code goes here
    
    baseClass: 'jimu-widget-AddImageLayer',
    
    //this property is set by the framework when widget is loaded.
    //name: 'CustomWidget',
    
    
    //methods to communication with app container:
    
    // postCreate: function() {
    //   this.inherited(arguments);
    //   console.log('postCreate');
    // },
    
    startup: function() {
      this.inherited(arguments);
      this.mapIdNode.innerHTML = 'map id:' + this.map.id;
      console.log('startup');
      if(graphicLayer == null){
        graphicLayer = new GraphicsLayer();
        this.map.addLayer(graphicLayer);
      }
      this._onUpdate();
    },
    
    onOpen: function(){
      console.log('onOpen');
      
      document.getElementById("image-manager-container").style.display = "block";
      document.getElementById("points-managing-container").style.visibility = "hidden";
    },
    
    onClose: function(){
      console.log('onClose');
      if(tb1 != null)
      tb1.deactivate();
      if(tb2 != null)
      tb2.deactivate();
      graphic1 = null;       
      graphic2 = null;       
      graphicLayer.clear();
      delete graphicLayer;
      this.map.removeLayer(graphicLayer);
    },
    
    // onMinimize: function(){
    //   console.log('onMinimize');
    // },
    
    // onMaximize: function(){
    //   console.log('onMaximize');
    // },
    
    // onSignIn: function(credential){
    //   /* jshint unused:false*/
    //   console.log('onSignIn');
    // },
    
    // onSignOut: function(){
    //   console.log('onSignOut');
    // }
    
    // onPositionChange: function(){
    //   console.log('onPositionChange');
    // },
    
    // resize: function(){
    //   console.log('resize');
    // }
    
    //methods to communication between widgets:
    _onSave: function () {
      var x1 = document.getElementById("longp1").value;
      var y1 = document.getElementById("latp1").value;
      
      var x2 = document.getElementById("longp2").value;
      var y2 = document.getElementById("latp2").value;
      
      var mil = this.map.getLayer(document.getElementById("select-map-img-layers").value);
      var mi = mil.getImages()[0];
      mil.removeAllImages();	

      var extent = mi.extent;
      var xmin = (point1.x < point2.x)? (extent.xmin - (point1.x - x1)) : (extent.xmin - (point2.x - x2));
      var xmax = (point1.x > point2.x)? (extent.xmax - (point1.x - x1)) : (extent.xmax - (point2.x - x2));
      var ymin = (point1.y < point2.y)? (extent.ymin - (point1.y - y1)) : (extent.ymin - (point2.y - y2));
      var ymax = (point1.y > point2.y)? (extent.ymax - (point1.y - y1)) : (extent.ymax - (point2.y - y2));

      extent.update(xmin, ymin, xmax, ymax, this.map.spatialReference);  
      // var widthRatio = Math.abs(longp1 - longp2) / Math.abs(point1.getLongitude() - point2.getLongitude());
      // var heightRatio = Math.abs(latp1 - latp2) / Math.abs(point1.getLatitude() - point2.getLatitude());
      // var minDrag = point1.getLongitude() - longp1

      mil.addImage(mi);

      console.log("Latitude(p1): " + point1.y);
      console.log("Longitude(p1): " + point1.x);
      
      console.log("Latitude(p2): " + point2.y);
      console.log("Longitude(p2): " + point2.x);
      
      
      
      if(tb1 != null)
      tb1.deactivate();
      if(tb2 != null)
      tb2.deactivate();
      graphicLayer.clear();
      delete graphic1;
      delete graphic2;
    },
    _onGRClicked1: function () {
      if(tb1 != null)
      tb1.deactivate();
      if(tb2 != null)
      tb2.deactivate();
      tb1 = new Draw(this.map);
      tb1.on("draw-complete", addGraphic1);      
      // event delegation so a click handler is not
      // needed for each individual button
      this.map.disableMapNavigation();
      tb1.activate(Draw.POINT);
    },
    _onGRClicked2: function () {
      if(tb1 != null)
      tb1.deactivate();
      if(tb2 != null)
      tb2.deactivate();
      tb2 = new Draw(this.map);
      tb2.on("draw-complete", addGraphic2);
      // event delegation so a click handler is not
      // needed for each individual button
      this.map.disableMapNavigation();
      tb2.activate(Draw.POINT);
    },
    _onGRClicked: function () {
      
      
      graphic1 = null;
      graphic2 = null;
      graphicLayer.clear();
      
      document.getElementById("image-manager-container").style.display = "none";
      document.getElementById("points-managing-container").style.visibility = "visible";
    },
    _onUpdate: function () {
      
      //Get MapImageLayer(s)
      var mils = [];
      var layerIds = this.map.layerIds; 
      layerIds.forEach(element => {
        var layer = this.map.getLayer(element);
        if(layer instanceof MapImageLayer)
        mils.push(layer);
      });
      //Display MapImageLayer'(s) IDs as an option for the georeferencing
      var selectElement = document.getElementById("select-map-img-layers");
      selectElement.innerHTML = "";
      if(mils.length != 0) {
        mils.forEach(element => {
          var optionElement = document.createElement("option");
          var textElement = document.createTextNode(element.id);
          
          optionElement.setAttribute("value", element.id);
          
          optionElement.appendChild(textElement);
          
          selectElement.appendChild(optionElement);
        });
        this.btnGR.disabled = false;
        this.btnGR.setAttribute("class", "jimu-btn");
        
        this.btnDelete.disabled = false;
        this.btnDelete.setAttribute("class", "jimu-btn");
      }else{
        
        this.btnGR.disabled = true;
        this.btnGR.setAttribute("class", "jimu-btn jimu-state-disabled");
        this.btnDelete.disabled = true;
        this.btnDelete.setAttribute("class", "jimu-btn jimu-state-disabled");
      }
      
    },
    _onBtnDeleteClicked: function(){
      var layerId = document.getElementById("select-map-img-layers").value;
      var layer = this.map.getLayer(layerId);
      if(layer != undefined)
      this.map.removeLayer(layer);
      this._onUpdate();
    },
    _onBtnCancelClicked: function(){
      document.getElementById("image-manager-container").style.display = "block";
      document.getElementById("points-managing-container").style.visibility = "hidden";
      tb1.deactivate();
      tb2.deactivate();
      graphic1 = null;
      graphic2 = null;       
      graphicLayer.clear();
    },
    _onBtnAddImageClicked: function(){
      
      
      var mapExtent = this.map.extent;
      var mapSpatialReference = this.map.spatialReference;
      var extent = new Extent().update(mapExtent.xmin, mapExtent.ymin, mapExtent.xmax,
        mapExtent.ymax, mapSpatialReference);  
        var mi;
        var mil = new MapImageLayer();
        var map = this.map;
        
     
        

          var input = document.getElementById("uploadImage");
          if (input.files && input.files[0]) {
            var reader = new FileReader();
        
            reader.onload = function (e) {
               mi = new MapImage({  
                "extent":extent,
                "href": e.target.result  
              });
              mil.addImage(mi);
              map.addLayer(mil);
            };
        
            reader.readAsDataURL(input.files[0]);
        }
        this._onUpdate();
      },
    });
  });