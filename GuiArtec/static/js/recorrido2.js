//Inserto recorrido 2
  $("#recorrido2").click(function(){
    var map = new GMaps({
      div: '#map',
      lat: -27.4560454,
      lng: -58.9865345,
    });

   $("#gps").click(function(){
      map.addListener('click', function(e){
        map.removeMarkers();
        var destinos=[];
        //Creo un marcador en el punto donde cliquee
        var destino= map.addMarker({
          lat:e.latLng.lat(),
          lng:e.latLng.lng(),
          title: "Tu destino"
        });

        //Geolocalizo y centro el mapa en la posicion del usuario. 
        GMaps.geolocate({
          success: function(position) {
            map.setCenter(position.coords.latitude, position.coords.longitude);
            //Borro todas las rutas existentes
            map.removePolylines();
            //Preparo el filtro para los marcadores
            var tulat = position.coords.latitude; 
            var tulng=position.coords.longitude;
            var marcadores = [];
            path = [[tulat, tulng],[tulat,e.latLng.lng()],[e.latLng.lat(), e.latLng.lng()],[e.latLng.lat(), tulng]];
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

            //Dibujo la ruta
            map.drawRoute({
              origin: [position.coords.latitude, position.coords.longitude],
              destination: [e.latLng.lat(), e.latLng.lng()],
              travelMode: 'walking',
              waypoints: waypoint,
              strokeColor: '#3f62d7',
              strokeOpacity: 0.6,
              strokeWeight: 6,
            });


          $.getJSON('../senderoEsculturas/esculturasMarkers2',
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
                    path = [[tulat, tulng],[tulat,e.position.lng()],[e.position.lat(), e.position.lng()],[e.position.lat(), tulng]];                
                    map.removePolylines();
                    $.getJSON('../senderoEsculturas/esculturasMarkers2',
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
                        $.getJSON('../senderoEsculturas/crearSenderoEsculturas2',
                          function(data){
                          
                          for(i=0; i< data.length ; i++) {
                              if (map.checkGeofence(data[i].location.lat,data[i].location.lng,polygon)){
                                var way = data[i];
                                waypoint.push(way);
                              }
                          };
                        });


                        var route = map.drawRoute({ //Dibuja la ruta
                          origin: [position.coords.latitude, position.coords.longitude],
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
                          lat: tulat,
                          lng: tulng,
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



          },
          error: function(error) {
            alert('Geolocation failed: '+error.message);
          },
          not_supported: function() {
            alert("Your browser does not support geolocation");
          },
          always: function() {
            //alert("Done!");
          }
        });

            
      })
    })   


    //Inserto una busqueda de lugares
    GMaps.geocode({
      address: $('#address').val(),
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
    });


    //Localizo la posicion del usuario y centro el mapa en dicha posicion. Dentro de esta funcion se desarrolla casi toda la funcionalidad del mapa.
    GMaps.geolocate({
        success: function(position) {
          map.setCenter(position.coords.latitude, position.coords.longitude);
          map.addMarker({
          lat: position.coords.latitude,
          lng:position.coords.longitude,
          title:"Tu estas aqui",
          /*icon: "url",*/
          });
          var tulat = position.coords.latitude; 
          var tulng=position.coords.longitude;
          var marcadores = [];

          $.getJSON('../senderoEsculturas/esculturasMarkers2',
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
                    path = [[tulat, tulng],[tulat,e.position.lng()],[e.position.lat(), e.position.lng()],[e.position.lat(), tulng]];                
                    map.removePolylines();
                    $.getJSON('../senderoEsculturas/esculturasMarkers2',
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

                        $.getJSON('../senderoEsculturas/crearSenderoEsculturas2',
                          function(data){
                          map.drawRoute({ //Dibuja la ruta
                            //var location: 
                            origin: [position.coords.latitude, position.coords.longitude],
                            destination: [e.position.lat(), e.position.lng()],
                            travelMode: 'walking',
                            strokeColor: '#3f62d7',
                            strokeOpacity: 0.6,
                            strokeWeight: 6,
                            //bounds: path,
                            //waypoints: data,
                          }); 
                        });
                        
                        //Dibujo poligonos para usarlos como limites de geofence.
                        polygon = map.drawPolygon({
                          paths: path,
                          strokeColor: 'transparent',
                          strokeOpacity: 1,
                          strokeWeight: 3,
                          fillColor: 'transparent',
                          fillOpacity: 0.6
                        });

                        circle = map.drawCircle({
                          lat: tulat,
                          lng: tulng,
                          radius: 200,
                          strokeColor: 'transparent',
                          strokeOpacity: 1,
                          strokeWeight: 3,
                          fillColor: 'transparent'
                        });

                        //Oculto los marcadores fuera del rango
                        for(i=0; i< data.length ; i++){
                          var check = (map.checkGeofence(data[i].lat,data[i].lng,circle));
                          var check1 = (map.checkGeofence(data[i].lat,data[i].lng,polygon));
                          if (check && data[i].lat != e.position.lat() && data[i].lng != e.position.lng()) {
                            marcadores[i].setVisible(true)
                          }
                          if (check1 && data[i].lat != e.position.lat() && data[i].lng != e.position.lng()) {
                            marcadores[i].setVisible(true)
                          };     
                        }

                        circle = map.drawCircle({
                          lat: e.position.lat(),
                          lng: e.position.lng(),
                          radius: 250,
                          strokeColor: 'transparent',
                          strokeOpacity: 1,
                          strokeWeight: 3,
                          fillColor: 'transparent'
                        });

                        //Oculto los marcadores fuera del rango 2
                        for(i=0; i< data.length ; i++){
                          var check2 = (map.checkGeofence(data[i].lat,data[i].lng,circle));
                          if (check2) {
                            marcadores[i].setVisible(true)
                          }; 
                        }


                        circle = map.drawCircle({
                          lat: e.position.lat(),
                          lng: tulng,
                          radius: 150,
                          strokeColor: 'transparent',
                          strokeOpacity: 1,
                          strokeWeight: 3,
                          fillColor: 'transparent'
                        });

                        //Oculto los marcadores fuera del rango 2
                        for(i=0; i< data.length ; i++){
                          var check3 = (map.checkGeofence(data[i].lat,data[i].lng,circle));
                          if (check3 && data[i].lat != e.position.lat() && data[i].lng != e.position.lng()) {
                            marcadores[i].setVisible(true)
                          }; 
                        }

                        circle = map.drawCircle({
                          lat: tulat,
                          lng: e.position.lng(),
                          radius: 150,
                          strokeColor: 'transparent',
                          strokeOpacity: 1,
                          strokeWeight: 3,
                          fillColor: 'transparent'
                        });

                        //Oculto los marcadores fuera del rango 2
                        for(i=0; i< data.length ; i++){
                          var check4 = (map.checkGeofence(data[i].lat,data[i].lng,circle));
                          if (check4 && data[i].lat != e.position.lat() && data[i].lng != e.position.lng()) {
                            marcadores[i].setVisible(true)
                          }
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

        },
        error: function(error) {
          alert('Geolocation failed: '+error.message);
          /*Redirigir al menu*/
        },
        not_supported: function() {
          alert("Your browser does not support geolocation");
        },
        /*always: function() {
          alert("Posicion localizada con exito!");
        }*/
      });

    /*$.getJSON('{{=('mapaEsculturrass','esculturasMarkers1')}}',
      function(data){
        var len = data.length ;
        for(i=0; i< (len - 1) ; i++){
          var lator = data[i].lat;
          var lngor = data[i].lng;
          var latde = data[i+1].lat;
          var lngde = data[i+1].lng;
            map.drawRoute({
              origin: [lator,lngor], 
              destination: [latde, lngde],
              travelMode: 'walking',
              strokeColor: '#5ECEFF',
              strokeOpacity: 0.6,
              strokeWeight: 6
            });
        }
      });*/

      //Segundo recorrido
      /*$.getJSON('{{=('mapaEsculturrass','crearSenderoEsculturas2')}}',
      function(data){
          map.drawRoute({
          origin: [-27.4382536,-58.9809245], //Coordenadas del Domo del Centenario
          destination: [-27.453483,-58.98028],
          waypoints:data,
          travelMode: 'walking',
          strokeColor: '#5ECEFF',
          strokeOpacity: 0.6,
          strokeWeight: 6
          });
        })

      $.getJSON('{{=('mapaEsculturrass','crearSenderoEsculturas2')}}',
      function(data){
          map.drawRoute({
          origin: [-27.453483, -58.98028],
          destination: [-27.452382,-58.986168],
          //waypoints:data,
          travelMode: 'walking',
          strokeColor: '#5ECEFF',
          strokeOpacity: 0.6,
          strokeWeight: 6
          });
        })
        
      $.getJSON('{{=('mapaEsculturrass','crearSenderoEsculturas2')}}',
      function(data){
          map.drawRoute({
          origin: [ -27.452382,-58.986168],
          destination: [-27.453915, -58.985165],
          //waypoints:data,
          travelMode: 'walking',
          strokeColor: '#5ECEFF',
          strokeOpacity: 0.6,
          strokeWeight: 6
          });
        })
        $.getJSON('{{=('mapaEsculturrass','crearSenderoEsculturas2')}}',
      function(data){
          map.drawRoute({
          origin: [-27.453915,  -58.985165],
          destination: [-27.456612,-58.983779],
          //waypoints:data,
          travelMode: 'walking',
          strokeColor: '#5ECEFF',
          strokeOpacity: 0.6,
          strokeWeight: 6
          });
        })

        $.getJSON('{{=('mapaEsculturrass','crearSenderoEsculturas2')}}',
      function(data){
          map.drawRoute({
          origin: [-27.456612,-58.983779],
          destination: [-27.451694,-58.989029],
          //waypoints:data,
          travelMode: 'walking',
          strokeColor: '#5ECEFF',
          strokeOpacity: 0.6,
          strokeWeight: 6
          });
        })

    $.getJSON('{{=('mapaEsculturrass','crearSenderoEsculturas2')}}',
      function(data){
          map.drawRoute({
          origin: [-27.451694,-58.989029],
          destination: [-27.449505,-58.984812],
          //waypoints:data,
          travelMode: 'walking',
          strokeColor: '#5ECEFF',
          strokeOpacity: 0.6,
          strokeWeight: 6
          });
        })


       $.getJSON('{{=('mapaEsculturrass','crearSenderoEsculturas2')}}',
      function(data){
          map.drawRoute({
          origin:[-27.449505,-58.984812],
          destination: [-27.44221,-58.982085],
          //waypoints:data,
          travelMode: 'walking',
          strokeColor: '#5ECEFF',
          strokeOpacity: 0.6,
          strokeWeight: 6
          });
        })*/
  });
