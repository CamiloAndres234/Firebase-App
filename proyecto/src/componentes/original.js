import { db } from "../firebaseConfig.js";
import { collection, addDoc } from "firebase/firestore";

export default function mostrarOriginal() {
    const contenedor = document.getElementById("app");

    contenedor.innerHTML = `
        <div class="card fade-in p-6 max-w-xl mx-auto" id="originalCard">
            <h2 class="text-2xl font-bold text-center mb-6 text-[var(--accent-color)]">
                🐾 Generador de Mascotas
            </h2>

            <div class="flex justify-center gap-4 mb-4">
                <button id="btnDog" class="btn btn-outline">🐶 Obtener perro</button>
                <button id="btnCat" class="btn btn-outline">🐱 Obtener gato</button>
            </div>

            <div class="flex justify-center">
                <img id="petImg"
                     class="rounded-xl shadow-lg mx-auto hidden"
                     style="
                        max-width: 250px;
                        max-height: 250px;
                        width: auto;
                        height: auto;
                        object-fit: cover;
                        border-radius: 16px;
                     ">
            </div>

            <div class="mt-5">
                <label class="font-semibold">Nombre:</label>
                <input type="text" id="inputNombre"
                       class="w-full p-3 border-2 rounded-xl mt-1"
                       placeholder="Ej: Pelusa">
            </div>

            <div class="mt-4">
                <label class="font-semibold">Descripción:</label>
                <input type="text" id="inputDesc"
                       class="w-full p-3 border-2 rounded-xl mt-1"
                       placeholder="Ej: Muy tierno y juguetón">
            </div>

            <button id="btnGuardar" class="btn w-full mt-5">Guardar en Firebase</button>

            <h3 class="text-center mt-6 font-semibold">📦 Datos generados</h3>

            <div id="resultadoJSON"
                 class="p-4 bg-[var(--secondary-color)] rounded-xl text-sm mt-2 leading-relaxed">
            </div>
        </div>
    `;

    // ---- Referencias a elementos ----
    const btnDog = document.getElementById("btnDog");
    const btnCat = document.getElementById("btnCat");
    const img = document.getElementById("petImg");
    const inputNombre = document.getElementById("inputNombre");
    const inputDesc = document.getElementById("inputDesc");
    const btnGuardar = document.getElementById("btnGuardar");
    const resultado = document.getElementById("resultadoJSON");

    let mascota = {
        tipo: "",
        imagen: "",
        nombre: "",
        descripcion: "",
        idApi: "",
        fechaGuardado: new Date().toISOString()
    };

    function actualizarJSON() {
        const fecha = new Date(mascota.fechaGuardado).toLocaleDateString();

        resultado.innerHTML = `
            <p><strong>🐾 Tipo:</strong> ${mascota.tipo || "—"}</p>
            <p><strong>🆔 ID API:</strong> ${mascota.idApi || "—"}</p>
            <p><strong>📛 Nombre:</strong> ${mascota.nombre || "—"}</p>
            <p><strong>📝 Descripción:</strong> ${mascota.descripcion || "—"}</p>
            <p><strong>📷 Imagen:</strong> ${
                mascota.imagen
                    ? `<a href="${mascota.imagen}" target="_blank" class="text-blue-600 underline">Ver imagen</a>`
                    : "—"
            }</p>
            <p><strong>📅 Fecha:</strong> ${fecha}</p>
        `;
    }

    btnDog.onclick = async () => {
        const data = await fetch("https://api.thedogapi.com/v1/images/search").then(r => r.json());

        mascota.tipo = "dog";
        mascota.imagen = data[0].url;
        mascota.idApi = data[0].id;

        img.src = mascota.imagen;
        img.classList.remove("hidden");

        actualizarJSON();
    };

    btnCat.onclick = async () => {
        const data = await fetch("https://api.thecatapi.com/v1/images/search").then(r => r.json());

        mascota.tipo = "cat";
        mascota.imagen = data[0].url;
        mascota.idApi = data[0].id;

        img.src = mascota.imagen;
        img.classList.remove("hidden");

        actualizarJSON();
    };

    inputNombre.oninput = () => {
        mascota.nombre = inputNombre.value;
        actualizarJSON();
    };

    inputDesc.oninput = () => {
        mascota.descripcion = inputDesc.value;
        actualizarJSON();
    };

    btnGuardar.onclick = async () => {
        if (!mascota.tipo || !mascota.imagen) {
            alert("Primero debes obtener un perro o un gato.");
            return;
        }

        try {
            await addDoc(collection(db, "favoritos"), mascota);
            alert("🐾 Mascota guardada correctamente!");
        } catch (error) {
            console.error(error);
            alert("❌ Error al guardar.");
        }
    };

    actualizarJSON();
}
