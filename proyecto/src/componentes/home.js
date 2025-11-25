import activarLogout from "./logout.js";

export default function mostrarHome() {
    const app = document.getElementById("app");

    app.innerHTML = `
    <!-- Home Screen -->
    <div id="home-screen" class="main-container active">
      <div class="flex justify-between items-center mb-8">
        <h1 class="text-3xl font-bold text-primary">PawGalaxy</h1>
      </div>
      
      <div class="pet-card">
        <h2 class="text-2xl font-semibold mb-4">¡Bienvenido a PawGalaxy!</h2>
        <p class="text-textLight mb-6">Donde encontrarás tu compañero ideal para hacer tu vida más cálida y feliz.</p>
        <div class="flex justify-center">
          <img src="https://cdn.pixabay.com/photo/2018/05/26/18/06/dog-3431913_1280.jpg" alt="Mascota feliz" class="rounded-xl w-full h-48 object-cover">
        </div>
      </div>
      
      <div class="pet-card mt-6">
        <h3 class="text-xl font-semibold mb-3">¿Qué puedes hacer?</h3>
        <ul class="list-disc list-inside text-textLight">
          <li class="mb-2">Generar perfiles de mascotas</li>
          <li class="mb-2">Personalizar su información</li>
          <li class="mb-2">Guardar tus mascotas favoritas</li>
          <li class="mb-2">Descubrir nuevos amigos peludos</li>
        </ul>
      </div>
      
      <p class="text-center text-textLight mt-8">
        Dirígete al generador de mascotas para comenzar
      </p>
    </div>
    `;

    activarLogout();
}
