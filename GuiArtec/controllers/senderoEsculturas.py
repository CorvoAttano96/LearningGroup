# intente algo como
from gluon.serializers import loads_json #json serializa codigo (embebe o codifica)

def index():
    return dict()


def esculturasMarkers1():
    places = []
    rows = db(db.camino.id != None).select()
    for row in rows:
        place = {
        'lat': row.lat,
        'lng': row.lng,
        'title': row.nombre,
        'type': "Escultura",
        'location' : {'lat':row.lat,'lng': row.lng},
        'stopover' : True,
        'infoWindow': {'content': "<h4 style='color:black;text-align:center'>"+row.nombre+"</h4><p style='color:black;text-align:center'>Direccion: "+row.direccion+"</p><img width ='135px' src='"+URL('download',args=row.file)+"'/>"},
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
        'file': row.file,
        'infoWindow': { 'content': "<h4 style='color:black;text-align:center'>"+row.nombre+"</h4><p style='color:black;text-align:center'>Direccion: "+row.direccion+"</p><img width ='135px' src='"+URL('download',args=row.file)+"'/>"},
        }
        places.append(place)
    return response.json(places)  

def esculturasMarkers3():
    places = []
    rows = db(db.senderopral.id != None).select()
    for row in rows:
        place = {
        'lat': row.lat,
        'lng': row.lng,
        'title': row.nombre,
        #'type': "Escultura",
        'location' : {'lat':row.lat,'lng': row.lng},
        'stopover' : True,
        'file': row.file,
        'infoWindow': { 'content': "<h4 style='color:black;text-align:center'>"+row.nombre+"</h4><p style='color:black;text-align:center'>Direccion: "+row.direccion+"</p><img width ='135px' src='"+URL('download',args=row.file)+"'/>"},
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

def crearSenderoEsculturas3():
    paths = []
    rows = db().select(db.senderopral.ALL,orderby=db.senderopral.id)
    for row in rows:
        path = {
            'location' : {'lat':row.lat,
                          'lng': row.lng},
            'stopover' : True
        }
    paths.append(path)
    return response.json(paths)

def download():
    return response.download(request, db)