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
          
              map.addMarker({
              lat: $('#lati').text(),
              lng:$('#long').text(),
              title:"Tu destino",
              icon :'/GuiArtec/static/imgs/museum.png',
              });
              map.drawRoute({
                origin: [position.coords.latitude, position.coords.longitude],
                destination: [$('#lati').text(), $('#long').text()],
                travelMode: 'walking',
                strokeColor: '#3f62d7',
                strokeOpacity: 0.6,
                strokeWeight: 6,
                /*callback: route => {
                var distance = route.legs[0].steps[0].path;
                alert(distance);
                }*/
              });


     
            },
            error: function(error) {
              alert('Geolocation failed: '+error.message);
              /*Redirigir al menu*/
            },
            not_supported: function() {
              alert("Your browser does not support geolocation");
            },

          });


      });