const db = firebase.firestore();
const onGetProducts = (callback) => db.collection('productos').onSnapshot(callback)

const tablaBodega = document.getElementById('tabla-bodega-datos')

window.addEventListener('DOMContentLoaded', async () => {
    onGetProducts((querySnapshot) => {
        tablaBodega.innerHTML = ''
        querySnapshot.forEach(doc => {
            tablaBodega.insertAdjacentHTML('beforeend', `
            <tr class="table-light">
                <th scope="row">${doc.data().NombreProducto}</th>
                <td>$ ${doc.data().Precio}</td>
                <td>${doc.data().Cantidad}</td>
                <td>${doc.data().Seccion}</td>
            </tr>
            `)
        })
    })
})

const guardarProducto = document.getElementById('formulario-enviar-producto')
const mensajeError = document.getElementById('mensaje-advertencia')

guardarProducto.addEventListener('submit', e => {
    e.preventDefault()
    let NombreProducto = e.target.producto.value
    let Cantidad = e.target.cantidad.value
    let Precio = e.target.precio.value
    let Seccion = e.target.seccion.value
    
    if(!NombreProducto || !Cantidad || !Precio || !Seccion) {
        mensajeError.classList.remove('desactive')
        mensajeError.classList.add('active')
    } else {
        db.collection('productos').doc().set({
            NombreProducto,
            Cantidad,
            Precio,
            Seccion
        })
        guardarProducto.reset()
        e.target.producto.focus()
        mensajeError.classList.add('desactive')
        mensajeError.classList.remove('active')
    }
    
})