import { signOut } from "firebase/auth";
import { auth } from "../firebaseConfig.js";
import mostrarLogin from "./login.js";

export default function mostrarLogout() {
    const app = document.getElementById("app");

    app.innerHTML = `
        <div style="
            display: flex;
            justify-content: center;
            align-items: center;
            height: 70vh;
            font-size: 20px;
        ">
            <p>Cerrando sesión...</p>
        </div>
    `;

    // Cerrar sesión
    signOut(auth)
        .then(() => {
            mostrarLogin(); // Redirigir a login después de cerrar sesión
        })
        .catch((error) => {
            alert("Error al cerrar sesión: " + error.message);
            mostrarLogin();
        });
}
