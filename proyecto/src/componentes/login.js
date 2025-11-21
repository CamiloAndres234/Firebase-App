import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig.js";
import mostrarRegistro from "./registro.js";

export default function mostrarLogin() {
    const app = document.getElementById("app");

    app.innerHTML = `
    <div class="card login-card">
        <h2 class="title">🐾 Iniciar Sesión</h2>

        <div class="form-group">
            <input type="email" id="correo" placeholder="Correo electrónico" class="input">
        </div>

        <div class="form-group">
            <input type="password" id="contrasena" placeholder="Contraseña" class="input">
        </div>

        <button id="btnLogin" class="btn-primary">Ingresar</button>

        <p class="small-text">
            ¿No tienes una cuenta?
            <button id="btnRegistro" class="btn-link">Crear cuenta</button>
        </p>
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
