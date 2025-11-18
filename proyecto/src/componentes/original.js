import { db } from "../firebaseConfig.js";
import { collection, addDoc } from "firebase/firestore";

export default function mostrarOriginal() {
    const contenedor = document.getElementById("app");
    contenedor.innerHTML = "";

    // Objeto base vacío (lo vamos a llenar)
    let mascota = {
        tipo: "",
        imagen: "",
        nombre: "",
        descripcion: "",
        idApi: "",
        fechaGuardado: new Date().toISOString()
    };

    // Crear sección principal
    const form = document.createElement("div");
    const resultado = document.createElement("pre");
    resultado.textContent = JSON.stringify(mascota, null, 2);

    // --- BOTONES PARA OBTENER PERRO O GATO ---
    const btnDog = document.createElement("button");
    btnDog.textContent = "🐶 Obtener perro aleatorio";
    const btnCat = document.createElement("button");
    btnCat.textContent = "🐱 Obtener gato aleatorio";

    const img = document.createElement("img");
    img.style.width = "300px";
    img.style.marginTop = "20px";

    // FUNCIÓN PARA CARGAR PERRO
    btnDog.onclick = async () => {
        const data = await fetch("https://api.thedogapi.com/v1/images/search")
                        .then(r => r.json());

        mascota.tipo = "dog";
        mascota.imagen = data[0].url;
        mascota.idApi = data[0].id;

        img.src = mascota.imagen;
        actualizarJSON();
    };

    // FUNCIÓN PARA CARGAR GATO
    btnCat.onclick = async () => {
        const data = await fetch("https://api.thecatapi.com/v1/images/search")
                        .then(r => r.json());

        mascota.tipo = "cat";
        mascota.imagen = data[0].url;
        mascota.idApi = data[0].id;

        img.src = mascota.imagen;
        actualizarJSON();
    };

    form.appendChild(btnDog);
    form.appendChild(btnCat);
    form.appendChild(img);

    // CAMPOS PARA NOMBRE Y DESCRIPCIÓN
    const pNombre = document.createElement("p");
    pNombre.textContent = "Nombre que le quieres poner:";
    const inputNombre = document.createElement("input");

    const pDesc = document.createElement("p");
    pDesc.textContent = "Descripción:";
    const inputDesc = document.createElement("input");

    inputNombre.oninput = () => {
        mascota.nombre = inputNombre.value;
        actualizarJSON();
    };

    inputDesc.oninput = () => {
        mascota.descripcion = inputDesc.value;
        actualizarJSON();
    };

    form.appendChild(pNombre);
    form.appendChild(inputNombre);

    form.appendChild(pDesc);
    form.appendChild(inputDesc);

    // --- BOTÓN PARA GUARDAR ---
    const botonGuardar = document.createElement("button");
    botonGuardar.textContent = "Guardar en Firebase";

    botonGuardar.onclick = async () => {
        try {
            if (!mascota.tipo || !mascota.imagen) {
                alert("Primero debes obtener un perro o un gato.");
                return;
            }

            await addDoc(collection(db, "favoritos"), mascota);
            alert("🐾 Mascota guardada correctamente!");

        } catch (error) {
            console.error("Error:", error);
            alert("❌ Error al guardar en Firebase.");
        }
    };

    form.appendChild(botonGuardar);

    // Añadir todo al contenedor principal
    contenedor.appendChild(form);
    contenedor.appendChild(resultado);

    // Función para actualizar el JSON en pantalla
    function actualizarJSON() {
        resultado.textContent = JSON.stringify(mascota, null, 2);
    }
}
