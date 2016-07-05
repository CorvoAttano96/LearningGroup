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

def esculturasMarkersP():
    places = []

    lat = float(request.vars['lat'])
    lng = float(request.vars['lng'])
    distance = float(request.vars['distance'])

    rows = db.executesql('SELECT lat, lng, nombre, (111.302616974 * (lat - ?) * 111.302616974 * (lat - ?) + 111.302616974 * (? - lng) * 111.302616974 * (? - lng)) AS distance FROM esculturag WHERE id IS NOT NULL AND distance < (? * ?) ORDER BY distance;',
        placeholders = [lat, lat, lng, lng, distance, distance]
    )


    for row in rows:
        place = {
        'lat': row[0],
        'lng': row[1],
        'title': row[2],
        'location' : {'lat':row[0],'lng': row[1]},
        'stopover' : True
        #'infowindow':{'content':"<p>HTML Content</p>"}
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
        'stopover' : True
        #'infowindow':{'content':"<p>Foto. Nombre</p>"}
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
    rows = db().select(db.scul2.ALL,orderby=db.scul2.id)
    for row in rows:
        path = {
            'location' : {'lat':row.lat,
                          'lng': row.lng},
            'stopover' : True
        }
    paths.append(path)
    return response.json(paths)
