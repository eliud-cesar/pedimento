const db = firebase.firestore();
const onGetProducts = (callback) => db.collection('usuarios').onSnapshot(callback)

const tablaUsuarios = document.getElementById('tabla-usuarios-datos')

window.addEventListener('DOMContentLoaded', () => {
    onGetProducts((querySnapshot) => {
        tablaUsuarios.innerHTML = ''
        querySnapshot.forEach(doc => {
            tablaUsuarios.insertAdjacentHTML('beforeend', `
            <tr class="table-light">
                <th scope="row">${doc.data().NombreUsuario}</th>
                <td>${doc.data().Edad}</td>
                <td>${doc.data().Direccion}</td>
                <td>${doc.data().Telefono}</td>
            </tr>
            `)
        })
    })
})

const guardarUsuario = document.getElementById('formulario-enviar-usuario')
const mensajeError = document.getElementById('mensaje-advertencia')

guardarUsuario.addEventListener('submit', e => {
    e.preventDefault()
    let NombreUsuario = e.target.usuario.value
    let Edad = e.target.edad.value
    let Direccion = e.target.direccion.value
    let Telefono = e.target.telefono.value
    
    if(!NombreUsuario || !Edad || !Direccion || !Telefono) {
        mensajeError.classList.remove('desactive')
        mensajeError.classList.add('active')
    } else {
        db.collection('usuarios').doc().set({
            NombreUsuario,
            Edad,
            Direccion,
            Telefono
        })
        guardarUsuario.reset()
        e.target.usuario.focus()
        mensajeError.classList.add('desactive')
        mensajeError.classList.remove('active')
    }
})