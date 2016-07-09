# -*- coding: utf-8 -*-
# intente algo como
def index(): 
    return dict()

def puntosMarkers():
    places = []
    rows = db(db.puntosint.id != None).select()
    for row in rows:
        place = {
        'lat': row.lat,
        'lng': row.lng,
        'title': row.nombre,
         'infoWindow': { 'content': "<h4>"+row.nombre+"</h4><p>Direccion: "+row.direccion+"</p>"},
        }
        places.append(place)
    return response.json(places)