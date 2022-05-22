const btn = document.getElementById('btn-testing')

btn.addEventListener('click', () => {
    db.collection('productos').doc().set({
        NombreProducto: 'Sabritas',
        Precio: 12,
        Seccion: 'frituras',
        Cantidad: 30
    })
    db.collection('productos').doc().set({
        NombreProducto: 'Galletas oreo',
        Precio: 12,
        Seccion: 'frituras',
        Cantidad: 4
    })
    db.collection('productos').doc().set({
        NombreProducto: 'Paletas de helado',
        Precio: 20,
        Seccion: 'Frio',
        Cantidad: 12
    })
    db.collection('productos').doc().set({
        NombreProducto: 'Agua 600',
        Precio: 8,
        Seccion: 'bebidas',
        Cantidad: 34
    })
    db.collection('productos').doc().set({
        NombreProducto: 'Agua bonafon',
        Precio: 43,
        Seccion: 'bebidas',
        Cantidad: 123
    })
    db.collection('productos').doc().set({
        NombreProducto: 'SabGalletas gamesaritas',
        Precio: 13,
        Seccion: 'frituras',
        Cantidad: 23
    })
})