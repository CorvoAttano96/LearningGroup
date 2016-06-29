# -*- coding: utf-8 -*-
# intente algo como

from gluon.serializers import loads_json #json serializa codigo (embebe o codifica)

def index(): 
    return dict()

def esculturasMarkers():
    places = []
    rows = db(db.camino.id != None).select()
    for row in rows:
        place = {
        'lat': row.lat,
        'lng': row.lng,
        'title': "Nombre y foto",
        'location' : {'lat':row.lat,'lng': row.lng},
        'stopover' : True
        #'infowindow':{ 'content': "<h1>" + row.nombre +"</h1>" +"<p>Direccion: "+row.direccion+"</p><p>"+row.descripcion+"</p>" }
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
    mases = []
    rows = db().select(db.museums.ALL,orderby=db.museums.id)
    for row in rows:
        mase = {
        'lat': row.lat,
        'lng': row.lng,
        'title': row.name,
        #'infowindow':{ 'content': "<h1>" + row.nombre +"</h1>" +"<p>Direccion: "+row.direccion+"</p><p>"+row.descripcion+"</p>" }
        }
        mases.append(mase)
    return response.json(mases)


def puntosMarkers():
    places = []
    rows = db(db.puntosint.id != None).select()
    for row in rows:
        place = {
        'lat': row.lat,
        'lng': row.lng,
        'title': row.nombre,
        #'infowindow':{ 'content': "<h1>" + row.nombre +"</h1>" +"<p>Direccion: "+row.direccion+"</p><p>"+row.descripcion+"</p>" }
        }
        places.append(place)
    return response.json(places)
