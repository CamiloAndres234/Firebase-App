import { db } from "../firebaseConfig.js";
import { collection, getDocs } from "firebase/firestore";

export default async function mostrarHome() {
    const app = document.getElementById("app");
    app.innerHTML = "<h2>Cargando favoritos...</h2>";

    try {
        const querySnapshot = await getDocs(collection(db, "favoritos"));

        app.innerHTML = "<h2>Mascotas Guardadas 🐾</h2>";

        // Contenedor tipo grid
        const grid = document.createElement("div");
        grid.style.display = "grid";
        grid.style.gridTemplateColumns = "repeat(auto-fill, minmax(250px, 1fr))";
        grid.style.gap = "15px";
        grid.style.padding = "10px";

        querySnapshot.forEach((doc) => {
            const mascota = doc.data();

            const card = document.createElement("div");
            card.style.border = "1px solid #ccc";
            card.style.padding = "10px";
            card.style.borderRadius = "10px";
            card.style.background = "#fff";
            card.style.boxShadow = "0px 2px 6px rgba(0,0,0,0.1)";
            card.style.textAlign = "center";

            card.innerHTML = `
                <img src="${mascota.imagen}" style="width:100%; border-radius:10px;">
                <h3>${mascota.nombre || "Sin nombre"}</h3>
                <p><strong>Tipo:</strong> ${mascota.tipo}</p>
                <p><strong>Descripción:</strong> ${mascota.descripcion || "Sin descripción"}</p>
                <p><small><strong>ID API:</strong> ${mascota.idApi}</small></p>
                <p><small><strong>Guardado:</strong> ${new Date(mascota.fechaGuardado).toLocaleString()}</small></p>
            `;

            grid.appendChild(card);
        });

        app.appendChild(grid);

    } catch (error) {
        console.error("Error al cargar favoritos:", error);
        app.innerHTML = "<p>Error al cargar las mascotas 😢</p>";
    }
}
