// IMPORTACIONES
import mostrarRegistro from './componentes/registro.js';
import mostrarLogin from './componentes/login.js';
import mostrarOriginal from './componentes/original.js';
import mostrarHome from './componentes/home.js';
import mostrarFavoritos from './componentes/favoritos.js';
import mostrarLogout from './componentes/logout.js';

// FIREBASE
import { auth } from './firebaseConfig.js';
import { onAuthStateChanged } from 'firebase/auth';

// =====================================================
//  OBSERVADOR DE SESIÓN
// =====================================================
onAuthStateChanged(auth, (user) => {
    if (user) {
        document.getElementById("bottom-nav").classList.remove("hidden"); // Mostrar navbar

        mostrarHome();          // Cargar Home por defecto
        activarNavegacion();    // Activar navegación solo 1 vez
    } else {
        document.getElementById("bottom-nav").classList.add("hidden"); // Ocultar navbar

        mostrarLogin(); // Ir al Login
    }
});

// =====================================================
//  ACTIVAR NAVBAR + EFECTO NARANJA DINÁMICO
// =====================================================
function activarNavegacion() {
    const btnHome = document.getElementById("nav-home");
    const btnGenerator = document.getElementById("nav-generator");
    const btnFavoritos = document.getElementById("nav-favoritos");
    const btnLogout = document.getElementById("nav-logout");

    const botones = [btnHome, btnGenerator, btnFavoritos, btnLogout];

    // Cambiar color naranja dinámico
    function activarBoton(botonActivo) {
        botones.forEach(btn => {
            const icono = btn.querySelector("i");
            const texto = btn.querySelector("span");

            if (btn === botonActivo) {
                icono.classList.remove("text-textLight");
                texto.classList.remove("text-textLight");

                icono.classList.add("text-primary");
                texto.classList.add("text-primary");
            } else {
                icono.classList.add("text-textLight");
                texto.classList.add("text-textLight");

                icono.classList.remove("text-primary");
                texto.classList.remove("text-primary");
            }
        });
    }

    // Eventos de navegación
    btnHome.addEventListener("click", () => {
        activarBoton(btnHome);
        mostrarHome();
    });

    btnGenerator.addEventListener("click", () => {
        activarBoton(btnGenerator);
        mostrarOriginal();
    });

    btnFavoritos.addEventListener("click", () => {
        activarBoton(btnFavoritos);
        mostrarFavoritos();
    });

    btnLogout.addEventListener("click", () => {
        activarBoton(btnLogout);
        mostrarLogout();
    });

    // Botón por defecto
    activarBoton(btnHome);
}
