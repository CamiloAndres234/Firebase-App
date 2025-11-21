import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig.js";
import mostrarRegistro from "./registro.js";

export default function mostrarLogin() {
    const app = document.getElementById("app");

    app.innerHTML = `
    <div class="login-wrapper">

        <div class="login-card-big">

            <img 
                src="https://cdn-icons-png.flaticon.com/512/3199/3199867.png"
                class="login-big-logo"
            >

            <h2 class="login-title">¡Bienvenido de nuevo!</h2>
            <p class="login-subtitle">Conecta, descubre y guarda tus compañeros favoritos.</p>

            <div class="form-section">

                <label for="correo">Correo</label>
                <input type="email" id="correo" placeholder="Correo electrónico" class="warm-input">

                <label for="contrasena">Contraseña</label>
                <input type="password" id="contrasena" placeholder="Contraseña" class="warm-input">

                <button id="btnLogin" class="btn-warm">Ingresar</button>

                <p class="small-text center link-row">
                    ¿No tienes cuenta?
                    <button id="btnRegistro" class="btn-warm-link">Crear cuenta</button>
                </p>

            </div>

        </div>

    </div>
    `;

    document.getElementById("btnLogin").addEventListener("click", async () => {
        const correo = document.getElementById("correo").value;
        const contrasena = document.getElementById("contrasena").value;

        try {
            await signInWithEmailAndPassword(auth, correo, contrasena);
            window.location.reload();
        } catch (error) {
            alert("Error al iniciar sesión: " + error.message);
        }
    });

    document.getElementById("btnRegistro").addEventListener("click", () => {
        mostrarRegistro();
    });
}
