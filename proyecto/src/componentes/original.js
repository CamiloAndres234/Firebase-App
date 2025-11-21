import { db } from "../firebaseConfig.js";
import { collection, addDoc } from "firebase/firestore";

export default function mostrarOriginal() {
    const contenedor = document.getElementById("app");

    contenedor.innerHTML = `
        <div class="card fade-in max-w-2xl mx-auto p-8 rounded-2xl shadow-lg bg-white">

            <h2 class="text-3xl font-bold text-center mb-6 text-orange-500 flex items-center justify-center gap-2">
                Generador de Mascotas
            </h2>

            <!-- SECCIÓN 1: Botones -->
            <div class="flex flex-wrap justify-center gap-4 mb-6">
                <button id="btnDog" class="px-6 py-3 border-2 border-orange-400 rounded-xl text-orange-600 font-semibold hover:bg-orange-100 transition">
                    🐶 Obtener perro
                </button>

                <button id="btnCat" class="px-6 py-3 border-2 border-orange-400 rounded-xl text-orange-600 font-semibold hover:bg-orange-100 transition">
                    🐱 Obtener gato
                </button>
            </div>

            <!-- SECCIÓN 2: Imagen -->
            <div class="flex justify-center mb-6">
                <img id="petImg"
                     class="rounded-2xl shadow-xl mx-auto hidden"
                     style="
                        max-width: 300px;
                        max-height: 300px;
                        object-fit: cover;
                     ">
            </div>

            <!-- SECCIÓN 3: Inputs -->
            <div class="bg-gray-50 p-5 rounded-2xl shadow-inner mb-6">
                <h3 class="font-bold text-lg mb-3 text-orange-500">Información de la Mascota</h3>

                <label class="font-semibold">Nombre:</label>
                <input type="text" id="inputNombre"
                    class="w-full p-3 border-2 rounded-xl mt-1 mb-4"
                    placeholder="Ej: Pelusa">

                <label class="font-semibold">Descripción:</label>
                <input type="text" id="inputDesc"
                    class="w-full p-3 border-2 rounded-xl mt-1"
                    placeholder="Ej: Muy tierno y juguetón">
            </div>

            <button id="btnGuardar" class="bg-orange-500 w-full py-3 rounded-xl text-white font-semibold hover:bg-orange-600 transition">
                Guardar en Firebase
            </button>

            <!-- SECCIÓN 4: Datos JSON -->
            <h3 class="text-center mt-8 font-bold text-lg text-orange-500">Datos generados</h3>

            <div id="resultadoJSON"
                 class="p-4 bg-gray-100 rounded-xl text-sm mt-3 leading-relaxed shadow-inner">
            </div>
        </div>
    `;

    // ---- Referencias ----
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
            <p><strong>Tipo:</strong> ${mascota.tipo || "—"}</p>
            <p><strong>ID API:</strong> ${mascota.idApi || "—"}</p>
            <p><strong>Nombre:</strong> ${mascota.nombre || "—"}</p>
            <p><strong>Descripción:</strong> ${mascota.descripcion || "—"}</p>
            <p><strong>Imagen:</strong> ${
                mascota.imagen
                    ? `<a href="${mascota.imagen}" target="_blank" class="text-blue-600 underline">Ver imagen</a>`
                    : "—"
            }</p>
            <p><strong>Fecha:</strong> ${fecha}</p>
        `;
    }

    btnDog.onclick = async () => {
        const data = await fetch("https://api.thedogapi.com/v1/images/search")
            .then(r => r.json());

        mascota.tipo = "dog";
        mascota.imagen = data[0].url;
        mascota.idApi = data[0].id;

        img.src = mascota.imagen;
        img.classList.remove("hidden");

        actualizarJSON();
    };

    btnCat.onclick = async () => {
        const data = await fetch("https://api.thecatapi.com/v1/images/search")
            .then(r => r.json());

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
