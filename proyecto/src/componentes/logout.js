import { signOut } from "firebase/auth";
import { auth } from "../firebaseConfig.js";
import mostrarLogin from "./login.js";

export default function activarLogout() {
    const btnLogout = document.getElementById("nav-logout");

    if (btnLogout) {
        btnLogout.addEventListener("click", async () => {
            try {
                await signOut(auth);
                mostrarLogin(); // vuelve al login SIN recargar toda la página
            } catch (error) {
                alert("Error al cerrar sesión: " + error.message);
            }
        });
    }
}
