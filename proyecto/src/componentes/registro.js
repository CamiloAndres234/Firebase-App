import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../firebaseConfig.js';
import mostrarLogin from './login.js';

export default function mostrarRegistro() {
    const app = document.getElementById("app");

    app.innerHTML = `
        <div class="login-card">
            <h2 class="title">🐾 Registro</h2>

            <div class="form-group">
                <input type="text" id="nombre" class="input" placeholder="Nombre">
            </div>

            <div class="form-group">
                <input type="email" id="correo" class="input" placeholder="Correo electrónico">
            </div>

            <div class="form-group">
                <input type="password" id="contrasena" class="input" placeholder="Contraseña">
            </div>

            <div class="form-group">
                <input type="text" id="fecha" class="input" placeholder="Fecha de nacimiento">
            </div>

            <div class="form-group">
                <input type="tel" id="telefono" class="input" placeholder="Teléfono">
            </div>

            <button id="btnRegistro" class="btn-primary">Registrarse</button>

            <p class="small-text">
                ¿Ya tienes una cuenta?
                <button id="btnLogin" class="btn-link">Iniciar sesión</button>
            </p>
        </div>
    `;

    document.getElementById("btnRegistro").addEventListener("click", async () => {
        const nombre = document.getElementById("nombre").value;
        const correo = document.getElementById("correo").value;
        const contrasena = document.getElementById("contrasena").value;
        const fecha = document.getElementById("fecha").value;
        const telefono = document.getElementById("telefono").value;

        let ganados = 0;
        let perdidos = 0;

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, correo, contrasena);
            const user = userCredential.user;

            await setDoc(doc(db, 'usuarios', user.uid), {
                uid: user.uid,
                nombre,
                correo,
                fecha,
                telefono,
                ganados,
                perdidos
            });

            alert('Usuario registrado correctamente');
            mostrarLogin();

        } catch (error) {
            alert('Error al registrarse: ' + error.message);
        }
    });

    document.getElementById("btnLogin").addEventListener("click", () => {
        mostrarLogin();
    });
}
