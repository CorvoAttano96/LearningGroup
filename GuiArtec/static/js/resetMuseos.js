$("#reset").click(function(){
        var map = new GMaps({
          div: '#map',
          lat: -27.4560454,
          lng: -58.9865345,
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
                        });
                }
                  map.fitLatLngBounds(bounds);
                /*map.addMarkers(data)*/
              });


      });