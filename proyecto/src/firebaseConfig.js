// Importar Firebase Core
import { initializeApp } from "firebase/app";

// Servicios que sí necesitas
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// (Opcional) Analytics solo funciona si estás en web con HTTPS
import { getAnalytics } from "firebase/analytics";

// Configuración de tu proyecto Firebase
const firebaseConfig = {
  apiKey: "AIzaSyD50BGARvIZ3RRvHnrsj7UAZyhxmODJCkE",
  authDomain: "pawgalaxy-a227a.firebaseapp.com",
  projectId: "pawgalaxy-a227a",
  storageBucket: "pawgalaxy-a227a.firebasestorage.app",
  messagingSenderId: "84621444134",
  appId: "1:84621444134:web:50680e908af4a78830d2e7",
  measurementId: "G-6LGJ976P90"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Inicializar servicios principales
const auth = getAuth(app);
const db = getFirestore(app);

// (Opcional) Analytics — no funciona en Android APK
let analytics = null;
try {
  analytics = getAnalytics(app);
} catch (e) {
  console.warn("Analytics no disponible en este entorno.");
}

export { auth, db, analytics };
