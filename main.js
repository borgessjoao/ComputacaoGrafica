import * as THREE from 'three';
import { RGBELoader } from 'three/addons/loaders/RGBELoader.js';
import { criarBanco } from './objects/banco.js';
import { CriarFlocoDeNeve } from './objects/flocoDeNeve.js';
import { criarChapeu } from './objects/chapeu.js';
import { criarBoneco } from './objects/bonecoDeNeve.js';
import { criarCoelho } from './objects/coelho.js';

// Textura de neve
const loader = new THREE.TextureLoader();
const texturaNeve = loader.load(`textures/Snow014_2K-PNG_AmbientOcclusion.png`);
texturaNeve.wrapS = THREE.RepeatWrapping;
texturaNeve.wrapT = THREE.RepeatWrapping;

// Cena, câmera, renderer
const scene = new THREE.Scene();
const rgbeLoader = new RGBELoader();
rgbeLoader.load('./textures/passendorf_snow_4k.hdr', (texture) => {
  texture.mapping = THREE.EquirectangularReflectionMapping;
  scene.background = texture;
  scene.environment = texture; // faz o HDRI iluminar os objetos também
});

const camera1 = new THREE.PerspectiveCamera(60, innerWidth / innerHeight, 0.1, 10000);
camera1.position.set(300, 200, 400);
camera1.lookAt(0, 50, 0);

const camera2 = new THREE.PerspectiveCamera(60, innerWidth / innerHeight, 0.1, 10000);
camera2.position.set(0, 100, 500);
camera2.lookAt(0, 50, 0);

// Camera 3 - de costas, atrás dos objetos  
const camera3 = new THREE.PerspectiveCamera(60, innerWidth / innerHeight, 0.1, 10000);
camera3.position.set(100, 150, -500); // atrás da cena
camera3.lookAt(100, 50, 0); // aponta pro meio entre banco e boneco

let cameraAtiva = camera1;

// Alterna entre as 3 em sequência
window.addEventListener('keydown', (e) => {
  if (e.key === 'c' || e.key === 'C') {
    if (cameraAtiva === camera1) cameraAtiva = camera2;
    else if (cameraAtiva === camera2) cameraAtiva = camera3;
    else cameraAtiva = camera1;
  }
});

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(innerWidth, innerHeight);
document.body.appendChild(renderer.domElement);

// Luz
const luz = new THREE.DirectionalLight(0xffffff, 0.8); 
luz.position.set(5, 10, 5);
scene.add(luz);
scene.add(new THREE.AmbientLight(0xffffff, 2));

// Objetos
criarBanco(scene);
criarChapeu(scene, { x: 0, y: 155, z: 0 });
const coelho = criarCoelho(scene);
const floco = new CriarFlocoDeNeve(scene);
const frederico = criarBoneco(scene);
scene.add(coelho);
scene.add(frederico);

// Loop de renderização
function animate() {
  floco.update(); 
  
  requestAnimationFrame(animate);
  renderer.render(scene, cameraAtiva);
}
animate();

// Redimensionamento
window.addEventListener('resize', () => {
  camera1.aspect = innerWidth / innerHeight;
  camera1.updateProjectionMatrix();
  camera2.aspect = innerWidth / innerHeight;
  camera2.updateProjectionMatrix();
  camera3.aspect = innerWidth / innerHeight;
  camera3.updateProjectionMatrix();
  renderer.setSize(innerWidth, innerHeight);
});