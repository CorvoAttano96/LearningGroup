/*Creo el mapa con Gmaps*/
  $(document).ready(function(){
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
  //Coordenadas del domo
    var tulat = -27.4371393; 
    var tulng=-58.9810041;
    var marcadores = [];

      $.getJSON('../senderoMuseos/museosMarkers',
      function(data){
        var len = data.length;
        var bounds = [];
        var path = [];
        for(i=0; i< len ; i++){
            var lat = data[i].lat;
            var lng = data[i].lng;
            var title = data[i].title;
            var info = data[i].infoWindow;
            var ico = '/GuiArtec/static/imgs/museum.png';
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
                //var bounds = [];
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

                  $.getJSON('../senderoMuseos/museosMarkers',
                  function(data){
                    var len = data.length;
                    var bounds = [];
                    var path = [];
                    for(i=0; i< len ; i++){
                        var lat = data[i].lat;
                        var lng = data[i].lng;
                        var title = data[i].title;
                        var info = data[i].infoWindow;
                        var ico = '/GuiArtec/static/imgs/museum.png';
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
                            map.removePolylines();
                            var route = map.drawRoute({ //Dibuja la ruta
                              origin: [lato, lngo],
                              destination: [e.position.lat(), e.position.lng()],
                              travelMode: 'driving',
                              //waypoints: waypoint,
                              strokeColor: '#3f62d7',
                              strokeOpacity: 0.6,
                              strokeWeight: 6,
                            }); 
                                  
                          }

                        });
                    }

                  });
              });
      });
  });             

