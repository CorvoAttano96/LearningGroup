# -*- coding: utf-8 -*-
from gluon.serializers import loads_json #json serializa codigo (embebe o codifica)

def index():
    return dict(verificador='index')

def buscar():
    coor = request.post_vars
    response.view="senderoMuseos/index.html" 
    return dict(lng=coor.lng, lat=coor.lat, verificador='busqueda')


def museosMarkers():
    mases = []
    rows = db().select(db.museums.ALL,orderby=db.museums.id)
    for row in rows:
        mase = {
        'lat': row.lat,
        'lng': row.lng,
        'title': row.name,
        'infoWindow': {'content': "<h4 style='color:black;text-align:center'>"+row.name+"</h4><p style='color:black;text-align:center'>Direccion: "+row.direccion+"</p><img width ='120px' src='"+URL('download',args=row.file)+"'/>"},
        }
        mases.append(mase)
    return response.json(mases)

def download():
    return response.download(request, db)