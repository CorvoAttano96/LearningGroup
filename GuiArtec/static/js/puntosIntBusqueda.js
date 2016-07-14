$(document).ready(function(){
  map = new GMaps({
    div: '#map',
    lat: -27.4560454,
    lng: -58.9865345,
  });

  map.addMarker({
      lat: $('#lati').text(),
      lng:$('#long').text(),
      title:"Tu destino",
      icon :'/GuiArtec/static/imgs/ptointeres.png',
      });


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

        map.addMarker({
          lat: $('#lati').text(),
          lng:$('#long').text(),
          title:"Tu destino",
          icon :'/GuiArtec/static/imgs/ptointeres.png',
        });
        
        map.drawRoute({
          origin: [lato, lngo],
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

    });
  });      
});


     