// ==========================================
// 0. CONFIGURACIÓN DE TUS 10 RECUERDOS (ACTUALIZADO)
// ==========================================
const recuerdos = [
    { foto: 'fotos/foto.jpg',  mensaje: '¡Gracias por ser el mejor hermano sin duda, te amo bro !' },
    { foto: 'fotos/foto1.png',  mensaje: 'Gracias por estar siempre en las buenas y malas. 🤜🤛' },
    { foto: 'fotos/foto14.JPG', mensaje: '¡Por siempre hacer nuestras salidas divertidas!' },
    { foto: 'fotos/foto3.jpg',  mensaje: '¡El mejor padre ❤️!' },
    { foto: 'fotos/foto4.jpeg', mensaje: ' Siempre apoyándonos en cada meta.' },
    { foto: 'fotos/foto5.jpg',  mensaje: ' ¡Por todas las risas y anécdotas!' },
    { foto: 'fotos/foto11.jpg', mensaje: ' Las mejores experiencias compartidas.' },
    { foto: 'fotos/foto7.jpg',  mensaje: ' Las mejores experiencias compartidas.' },
    { foto: 'fotos/foto8.jpg',  mensaje: '¡Brindemos por un año más de vida y éxitos, con tu familia que te ama!' },
    { foto: 'fotos/foto16.jpg', mensaje: 'El mejor hermano del mundo, disfruta tu cumpleaños' }
];

// --- 1. CONFIGURACIÓN INICIAL DE LA ESCENA ---
const canvas = document.getElementById('canvas-3d');
const escena = new THREE.Scene();
escena.fog = new THREE.FogExp2(0x1a0c2e, 0.02); // Niebla morada festiva

const camara = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
camara.position.set(0, 9, 15);

const renderizador = new THREE.WebGLRenderer({ canvas: canvas, antialias: true });
renderizador.setSize(window.innerWidth, window.innerHeight);
renderizador.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderizador.shadowMap.enabled = true;

const controles = new THREE.OrbitControls(camara, renderizador.domElement);
controles.enableDamping = true;
controles.minDistance = 6;
controles.maxDistance = 22;
controles.maxPolarAngle = Math.PI / 2 - 0.05;

// --- 2. ILUMINACIÓN AMBIENTAL Y DE COLORES ---
const luzAmbiente = new THREE.AmbientLight(0x5533aa, 0.8); // Luz base morada de fiesta
escena.add(luzAmbiente);

// Luz cálida principal de la vela
const luzVela = new THREE.PointLight(0xffaa44, 3, 35);
luzVela.position.set(0, 2.5, -2);
luzVela.castShadow = true;
luzVela.shadow.mapSize.width = 1024;
luzVela.shadow.mapSize.height = 1024;
escena.add(luzVela);

// Luz Neon Azul (Izquierda)
const luzNeonAzul = new THREE.PointLight(0x00f5ff, 1.5, 15);
luzNeonAzul.position.set(-6, 3, 0);
escena.add(luzNeonAzul);

// Luz Neon Rosa (Derecha)
const luzNeonRosa = new THREE.PointLight(0xff007f, 1.5, 15);
luzNeonRosa.position.set(6, 3, 0);
escena.add(luzNeonRosa);

// --- 3. CREACIÓN DE OBJETOS ---

// MESA DE MADERA CLARA (Refleja espectacularmente los neones)
const mesa = new THREE.Mesh(
    new THREE.BoxGeometry(15, 0.6, 9),
    new THREE.MeshStandardMaterial({ color: 0x8e5431, roughness: 0.3, metalness: 0.1 })
);
mesa.position.y = 0;
mesa.receiveShadow = true;
escena.add(mesa);

// PASTEL DE CUMPLE (Movido ligeramente a la izquierda para balancear con el adorno)
const grupoPastel = new THREE.Group();
grupoPastel.position.set(-2.5, 0.3, -1.5);

const plato = new THREE.Mesh(
    new THREE.CylinderGeometry(1.6, 1.7, 0.1, 32),
    new THREE.MeshStandardMaterial({ color: 0x00f5ff, roughness: 0.2, emissive: 0x00a8ff, emissiveIntensity: 0.2 })
);
plato.position.y = 0.05;
plato.receiveShadow = true;
grupoPastel.add(plato);

const cuerpoPastel = new THREE.Mesh(
    new THREE.CylinderGeometry(1.3, 1.3, 1.1, 32),
    new THREE.MeshStandardMaterial({ color: 0xff69b4, roughness: 0.5 }) // Tono rosa alegre
);
cuerpoPastel.position.y = 0.6;
cuerpoPastel.castShadow = true;
grupoPastel.add(cuerpoPastel);

const cobertura = new THREE.Mesh(
    new THREE.CylinderGeometry(1.32, 1.32, 0.3, 32),
    new THREE.MeshStandardMaterial({ color: 0x4a2c11, roughness: 0.3 })
);
cobertura.position.y = 1.05;
grupoPastel.add(cobertura);

// CHISPAS DE COLORES EN EL PASTEL
for (let i = 0; i < 40; i++) {
    const coloresChispas = [0xff0000, 0x00ff00, 0x00f5ff, 0xffcc00, 0xff00ff];
    const chispa = new THREE.Mesh(
        new THREE.CylinderGeometry(0.015, 0.015, 0.08),
        new THREE.MeshBasicMaterial({ color: coloresChispas[Math.floor(Math.random() * coloresChispas.length)] })
    );
    let angulo = Math.random() * Math.PI * 2;
    let radio = Math.random() * 1.1;
    chispa.position.set(Math.cos(angulo) * radio, 1.21, Math.sin(angulo) * radio);
    chispa.rotation.set(Math.random(), Math.random(), Math.random());
    grupoPastel.add(chispa);
}

// VELA ENCENDIDA (Emisión de luz realzada)
const grupoVela = new THREE.Group();
grupoVela.position.set(0, 1.35, 0);

const vela = new THREE.Mesh(
    new THREE.CylinderGeometry(0.06, 0.06, 0.5, 16),
    new THREE.MeshStandardMaterial({ color: 0xffff00 })
);
vela.castShadow = true;
grupoVela.add(vela);

const mechaEncendida = new THREE.Mesh(
    new THREE.CylinderGeometry(0.02, 0.02, 0.12, 16),
    new THREE.MeshStandardMaterial({ color: 0xffaa44, emissive: 0xffaa44, emissiveIntensity: 8 })
);
mechaEncendida.position.y = 0.32;
grupoVela.add(mechaEncendida);
grupoPastel.add(grupoVela);
escena.add(grupoPastel);

// CAJA DE REGALO LLAMATIVA (Azul eléctrico con lazo dorado - Movido a la derecha)
const grupoRegalo = new THREE.Group();
grupoRegalo.position.set(2.5, 1, 1.5);

const cuerpoCaja = new THREE.Mesh(
    new THREE.BoxGeometry(2, 2, 2),
    new THREE.MeshStandardMaterial({ color: 0x0055ff, roughness: 0.2, metalness: 0.3 })
);
cuerpoCaja.castShadow = true;
grupoRegalo.add(cuerpoCaja);

const tapaCaja = new THREE.Mesh(
    new THREE.BoxGeometry(2.15, 0.4, 2.15),
    new THREE.MeshStandardMaterial({ color: 0x0077ff, roughness: 0.2, metalness: 0.3 })
);
tapaCaja.position.y = 1.1;
tapaCaja.castShadow = true;
grupoRegalo.add(tapaCaja);

const liston = new THREE.Mesh(
    new THREE.BoxGeometry(2.18, 2.02, 0.2),
    new THREE.MeshStandardMaterial({ color: 0xffcc00, roughness: 0.3, metalness: 0.5 })
);
grupoRegalo.add(liston);
escena.add(grupoRegalo);

// --- NUEVO: ADORNO DEL NÚMERO 35 DE NEÓN ---
const canvasTexto = document.createElement('canvas');
const ctx = canvasTexto.getContext('2d');
canvasTexto.width = 512;
canvasTexto.height = 512;

ctx.clearRect(0, 0, 512, 512);
ctx.font = 'bold 280px Arial';
ctx.textAlign = 'center';
ctx.textBaseline = 'middle';
ctx.fillStyle = '#ffffff';
ctx.shadowColor = '#ffcc00';
ctx.shadowBlur = 30;
ctx.strokeStyle = '#ffaa00';
ctx.lineWidth = 15;
ctx.strokeText('35', 256, 256);
ctx.fillText('35', 256, 256);

const texturaTexto = new THREE.CanvasTexture(canvasTexto);
const geoAdorno = new THREE.PlaneGeometry(2.5, 2.5);
const matAdorno = new THREE.MeshStandardMaterial({
    map: texturaTexto,
    transparent: true,
    side: THREE.DoubleSide,
    roughness: 0.1,
    metalness: 0.1,
    emissive: 0xffaa00,
    emissiveIntensity: 0.5
});

const adorno35 = new THREE.Mesh(geoAdorno, matAdorno);
adorno35.position.set(0, 1.5, -1.5); // Justo en el eje central superior de la mesa
escena.add(adorno35);

// SISTEMA DE CONFETI EN MOVIMIENTO
const grupoConfeti = new THREE.Group();
const cantidadConfeti = 150;
const confetis = [];

for (let i = 0; i < cantidadConfeti; i++) {
    const geoConfeti = new THREE.PlaneGeometry(0.15, 0.15);
    const coloresConfeti = [0xff0055, 0x00ff66, 0x00f5ff, 0xffcc00, 0xff00ff, 0xffffff];
    const matConfeti = new THREE.MeshBasicMaterial({
        color: coloresConfeti[Math.floor(Math.random() * coloresConfeti.length)],
        side: THREE.DoubleSide
    });
    const meshConfeti = new THREE.Mesh(geoConfeti, matConfeti);
    
    meshConfeti.position.set(
        (Math.random() - 0.5) * 18,
        Math.random() * 8 + 1,
        (Math.random() - 0.5) * 12
    );
    
    meshConfeti.rotation.set(Math.random() * 5, Math.random() * 5, Math.random() * 5);
    
    confetis.push({
        mesh: meshConfeti,
        velY: Math.random() * 0.02 + 0.01,
        rotX: Math.random() * 0.02,
        rotY: Math.random() * 0.02
    });
    grupoConfeti.add(meshConfeti);
}
escena.add(grupoConfeti);

// CARTAS POLAROID BLANCAS BRILLANTES
const grupoCartas = new THREE.Group();
grupoCartas.visible = false;
escena.add(grupoCartas);

const loader = new THREE.TextureLoader();
const geoMarcoBlanco = new THREE.BoxGeometry(1.8, 0.04, 2.4);
const geoFotoPlana = new THREE.PlaneGeometry(1.56, 1.56);

recuerdos.forEach((recuerdo, index) => {
    const grupoCartaIndividual = new THREE.Group();
    
    let posX = (index % 5 - 2) * 2.5; 
    let posZ = index < 5 ? 0.6 : 3.2; 
    
    grupoCartaIndividual.position.set(posX, 0.33, posZ);
    grupoCartaIndividual.rotation.y = (Math.random() - 0.5) * 0.15;
    
    const matMarco = new THREE.MeshStandardMaterial({ 
        color: 0xffffff, 
        roughness: 0.3 
    });
    const marcoBlanco = new THREE.Mesh(geoMarcoBlanco, matMarco);
    marcoBlanco.receiveShadow = true;
    marcoBlanco.castShadow = true;
    grupoCartaIndividual.add(marcoBlanco);

    const matFoto = new THREE.MeshBasicMaterial({ 
        map: loader.load(recuerdo.foto),
        side: THREE.DoubleSide
    });
    const fotoMesh = new THREE.Mesh(geoFotoPlana, matFoto);
    fotoMesh.rotation.x = -Math.PI / 2;
    fotoMesh.position.set(0, 0.021, -0.22); 
    grupoCartaIndividual.add(fotoMesh);

    grupoCartaIndividual.userData = { tipo: 'carta', index: index, originalY: 0.33 };
    grupoCartas.add(grupoCartaIndividual);
});

// --- 4. INTERACCIONES (RAYCASTER OPTIMIZADO PC / MÓVIL) ---
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
let cartaHover = null;

function actualizarMouse(evento) {
    if (evento.touches && evento.touches.length > 0) {
        // Coordenadas para pantallas táctiles
        mouse.x = (evento.touches[0].clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(evento.touches[0].clientY / window.innerHeight) * 2 + 1;
    } else {
        // Coordenadas para mouse convencional
        mouse.x = (evento.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(evento.clientY / window.innerHeight) * 2 + 1;
    }
}

window.addEventListener('mousemove', (evento) => {
    actualizarMouse(evento);
    if (!regaloAbierto) return;

    raycaster.setFromCamera(mouse, camara);
    const intersecciones = raycaster.intersectObjects(grupoCartas.children, true);

    if (intersecciones.length > 0) {
        let objetoTocado = intersecciones[0].object;
        while (objetoTocado.parent && objetoTocado.userData.tipo !== 'carta') {
            objetoTocado = objetoTocado.parent;
        }

        if (objetoTocado.userData.tipo === 'carta') {
            if (cartaHover !== objetoTocado) {
                if (cartaHover) {
                    cartaHover.position.y = cartaHover.userData.originalY;
                    cartaHover.scale.set(1, 1, 1);
                }
                cartaHover = objetoTocado;
                cartaHover.position.y = cartaHover.userData.originalY + 0.5;
                cartaHover.scale.set(1.05, 1.05, 1.05);
            }
        }
    } else if (cartaHover) {
        cartaHover.position.y = cartaHover.userData.originalY;
        cartaHover.scale.set(1, 1, 1);
        cartaHover = null;
    }
});

function procesarToqueOSeleccion(evento) {
    actualizarMouse(evento);
    raycaster.setFromCamera(mouse, camara);
    
    if (!regaloAbierto) {
        const interseccionesRegalo = raycaster.intersectObjects(grupoRegalo.children, true);
        if (interseccionesRegalo.length > 0) abrirGranSorpresa();
    } else {
        const interseccionesCartas = raycaster.intersectObjects(grupoCartas.children, true);
        if (interseccionesCartas.length > 0) {
            let objetoTocado = interseccionesCartas[0].object;
            while (objetoTocado.parent && objetoTocado.userData.tipo !== 'carta') {
                objetoTocado = objetoTocado.parent;
            }
            if (objetoTocado.userData.tipo === 'carta') verFoto(objetoTocado.userData.index);
        }
    }
}

// Eventos de interacción cruzada
window.addEventListener('click', procesarToqueOSeleccion);
window.addEventListener('touchstart', procesarToqueOSeleccion, { passive: true });

// --- 5. LOGICA DE ANIMACIÓN Y REVELADO ---
let regaloAbierto = false;
let animandoApertura = false;
let tapaAbierta = false;
let cartasReveladas = false;
let objCamaraY = 5, objCamaraZ = 9;

function abrirGranSorpresa() {
    if (regaloAbierto || animandoApertura) return;
    animandoApertura = true;
    document.getElementById('titulo').innerText = "✨ ¡Sorpresa! ✨";
    document.getElementById('subtitulo').innerText = "Pasa el mouse sobre las cartas para expandir tus recuerdos";
}

function verFoto(index) {
    const recuerdo = recuerdos[index];
    document.getElementById('img-visor').src = recuerdo.foto;
    document.getElementById('txt-visor').innerText = recuerdo.mensaje;
    document.getElementById('modal-visor').classList.add('active');
}

grupoCartas.children.forEach(carta => {
    carta.scale.set(0, 0, 0);
    carta.position.y = -1;
});

// --- 6. BUCLE DE RENDERIZADO ---
const reloj = new THREE.Clock();

function bucleAnidado() {
    requestAnimationFrame(bucleAnidado);
    const tiempoTotal = reloj.getElapsedTime();

    // Parpadeo festivo y brillante de la vela
    const parpadeo = Math.sin(tiempoTotal * 22) * 0.25;
    luzVela.intensity = 3 + parpadeo;
    mechaEncendida.material.emissiveIntensity = 8 + parpadeo * 2;

    // Levitación y oscilación suave del adorno "35"
    adorno35.position.y = 1.5 + Math.sin(tiempoTotal * 2) * 0.08;
    adorno35.rotation.y = Math.sin(tiempoTotal * 0.5) * 0.1;

    // Animación física del confeti cayendo continuamente
    confetis.forEach(c => {
        c.mesh.position.y -= c.velY;
        c.mesh.rotation.x += c.rotX;
        c.mesh.rotation.y += c.rotY;
        
        if (c.mesh.position.y < 0.1) {
            c.mesh.position.y = 8;
            c.mesh.position.x = (Math.random() - 0.5) * 18;
        }
    });

    // Levitación sutil del regalo antes de abrirse
    if (!regaloAbierto && !animandoApertura) {
        grupoRegalo.position.y = 1.1 + Math.sin(tiempoTotal * 2.5) * 0.12;
        grupoRegalo.rotation.y += 0.005;
    }

    // Cinemática de apertura interactiva
    if (animandoApertura) {
        if (!tapaAbierta) {
            tapaCaja.position.z = THREE.MathUtils.lerp(tapaCaja.position.z, tapaCaja.position.z - 2.5, 0.05);
            if (tapaCaja.position.z < -0.6) tapaAbierta = true;
        } else if (!regaloAbierto) {
            grupoRegalo.scale.set(
                THREE.MathUtils.lerp(grupoRegalo.scale.x, 0, 0.1),
                THREE.MathUtils.lerp(grupoRegalo.scale.y, 0, 0.1),
                THREE.MathUtils.lerp(grupoRegalo.scale.z, 0, 0.1)
            );
            if (grupoRegalo.scale.x < 0.01) {
                regaloAbierto = true;
                grupoRegalo.visible = false;
                grupoCartas.visible = true;
            }
        } else if (!cartasReveladas) {
            let todasCartasReveladas = true;
            grupoCartas.children.forEach((carta, i) => {
                carta.scale.x = THREE.MathUtils.lerp(carta.scale.x, 1, 0.04 + i * 0.01);
                carta.scale.y = THREE.MathUtils.lerp(carta.scale.y, 1, 0.04 + i * 0.01);
                carta.scale.z = THREE.MathUtils.lerp(carta.scale.z, 1, 0.04 + i * 0.01);
                carta.position.y = THREE.MathUtils.lerp(carta.position.y, carta.userData.originalY, 0.04 + i * 0.01);
                if (carta.scale.x < 0.98) todasCartasReveladas = false;
            });
            if (todasCartasReveladas) {
                cartasReveladas = true;
                animandoApertura = false;
            }
        }
    }

    // Transición cinematográfica de cámara hacia los recuerdos
    if (regaloAbierto || animandoApertura) {
        camara.position.y = THREE.MathUtils.lerp(camara.position.y, objCamaraY, 0.04);
        camara.position.z = THREE.MathUtils.lerp(camara.position.z, objCamaraZ, 0.04);
    }

    controles.update();
    renderizador.render(escena, camara);
}

bucleAnidado();

window.addEventListener('resize', () => {
    camara.aspect = window.innerWidth / window.innerHeight;
    camara.updateProjectionMatrix();
    renderizador.setSize(window.innerWidth, window.innerHeight);
});