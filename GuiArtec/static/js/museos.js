$(document).ready(function(){
        map = new GMaps({
          div: '#map',
          lat: -27.4560454,
          lng: -58.9865345,
        });

        GMaps.geolocate({
            success: function(position) {
              map.setCenter(position.coords.latitude, position.coords.longitude);
              map.addMarker({
              lat: position.coords.latitude,
              lng:position.coords.longitude,
              title:"Tu estas aqui",
              });
              $.getJSON('../senderoMuseos/museosMarkers',
              function(data){
                var len = data.length;
                var bounds = [];
                for(i=0; i< len ; i++){
                    var lat = data[i].lat;
                    var lng = data[i].lng;
                    var title = data[i].title;
                    var info = data[i].infoWindow;
                    var ico = '/GuiArtec/static/imgs/museum.png';
                    var latlng = new google.maps.LatLng(lat, lng);
                    bounds.push(latlng);    
                        map.addMarker({
                          lat: lat,
                          lng: lng,
                          title:title,
                          infoWindow : info,
                          icon:ico,
                          click: function(e){
                            map.removePolylines();
                            map.drawRoute({
                                  origin: [position.coords.latitude, position.coords.longitude],
                                  destination: [e.position.lat(), e.position.lng()],
                                  travelMode: 'walking',
                                  strokeColor: '#3f62d7',
                                  strokeOpacity: 0.6,
                                  strokeWeight: 6,
                                  /*callback: route => {
                                  var distance = route.legs[0].steps[0].path;
                                  
                                  alert(distance);
                                  }*/
                                });
                          }
                        });
                }
                  map.fitLatLngBounds(bounds);
                /*map.addMarkers(data)*/
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



      });