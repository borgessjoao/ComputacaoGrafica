import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.160/build/three.module.js';
import { criarBanco } from './objects/banco.js';
import { CriarFlocoDeNeve } from './objects/flocoDeNeve.js';

// Cena, câmera, renderer
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x222222);

const camera = new THREE.PerspectiveCamera(75, innerWidth / innerHeight, 0.1, 10000);
camera.position.set(300, 200, 400);
camera.lookAt(0, 50, 0);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(innerWidth, innerHeight);
document.body.appendChild(renderer.domElement);

// Luz
const luz = new THREE.DirectionalLight(0xffffff, 1);
luz.position.set(5, 10, 5);
scene.add(luz);
scene.add(new THREE.AmbientLight(0xffffff, 0.3));

// Seu objeto
criarBanco(scene);

const floco = new CriarFlocoDeNeve(scene);

// Loop de renderização
function animate() {
  //rotacao do floco
  floco.rotation.y += 0.004;
  floco.rotation.z += 0.004;
  
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
animate();

// Redimensionamento
window.addEventListener('resize', () => {
  camera.aspect = innerWidth / innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(innerWidth, innerHeight);
});