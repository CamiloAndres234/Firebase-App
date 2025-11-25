import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../firebaseConfig.js';
import mostrarLogin from './login.js';

export default function mostrarRegistro() {
    const app = document.getElementById("app");

    app.innerHTML = `
    <div class="app-container">

        <div class="register-container active">

            <div class="flex justify-center mb-8">
                <img 
                    src="https://cdn-icons-png.flaticon.com/512/8334/8334302.png"
                    alt="Registro"
                    class="w-32"
                >
            </div>

            <h2 class="text-3xl font-bold text-center text-primary mb-4">Crear cuenta</h2>
            <p class="text-center text-textLight mb-6">
                Únete a PawGalaxy y descubre compañeros increíbles.
            </p>

            <div class="mb-4">
                <label for="nombre" class="block text-textDark mb-2 font-medium">Nombre</label>
                <input type="text" id="nombre" class="input-field" placeholder="Tu nombre">
            </div>

            <div class="mb-4">
                <label for="correo" class="block text-textDark mb-2 font-medium">Correo electrónico</label>
                <input type="email" id="correo" class="input-field" placeholder="ejemplo@correo.com">
            </div>

            <div class="mb-4">
                <label for="contrasena" class="block text-textDark mb-2 font-medium">Contraseña</label>
                <input type="password" id="contrasena" class="input-field" placeholder="Contraseña segura">
            </div>

            <div class="mb-4">
                <label for="fecha" class="block text-textDark mb-2 font-medium">Fecha de nacimiento</label>
                <input type="date" id="fecha" class="input-field">
            </div>

            <div class="mb-6">
                <label for="telefono" class="block text-textDark mb-2 font-medium">Teléfono</label>
                <input type="tel" id="telefono" class="input-field" placeholder="+57 300 000 0000">
            </div>

            <button id="btnRegistro" class="btn-primary w-full mb-4">Registrarse</button>

            <p class="text-center text-textLight text-sm">
                ¿Ya tienes cuenta?
                <button id="btnLogin" class="underline text-primary">Iniciar sesión</button>
            </p>

        </div>

    </div>
    `;

    // --- REGISTRO ---
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

    // --- IR AL LOGIN ---
    document.getElementById("btnLogin").addEventListener("click", () => {
        mostrarLogin();
    });
}
