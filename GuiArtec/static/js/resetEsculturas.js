
 /*Creo el mapa con Gmaps*/
  $("#reset").click(function(){
    var map = new GMaps({
      div: '#map',
      lat: -27.4560454,
      lng: -58.9865345,
    });

    //Inserto una busqueda de lugares
    /*GMaps.geocode({
      address : $('#address').val(),
      address: address,
      callback: function(results, status) {
        if (status == 'OK') {
          var latlng = results[0].geometry.location;
          map.setCenter(latlng.lat(), latlng.lng());
          map.addMarker({
            lat: latlng.lat(),
            lng: latlng.lng()
          });
        }
      }
    });*/
    var tulat = -27.4371393; 
    var tulng=-58.9810041;
    var marcadores = [];

      $.getJSON('../senderoEsculturas/esculturasMarkers1',
      function(data){
        var len = data.length;
        var bounds = [];
        var path = [];
        for(i=0; i< len ; i++){
            var lat = data[i].lat;
            var lng = data[i].lng;
            var title = data[i].title;
            var info = data[i].infoWindow;
            var ico = '/GuiArtec/static/imgs/sculture.png';
            var latlng = new google.maps.LatLng(lat, lng);
            bounds.push(latlng);
            var marcador = map.addMarker({
              lat: lat,
              lng: lng,
              title:title,
              infoWindow : info,
              icon:ico,
              visible:true
              //Lo que se ejecuta al clikear el marcador
            });
            marcadores.push(marcador);
        }
        map.fitLatLngBounds(bounds);
      });

      //Aca falta el recorrido por defecto       

        $("#ruta").click(function(){
                
                map.addListener('click', function(e){
                  //Borro todas las rutas y marcadores existentes
                map.removePolylines();
                map.removeMarkers();
                var lato=e.latLng.lat();
                var lngo=e.latLng.lng();

                //Creo un marcador en la posicion elegida por el usuario
                var punto = map.addMarker({
                lat: lato,
                lng:lngo,
                title:"Tu estas aqui",
                });


                var marcadores = [];

                $.getJSON('../senderoEsculturas/esculturasMarkers1',
                function(data){
                  var len = data.length;
                  var bounds = [];
                  var path = [];
                  for(i=0; i< len ; i++){
                      var lat = data[i].lat;
                      var lng = data[i].lng;
                      var title = data[i].title;
                      var info = data[i].infoWindow;
                      var ico = '/GuiArtec/static/imgs/sculture.png';
                      var latlng = new google.maps.LatLng(lat, lng);
                      bounds.push(latlng);
                      var marcador = map.addMarker({
                        lat: lat,
                        lng: lng,
                        title:title,
                        infoWindow : info,
                        icon:ico,
                        visible:true,
                        //Lo que se ejecuta al clikear el marcador
                        click: function(e){  
                          path = [[lato, lngo],[lato,e.position.lng()],[e.position.lat(), e.position.lng()],[e.position.lat(), lngo]];                
                          map.removePolylines();
                          $.getJSON('../senderoEsculturas/esculturasMarkers1',
                          function(data){
                              for(i=0; i< data.length ; i++) {
                                    marcadores[i].setVisible(false)
                              }

                              polygon = map.drawPolygon({
                                paths: path,
                                strokeColor: 'transparent',
                                strokeOpacity: 1,
                                strokeWeight: 3,
                                fillColor: 'transparent',
                                fillOpacity: 0.6
                              });

                              var waypoint = [];
                              $.getJSON('../senderoEsculturas/crearSenderoEsculturas1',
                                function(data){
                                
                                for(i=0; i< data.length ; i++) {
                                    if (map.checkGeofence(data[i].location.lat,data[i].location.lng,polygon)){
                                      var way = data[i];
                                      waypoint.push(way);
                                    }
                                };
                              });


                              var route = map.drawRoute({ //Dibuja la ruta
                                origin: [lato, lngo],
                                destination: [e.position.lat(), e.position.lng()],
                                travelMode: 'walking',
                                waypoints: waypoint,
                                strokeColor: '#3f62d7',
                                strokeOpacity: 0.6,
                                strokeWeight: 6,
                                callback: route => {
                                  var camino = route.legs[0];
                                  for (var k=0;k<route.legs[0].steps.length;k++){
                                  camino = route.legs[0].steps[k].path;
                                    for (var c=0;c<camino.length;c++){
                                      //Rangos cero,creados a lo largo de la ruta
                                      circle = map.drawCircle({
                                        lat: camino[c].lat(),
                                        lng: camino[c].lng(),
                                        radius: 150,
                                        strokeColor: 'transparent',
                                        strokeOpacity: 1,
                                        strokeWeight: 3,
                                        fillColor: 'transparent'
                                      });
                                      for(i=0; i< data.length ; i++){
                                        var check0 = (map.checkGeofence(data[i].lat,data[i].lng,circle));
                                        if (check0 && data[i].lat != e.position.lat() && data[i].lng != e.position.lng()) {
                                          marcadores[i].setVisible(true)
                                        }    
                                      }
                                    }
                                  }
                                }
                              }); 
                                
                              
                              //Dibujo circulos en el origen y destino para usarlos como limites de geofence.
                              //Rango 1
                              circle = map.drawCircle({
                                lat: lato,
                                lng: lngo,
                                radius: 200,
                                strokeColor: 'transparent',
                                strokeOpacity: 1,
                                strokeWeight: 3,
                                fillColor: 'transparent'
                              });

                              //Muestro los marcadores dentro del rango 1
                              for(i=0; i< data.length ; i++){
                                var check1 = (map.checkGeofence(data[i].lat,data[i].lng,circle));
                                if (check1 && data[i].lat != e.position.lat() && data[i].lng != e.position.lng()) {
                                  marcadores[i].setVisible(true)
                                }    
                              }

                              //Rango 2
                              circle = map.drawCircle({
                                lat: e.position.lat(),
                                lng: e.position.lng(),
                                radius: 250,
                                strokeColor: 'transparent',
                                strokeOpacity: 1,
                                strokeWeight: 3,
                                fillColor: 'transparent'
                              });

                              //Muestro los marcadores dentro del rango 2
                              for(i=0; i< data.length ; i++){
                                var check2 = (map.checkGeofence(data[i].lat,data[i].lng,circle));
                                if (check2) {
                                  marcadores[i].setVisible(true)
                                }; 
                              }


                              for(i=0; i< data.length ; i++){
                                if (data[i].lat == e.position.lat() && data[i].lng == e.position.lng()) {
                                  marcadores[i].setVisible(true)  
                                }; 
                              }
                                    
                          })

                        }
                      });
                      marcadores.push(marcador);
                  }
                  map.fitLatLngBounds(bounds);
                });

      });
  });             
});