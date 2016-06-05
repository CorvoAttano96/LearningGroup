# -*- coding: utf-8 -*-
# intente algo como
from gluon.serializers import loads_json #json serializa codigo (embebe o codifica)


def index():
    return dict('')

def getMarkers():
    places = []
    rows = db(db.place.id != None).select()
    for row in rows:
        place = {
        'lat': row.lat,
        'lng': row.lng,
        'title': row.name,
        'infowindow':{'content':"<p>"+ row.descr +"</p>"}
        }
        places.append(place)

    return response.json(places)

def crearRecorrido():
    path = []
    rows = db(db.place.id != None).select()
    for row in rows:
        place = {
          'lat': row.lat,
          'lng': row.lng
        }
        path.append(place)

    return response.json(path)
