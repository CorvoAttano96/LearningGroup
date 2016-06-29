# intente algo como
from gluon.serializers import loads_json #json serializa codigo (embebe o codifica)

def inicio():
    return dict()

def esculturasMarkers():
    places = []
    rows = db(db.esculturag.id != None).select()
    for row in rows:
        place = {
        'lat': row.lat,
        'lng': row.lng,
        'title': row.nombre,
        'location' : {'lat':row.lat,'lng': row.lng},
        'stopover' : True
        #'infowindow':{'content':"<p>HTML Content</p>"}
        }
        places.append(place)
    return response.json(places)

#Hace falta crear mas senderos como este.
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


def esculturasMarkers2():
    places = []
    rows = db(db.scul2.id != None).select()
    for row in rows:
        place = {
        'lat': row.lat,
        'lng': row.lng,
        'title': row.nombre,
        'location' : {'lat':row.lat,'lng': row.lng},
        'stopover' : True
        #'infowindow':{'content':"<p>HTML Content</p>"}
        }
        places.append(place)
    return response.json(places)


def crearSenderoEsculturas2():
    paths = []
    rows = db().select(db.scul2.ALL,orderby=db.scul2.id)
    for row in rows:
        path = {
            'location' : {'lat':row.lat,
                          'lng': row.lng},
            'stopover' : True
        }
    paths.append(path)
    return response.json(paths)
