import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig.js"; // Ajusta la ruta si cambia
import mostrarRegistro from "./registro.js"; // para volver al registro si quieres

export default function mostrarLogin() {
    const app = document.getElementById("app");

    app.innerHTML = `
        <h2>Iniciar Sesión</h2>
        <input type="email" id="correo" placeholder="Correo electrónico">
        <input type="password" id="contrasena" placeholder="Contraseña">
        <button id="btnLogin">Ingresar</button>
        <br><br>
        <button id="btnRegistro">Crear cuenta</button>
    `;

    document.getElementById("btnLogin").addEventListener("click", async () => {
        const correo = document.getElementById("correo").value;
        const contrasena = document.getElementById("contrasena").value;

        try {
            await signInWithEmailAndPassword(auth, correo, contrasena);
            window.location.reload();  // así lo pide la guía
        } catch (error) {
            alert("Error al iniciar sesión: " + error.message);
        }
    });

    // Botón para ir al registro (opcional pero útil)
    document.getElementById("btnRegistro").addEventListener("click", () => {
        mostrarRegistro();
    });
}
