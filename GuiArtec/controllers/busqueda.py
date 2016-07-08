# -*- coding: utf-8 -*-
# intente algo como
from gluon.serializers import loads_json #json serializa codigo (embebe o codifica)

def index():
      points=db().select(db.puntosint.ALL)
      museums=db().select(db.museums.ALL)
      return dict(registros=museums,puntos=points)

