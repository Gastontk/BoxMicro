(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{16:function(e,t,o){e.exports=o(43)},21:function(e,t,o){},25:function(e,t,o){},43:function(e,t,o){"use strict";o.r(t);var n=o(0),a=o.n(n),l=o(9),r=o.n(l),i=(o(21),o(13)),s=o.n(i),c=o(15),p=o(2),d=o(3),u=o(6),g=o(4),m=o(5),h=(o(25),o(10)),f=o(7),v=function(e){function t(e){var o;return Object(p.a)(this,t),(o=Object(u.a)(this,Object(g.a)(t).call(this,e))).markerProps={},o.isLegal=!0,o.initMap=o.initMap.bind(Object(h.a)(Object(h.a)(o))),o.markers=[],o.toMapData=o.props.toMapData,console.log("I came from the server",o.props.toBeMappedFromServer),o}return Object(m.a)(t,e),Object(d.a)(t,[{key:"initMap",value:function(e,t){var o=this;console.log("cooooooords",this.props.toBeMappedFromServer);var n=e.google,a=new n.maps.drawing.DrawingManager({drawingMode:null,drawingControl:!0,drawingControlOptions:{position:n.maps.ControlPosition.TOP_CENTER,drawingModes:[n.maps.drawing.OverlayType.POLYGON]},markerOptions:{icon:"https://developers.google.com/maps/documentation/javascript/examples/full/images/parking.png"},polygonOptions:{fillColor:"#00FF0",icon:"https://developers.google.com/maps/documentation/javascript/examples/full/images/parking.png"},map:t}),l=document.getElementById("searchWindow"),r=new n.maps.places.SearchBox(l),i=[];r.addListener("places_changed",function(){var e=r.getPlaces();if(0!==e.length){i.forEach(function(e){e.setMap(null)}),i=[];var o=new n.maps.LatLngBounds;console.log("bounds",o),e.forEach(function(e){if(e.geometry){var a={url:e.icon,size:new n.maps.Size(71,71),origin:new n.maps.Point(0,0),anchor:new n.maps.Point(17,34),scaledSize:new n.maps.Size(25,25)};i.push(new n.maps.Marker({map:t,icon:a,title:e.name,position:e.geometry.location})),e.geometry.viewport?o.union(e.geometry.viewport):o.extend(e.geometry.location)}else console.log("Returned place contains no geometry")}),t.fitBounds(o)}});var s=[],c=[];a.addListener("polygoncomplete",function(e){n.maps.event.addListener(e,"click",function(o){console.log(e),e.setMap(t)});var a=e.getPath().getArray();console.log("coordinates",a),s.push(e),s.length>1&&(console.log("changing previous polygon color"),setTimeout(function(){s[s.length-2].setMap(t)},10)),console.log("the polygon array includes: ",s),console.info("The coordinates that make up the polygon are");var l=[],r="<br>DIMENSIONS: <br>";a.length>1&&(a.forEach(function(e,t){if(console.log(e.lat(),e.lng(),t),l.push([a[t].lat(),a[t].lng()]),t<a.length-1){var o=u(a[t].lat(),a[t].lng(),a[t+1].lat(),a[t+1].lng());r=r+(1e3*o*3.2808).toFixed(2)+" feet  <br> by ",console.log(o.toFixed(4),"km in length")}else{var n=u(a[t].lat(),a[t].lng(),a[0].lat(),a[0].lng());r=r+(1e3*n*3.2808).toFixed(2)+" feet"}}),o.props.sendPolygonToServer({points:l,legal:p.checked})),console.log("dimensionsString ",r);var i=10.7639*n.maps.geometry.spherical.computeArea(e.getPath());document.getElementById("sqfeet").value=i.toFixed(3)+" Square Feet",console.log("Its area in square meters",n.maps.geometry.spherical.computeArea(e.getPath())),console.log(i," is the square feet.");var d=new n.maps.Marker({position:a[0],map:t,title:"Dimensions"});console.log("before markers",o.state),c.push(d),d.setMap(t),console.log(o.props.toBeMappedFromServer),setTimeout(function(){d.setMap(null)},2e3);var g=new n.maps.InfoWindow({content:"SQUARE FEET:<br>"+(10.7639*n.maps.geometry.spherical.computeArea(e.getPath())).toFixed()+r});d.addListener("click",function(){g.open(f.Map,d)}),e.addListener("mouseover",function(){console.log("hovering"),d.setMap(t),g.open(f.Map,d),setTimeout(function(){g.close()},5e3)}),g.open(f.Map,d)}),a.polygonOptions.fillColor="#00FF00",a.polygonOptions.fillOpacity=.8;var p=document.getElementById("isLegal");p.addEventListener("click",function(){console.log("inside init and islegal is clicked."),a.polygonOptions.fillColor="#00FF00"}),document.getElementById("isProhibited").addEventListener("click",function(){console.log("inside init and prohibited is clicked."),a.polygonOptions.fillColor="#ff0000"});var d=function(e){return e*Math.PI/180},u=function(e,t,o,n){var a=d(o-e),l=d(n-t);e=d(e),o=d(o);var r=Math.sin(a/2)*Math.sin(a/2)+Math.sin(l/2)*Math.sin(l/2)*Math.cos(e)*Math.cos(o);return 6371*(2*Math.atan2(Math.sqrt(r),Math.sqrt(1-r)))},g=this.props.toBeMappedFromServer.map(function(e){console.log("pgn",e);var t=[];return e.coords.forEach(function(e){console.log(e),t.push({lat:e[0],lng:e[1]})}),t.push({lat:e.coords[0][0],lng:e.coords[0][1]}),t.push({legal:e.legal}),t});console.log("cleaned Coordinates",g),g.forEach(function(e){console.log("polygon",e);var o=e.pop();console.log("legal is",o.legal),new n.maps.Polygon({path:e,geodesic:!0,strokeColor:"#00ff00",fillColor:o.legal?"#00ff00":"#ff0000",strokeOpacity:1,strokeWeight:2}).setMap(t)})}},{key:"render",value:function(){return a.a.createElement("div",null,a.a.createElement("div",null,a.a.createElement("div",null,a.a.createElement("h2",null,"Square Feet"),a.a.createElement("input",{type:"text",id:"sqfeet",placeholder:"value goes here"}),a.a.createElement("br",null),a.a.createElement("br",null)),a.a.createElement("h2",null,"Mark Legal or Prohibited"),a.a.createElement("div",{id:"legals"},a.a.createElement("input",{type:"radio",name:"legal",value:"legal",id:"isLegal",defaultChecked:!0})," ","Legal",a.a.createElement("br",null),a.a.createElement("input",{type:"radio",name:"legal",value:"prohibited",id:"isProhibited"})," ","Prohibited",a.a.createElement("br",null),a.a.createElement("br",null),a.a.createElement("br",null))),a.a.createElement("br",null),a.a.createElement("div",{id:""},a.a.createElement("label",{style:{color:"green",fontSize:"20pt"}},"Search Bar"),a.a.createElement("br",null),a.a.createElement("input",{style:{border:"solid green 6px"},type:"text",id:"searchWindow",placeholder:"search for a city"})),a.a.createElement(f.Map,{style:{width:"80%",height:"80%",marginLeft:"10%",border:"solid green 8px"},google:window.google,onReady:this.initMap,onClick:this.onMapClicked,sendPolygonToServer:this.sendPolygonToServer,toMapData:this.data,initialCenter:{lat:47.6062,lng:-122.3321},zoom:15,scaleControl:!0,eMapApiInternals:!0}))}}]),t}(a.a.Component),E=Object(f.GoogleApiWrapper)({apiKey:"AIzaSyAKWE1JinLb5yLSoxHiEjiq1CMuOqbx_s4",libraries:["drawing","places"]})(v),y=o(11),b=function(e){function t(){return Object(p.a)(this,t),Object(u.a)(this,Object(g.a)(t).apply(this,arguments))}return Object(m.a)(t,e),Object(d.a)(t,[{key:"render",value:function(){return this.props.isGeolocationAvailable?this.props.isGeolocationEnabled?this.props.coords?a.a.createElement("table",null,a.a.createElement("tbody",null,a.a.createElement("tr",null,a.a.createElement("td",null,"latitude"),a.a.createElement("td",null,this.props.coords.latitude)),a.a.createElement("tr",null,a.a.createElement("td",null,"longitude"),a.a.createElement("td",null,this.props.coords.longitude)),a.a.createElement("tr",null,a.a.createElement("td",null,"altitude"),a.a.createElement("td",null,this.props.coords.altitude)),a.a.createElement("tr",null,a.a.createElement("td",null,"heading"),a.a.createElement("td",null,this.props.coords.heading)),a.a.createElement("tr",null,a.a.createElement("td",null,"speed"),a.a.createElement("td",null,this.props.coords.speed)))):a.a.createElement("div",null,"Getting the location data\u2026 "):a.a.createElement("div",null,"Geolocation is not enabled"):a.a.createElement("div",null,"Your browser does not support Geolocation")}}]),t}(a.a.Component),M=Object(y.geolocated)({positionOptions:{enableHighAccuracy:!1},userDecisionTimeout:5e3})(b),w=function(e){function t(e){var o;return Object(p.a)(this,t),(o=Object(u.a)(this,Object(g.a)(t).call(this,e))).sendPolygonToServer=function(){var e=Object(c.a)(s.a.mark(function e(t){var o;return s.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("/gps",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(t)});case 2:o=e.sent,console.log("response",o.data);case 4:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}(),o.data=[],o.state={toBeMappedFromServer:[]},o}return Object(m.a)(t,e),Object(d.a)(t,[{key:"componentDidMount",value:function(){var e=this;console.log("componentDidMount",this.state),fetch("/gps").then(function(e){return e.json()}).then(function(t){console.log("data",t.data),e.setState({toBeMappedFromServer:t.data})}),setTimeout(function(){console.log("Location available",y.geolocated.isGeolocationAvailable)},4e3)}},{key:"render",value:function(){return a.a.createElement("div",{className:"App"},a.a.createElement("h1",null,"This is the app.js page"),a.a.createElement(M,null),a.a.createElement(E,{sendPolygonToServer:this.sendPolygonToServer,toMapData:this.data,toBeMappedFromServer:this.state.toBeMappedFromServer}))}}]),t}(n.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));r.a.render(a.a.createElement(w,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[16,2,1]]]);
//# sourceMappingURL=main.8a72a658.chunk.js.map