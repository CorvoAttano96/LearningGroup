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
        #'infowindow':{'content':"<p>HTML Content</p>"}
        }
        places.append(place)
    return response.json(places)
