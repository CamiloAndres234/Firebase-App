import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig.js";
import mostrarRegistro from "./registro.js";
import mostrarHome from "./home.js";

export default function mostrarLogin() {
    const app = document.getElementById("app");

    app.innerHTML = `
    <div class="login-container active">
        <div class="flex justify-center mb-10">
            <img 
                src="https://mascotas-felices.netlify.app/images/header/pets.png" 
                alt="PawGalaxy Logo" 
                class="w-56"
            >
        </div>
        <h1 class="text-3xl font-bold text-center text-primary mb-6">PawGalaxy</h1>
        <p class="text-center text-textLight mb-8">¡Encuentra a tu compañero ideal!</p>

        <form id="login-form">
            <div class="mb-4">
                <label for="correo" class="block text-textDark mb-2 font-medium">Correo electrónico</label>
                <input type="email" id="correo" placeholder="ejemplo@correo.com" class="input-field">
            </div>
            <div class="mb-4">
                <label for="contrasena" class="block text-textDark mb-2 font-medium">Contraseña</label>
                <div class="password-field">
                    <input type="password" id="contrasena" placeholder="Contraseña segura" class="input-field">
                    <span class="password-toggle" id="password-toggle">
                        <i class="fa-solid fa-eye"></i>
                    </span>
                </div>
            </div>
            <button type="button" id="btnLogin" class="btn-primary w-full mb-4">Iniciar sesión</button>
        </form>
        <div class="relative text-center mt-4">
            <span class="text-textLight text-sm">
                ¿Sin cuenta?
                <button id="btnRegistro" class="text-primary font-semibold underline ml-1">
                    ¡Crea una!
                </button>
            </span>
        </div>
    </div>
    `;
    // EVENTO LOGIN
    document.getElementById("btnLogin").addEventListener("click", async () => {
        const correo = document.getElementById("correo").value;
        const contrasena = document.getElementById("contrasena").value;
        try {
            await signInWithEmailAndPassword(auth, correo, contrasena);
            //Ir al home de inicio d epa pagna
            mostrarHome();
        } catch (error) {
            alert("Error al iniciar sesión: " + error.message);
        }
    });

    //Ir a regstro
    document.getElementById("btnRegistro").addEventListener("click", () => {
        mostrarRegistro();
    });
    // Mostrar/ocultar contraseña
    document.getElementById("password-toggle").addEventListener("click", () => {
        const input = document.getElementById("contrasena");
        input.type = input.type === "password" ? "text" : "password";
    });
}
