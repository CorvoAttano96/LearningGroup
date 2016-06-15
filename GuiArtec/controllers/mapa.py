# -*- coding: utf-8 -*-
# intente algo como
from gluon.serializers import loads_json #json serializa codigo (embebe o codifica)

def inicio():
    return dict()

def esculturasMarkers():
    places = []
    rows = db(db.camino.id != None).select()
    for row in rows:
        place = {
        'lat': row.lat,
        'lng': row.lng,
        'title': "Nombre y Foto",
        #'infowindow':{'content':"<p>HTML Content</p>"}
        }
        places.append(place)
    return response.json(places)


def crearSenderoEsculturas():
    paths = []
    rows = db().select(db.camino.ALL,orderby=db.camino.id)
    for row in rows:
        path = {
            'location' : {'lat':row.lat,
                          'lng': row.lng},
            'stopover' : True
        }
    paths.append(path)
    return response.json(paths)


def museosMarkers():
    return dict()

def iglesiasMarkers():
    return dict()

def otrosMarkers():
    return dict()
