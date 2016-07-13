# -*- coding: utf-8 -*-
# intente algo como
def index(): 
    return dict(verificador="index")

def buscar():
    coor = request.post_vars
    response.view="senderoPuntos/index.html" 
    return dict(lng=coor.lng, lat=coor.lat, verificador='busqueda')

def puntosMarkers():
    places = []
    rows = db(db.puntosint.id != None).select()
    for row in rows:
        place = {
        'lat': row.lat,
        'lng': row.lng,
        'title': row.nombre,
        'infoWindow': { 'content': "<h3 style='color:black;text-align:center'>"+row.nombre+"</h3><p style='color:black;text-align:center'>Direccion: "+row.direccion+"</p><img width ='120px' src='"+URL('download',args=row.file)+"'/>"},
        }
        places.append(place)
    return response.json(places)

def download():
    return response.download(request, db)