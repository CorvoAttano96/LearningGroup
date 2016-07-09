# intente algo como
from gluon.serializers import loads_json #json serializa codigo (embebe o codifica)

def index():
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
        #'infoWindow': { 'content': "<h1>" + row.nombre +"</h1>"+"<p>Direccion: "+row.direccion+"</p><p>"+row.descripcion+"</p>" },
        }
        places.append(place)
    return response.json(places)


def esculturasMarkers1():
    places = []
    rows = db(db.camino.id != None).select()
    for row in rows:
        place = {
        'lat': row.lat,
        'lng': row.lng,
        'title': "Nombre y foto",
        'type': "Escultura",
        'location' : {'lat':row.lat,'lng': row.lng},
        'stopover' : True,
        'infoWindow': { 'content': "<h3>Nombre</h3><p>Direccion: "+row.direccion+"</p>"},
        }
        places.append(place)
    return response.json(places)

def esculturasMarkers2():
    places = []
    rows = db(db.caminoe.id != None).select()
    for row in rows:
        place = {
        'lat': row.lat,
        'lng': row.lng,
        'title': row.nombre,
        #'type': "Escultura",
        'location' : {'lat':row.lat,'lng': row.lng},
        'stopover' : True,
        'infoWindow': { 'content': "<h3>" + row.nombre +"</h3><p>Direccion: "+row.direccion+"</p>"},
        }
        places.append(place)
    return response.json(places)    

#Hace falta crear mas senderos como este.
def crearSenderoEsculturas1():
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


def crearSenderoEsculturas2():
    paths = []
    rows = db().select(db.caminoe.ALL,orderby=db.caminoe.id)
    for row in rows:
        path = {
            'location' : {'lat':row.lat,
                          'lng': row.lng},
            'stopover' : True
        }
    paths.append(path)
    return response.json(paths)
