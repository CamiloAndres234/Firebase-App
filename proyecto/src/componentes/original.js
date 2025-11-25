//-- Aprtado de Gennerador
import { db } from "../firebaseConfig.js";
import { collection, addDoc } from "firebase/firestore";

export default function mostrarOriginal() {
    const contenedor = document.getElementById("app");

    contenedor.innerHTML = `
    <div class="generator-container active">

        <h2 class="text-3xl font-bold text-center mb-6" style="color:#FF7B54;">
            Generador de Mascotas
        </h2>

        <!-- BOTONES DE MASCOTA -->
        <div class="flex justify-between gap-3">
            <div id="btnDog" class="btn-pet cursor-pointer">
                <i>🐶</i>
                <span>Perro</span>
            </div>

            <div id="btnCat" class="btn-pet cursor-pointer">
                <i>🐱</i>
                <span>Gato</span>
            </div>
        </div>

        <!-- Imagen -->
        <div class="pet-data mt-6 text-center">
            <img id="petImg" class="hidden" />
        </div>

        <!-- Inputs -->
        <div class="pet-card mt-4">
            <h3 class="font-bold mb-3" style="color:#FF7B54;">Información</h3>

            <input id="inputNombre" class="input-field" placeholder="Nombre de la mascota">

            <input id="inputDesc" class="input-field" placeholder="Descripción">
        </div>

        <!-- Guardar -->
        <button id="btnGuardar" class="btn-primary w-full mt-4">
            Guardar en Firebase
        </button>

        <!-- JSON -->
        <div class="pet-card mt-6">
            <h3 class="font-bold mb-2" style="color:#FF7B54;">Datos generados</h3>
            <div id="resultadoJSON" class="text-sm leading-relaxed"></div>
        </div>

    </div>
    `;

    // ----- REFERENCIAS -----
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
        const fecha = new Date(mascota.fechaGuardado).toLocaleDateString("es-CO");

        resultado.innerHTML = `
            <p><strong style="color:#FF7B54;">Tipo:</strong> ${mascota.tipo || "—"}</p>
            <p><strong style="color:#FF7B54;">ID API:</strong> ${mascota.idApi || "—"}</p>
            <p><strong style="color:#FF7B54;">Nombre:</strong> ${mascota.nombre || "—"}</p>
            <p><strong style="color:#FF7B54;">Descripción:</strong> ${mascota.descripcion || "—"}</p>
            <p><strong style="color:#FF7B54;">Imagen:</strong> ${
                mascota.imagen
                    ? `<a href="${mascota.imagen}" target="_blank" style="color:#FF7B54;text-decoration:underline">Ver</a>`
                    : "—"
            }</p>
            <p><strong style="color:#FF7B54;">Fecha:</strong> ${fecha}</p>
        `;
    }

    // PERRO
    btnDog.onclick = async () => {
        const data = await fetch("https://api.thedogapi.com/v1/images/search").then(r => r.json());

        mascota.tipo = "Perro";
        mascota.imagen = data[0].url;
        mascota.idApi = data[0].id;

        img.src = mascota.imagen;
        img.classList.remove("hidden");

        actualizarJSON();
    };

    // GATO
    btnCat.onclick = async () => {
        const data = await fetch("https://api.thecatapi.com/v1/images/search").then(r => r.json());

        mascota.tipo = "Gato";
        mascota.imagen = data[0].url;
        mascota.idApi = data[0].id;

        img.src = mascota.imagen;
        img.classList.remove("hidden");

        actualizarJSON();
    };

    // Inputs
    inputNombre.oninput = () => {
        mascota.nombre = inputNombre.value;
        actualizarJSON();
    };

    inputDesc.oninput = () => {
        mascota.descripcion = inputDesc.value;
        actualizarJSON();
    };

    // Guardar
    btnGuardar.onclick = async () => {
        if (!mascota.tipo || !mascota.imagen) {
            alert("Primero genera una mascota ");
            return;
        }

        try {
            await addDoc(collection(db, "favoritos"), mascota);
            alert("🐾 Mascota guardada correctamente");
        } catch (e) {
            console.error(e);
            alert("❌ Error al guardar");
        }
    };

    actualizarJSON();
}
