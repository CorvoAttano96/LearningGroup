# -*- coding: utf-8 -*-
# intente algo como
from gluon.serializers import loads_json #json serializa codigo (embebe o codifica)

def index():
    return dict(grid=SQLFORM.grid(
            db.esculturag.id<50,
            fields=[db.esculturag.nombre,db.esculturag.escultor,db.esculturag.pais,db.esculturag.material,db.esculturag.direccion],
            field_id=None,
            left=None,
            headers={},
            orderby=None,
            groupby=None,
            searchable=True,
            sortable=False,
            paginate=20,
            deletable=False,
            editable=False,
            details=True,
            selectable=None,
            create=False,
            csv=False,
            links=None,
            links_in_grid=True,
            upload='<default>',
            args=[],
            user_signature=True,
            maxtextlengths={},
            maxtextlength=20,
            onvalidation=None,
            oncreate=None,
            onupdate=None,
            ondelete=None,
            sorter_icons=(XML('&#x2191;'), XML('&#x2193;')),
            ui = 'web2py',
            showbuttontext=True,
            _class="web2py_grid",
            formname='web2py_grid',
            search_widget='default',
            ignore_rw = False,
            formstyle = 'table3cols',
            exportclasses = None,
            formargs={},
            createargs={},
            editargs={},
            viewargs={},
            buttons_placement = 'right',
            links_placement = 'right'
            ))

