# -*- coding: utf-8 -*-
from gluon.serializers import loads_json #json serializa codigo (embebe o codifica)

def index():
    return dict()


def museosMarkers():
    mases = []
    rows = db().select(db.museums.ALL,orderby=db.museums.id)
    for row in rows:
        mase = {
        'lat': row.lat,
        'lng': row.lng,
        'title': row.name,
        'infoWindow': { 'content': "<h4>" + row.name +"</h4><p>Direccion: "+row.direccion+"</p><img  heigth='150px' width = '150px' src='"+URL('download',args=row.file)+"'/>"},
        }
        mases.append(mase)
    return response.json(mases)