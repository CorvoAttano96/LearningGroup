from gluon.serializers import loads_json #json serializa codigo (embebe o codifica)

def inicio():
    return dict()


def museosMarkers():
    mases = []
    rows = db().select(db.museums.ALL,orderby=db.museums.id)
    for row in rows:
        mase = {
        'lat': row.lat,
        'lng': row.lng,
        'title': row.name,
        #'infowindow':{'content':"<p>HTML Content</p>"}
        }
        mases.append(mase)
    return response.json(mases)
