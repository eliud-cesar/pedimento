const db = firebase.firestore();
const onGetProducts = (callback) => db.collection('productos').onSnapshot(callback)
let BaseDeDatos = []

window.addEventListener('DOMContentLoaded', async () => {
    onGetProducts((querySnapshot) => {
        querySnapshot.forEach(doc => {
            let datos = []
            datos = doc.data();
            datos.id = doc.id
            BaseDeDatos.push(datos)
        })
    })
})

const formVender = document.getElementById('vender')
const MensajeAdvertencia = document.getElementById('mensaje-advertencia')
const MensajeError = document.getElementById('mensaje-error')
const MensajeExito = document.getElementById('mensaje-exito')
const BtnLimpiar = document.getElementById('btn-limpiar')

formVender.addEventListener('submit', (e) => {
    e.preventDefault()
    
    let VCantidad = e.target.cantidad.value
    let VNombre = e.target.nombre.value

    MensajeAdvertencia.classList.remove('active')
    MensajeAdvertencia.classList.add('desactive')
    MensajeError.classList.remove('active')
    MensajeError.classList.add('desactive')
    MensajeExito.classList.remove('active')
    MensajeExito.classList.add('desactive')

    if(!VCantidad || !VNombre) {
        MensajeAdvertencia.classList.remove('desactive')
        MensajeAdvertencia.classList.add('active')
    } else {
        let res = BaseDeDatos.find(p => p.NombreProducto === VNombre)

        if(!res || res.Cantidad < VCantidad) {
            MensajeError.classList.remove('desactive')
            MensajeError.classList.add('active')
        } else {
            MensajeExito.innerHTML = `<strong>Has vendido exitosamente!</strong> ${VCantidad} ${VNombre} | Total precio: $ ${VCantidad * res.Precio} Pesos`
            MensajeExito.classList.remove('desactive')
            MensajeExito.classList.add('active')
            
            let Cantidad = res.Cantidad - VCantidad
            let NombreProducto = res.NombreProducto
            let Precio = res.Precio
            let Seccion = res.Seccion

            db.collection('productos').doc(res.id).update({
                Cantidad,
                NombreProducto,
                Precio,
                Seccion
            })
            
            formVender.reset()
            e.target.nombre.focus()
        }
    }
})
