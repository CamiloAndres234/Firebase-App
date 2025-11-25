import { db } from "../firebaseConfig.js";
import { collection, getDocs } from "firebase/firestore";

//Esta función se ejecuta cuando el usuario toca el botón "Favoritos"
export default async function mostrarFavoritos(){
    const app = document.getElementById("app");

    //Mensaje de carga mientras descarga Firestore
    app.innerHTML = `
        <div class="main-container active">
            <h2 class="text-2xl font-bold text-center text-primary mb-6">
                Cargando favoritos...
            </h2>
        </div>
    `;
    try{
        //Obtenemos todos los documentos de la colección "favoritos"
        const querySnapshot = await getDocs(collection(db,"favoritos"));

        //Estructura principal de la página
        app.innerHTML=`
            <div class="main-container active">
                <h2 class="text-3xl font-bold text-primary text-center mb-4">
                    Mascotas Guardadas
                </h2>
                <p class="text-center text-textDark mb-4">
                    Estas son las mascotas que marcaste como favoritas <3
                </p>
                <div id="gridFavoritos" 
                     class="grid gap-6"
                     style="grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));">
                </div>
            </div>
        `;
        const grid = document.getElementById("gridFavoritos");

        //Si no hay favoritos
        if (querySnapshot.empty){
            grid.innerHTML =`
                <p class="text-center text-textLight text-lg opacity-80">
                    No has guardado ninguna mascota aún.
                </p>
            `;
            return;
        }

        //Recorremos cada mascota guardada
        querySnapshot.forEach((docSnap) =>{
            const mascota = docSnap.data();
            const card = document.createElement("div");
            card.className = "pet-card";

            //Tarjeta bonita
            card.innerHTML=`
                <img 
                    src="${mascota.imagen}" 
                    alt="${mascota.nombre}" 
                    class="w-full h-48 object-cover rounded-xl mb-3"
                >
                <h3 class="text-xl font-bold text-primary mb-2">
                    ${mascota.nombre||"Sin nombre"}
                </h3>
                <p class="text-textDark text-sm mb-1">
                    <strong class="text-primary">Tipo:</strong> ${mascota.tipo}
                </p>
                <p class="text-textDark text-sm mb-1">
                    <strong class="text-primary">Descripción:</strong> 
                    ${mascota.descripcion||"Sin descripción"}
                </p>
                <!--Info secundaria (ID API y fecha)-->
                <div class="mt-3 p-2 rounded-lg bg-[#FFF1E6]">
                    <p class="text-sm text-[#4A3D35] font-medium">
                        <strong class="text-primary">ID API:</strong> ${mascota.idApi}
                    </p>
                    <p class="text-sm text-[#4A3D35] font-medium">
                        <strong class="text-primary">Guardado:</strong> 
                        ${new Date(mascota.fechaGuardado).toLocaleString()}
                    </p>
                </div>
            `;
            grid.appendChild(card);
        });
    } catch(error){
        console.error("Error al cargar favoritos:",error);
        app.innerHTML =`
            <div class="main-container active">
                <p class="text-center text-red-500 text-lg font-semibold">
                    Error al cargar las mascotas :/
                </p>
            </div>
        `;
    }
}
