import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../firebaseConfig.js';
import mostrarLogin from './login.js';

export default function mostrarRegistro() {
    const app = document.getElementById("app");

    app.innerHTML = `
    <div class="login-wrapper">

        <div class="login-card-big">

            <img 
                src="https://cdn-icons-png.flaticon.com/512/8334/8334302.png"
                class="login-big-logo"
            >

            <h2 class="login-title">Crea tu cuenta</h2>
            <p class="login-subtitle">Únete a PawGalaxy y empieza a descubrir compañeros increíbles.</p>

            <div class="form-section">

                <label for="nombre">Nombre</label>
                <input type="text" id="nombre" class="warm-input" placeholder="Tu nombre">

                <label for="correo">Correo electrónico</label>
                <input type="email" id="correo" class="warm-input" placeholder="ejemplo@correo.com">

                <label for="contrasena">Contraseña</label>
                <input type="password" id="contrasena" class="warm-input" placeholder="Contraseña segura">

                <label for="fecha">Fecha de nacimiento</label>
                <input type="date" id="fecha" class="warm-input">

                <label for="telefono">Teléfono</label>
                <input type="tel" id="telefono" class="warm-input" placeholder="+57 300 000 0000">

                <button id="btnRegistro" class="btn-warm">Registrarse</button>

                <p class="small-text center link-row">
                    ¿Ya tienes cuenta?
                    <button id="btnLogin" class="btn-warm-link">Iniciar sesión</button>
                </p>

            </div>

        </div>

    </div>
    `;

    // Función de registro
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

    // Regresar al login
    document.getElementById("btnLogin").addEventListener("click", () => {
        mostrarLogin();
    });
}
