import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.160/build/three.module.js';
import { criarBanco } from './objects/banco.js';
import { CriarFlocoDeNeve } from './objects/flocoDeNeve.js';
import { criarChapeu } from './objects/chapeu.js';
import { criarBoneco } from './objects/bonecoDeNeve.js';

// Cena, câmera, renderer
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x9ad0f0); //só mudei pra enxergar o boneco melhor, depois mudamos
const chaoGeo = new THREE.PlaneGeometry(2000, 2000);
const chaoMat = new THREE.MeshStandardMaterial({ color: 0xb0b8c1 });
const chao = new THREE.Mesh(chaoGeo, chaoMat);
chao.rotation.x = -Math.PI / 2; // deita o plano
chao.position.y = 0;
scene.add(chao);

const camera1 = new THREE.PerspectiveCamera(30, innerWidth / innerHeight, 0.1, 10000);//era 75 de zoom
camera1.position.set(300, 200, 400);
camera1.lookAt(0, 50, 0);

const camera2 = new THREE.PerspectiveCamera(30, innerWidth / innerHeight, 0.1, 10000);
camera2.position.set(0, 100, 500);
camera2.lookAt(0, 50, 0);

// Câmera ativa no momento (começa com a 1)
let cameraAtiva = camera1;

//permite escolher a camera
window.addEventListener('keydown', (e) => {
  if (e.key === 'c' || e.key === 'C') {
    cameraAtiva = (cameraAtiva === camera1) ? camera2 : camera1;
  }
});

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(innerWidth, innerHeight);
document.body.appendChild(renderer.domElement);

// Luz
const luz = new THREE.DirectionalLight(0xffffff, 3);
luz.position.set(5, 10, 5);
scene.add(luz);
scene.add(new THREE.AmbientLight(0xffffff, 0.6));

// Seu objeto
criarBanco(scene);
criarChapeu(scene, { x: 150, y: 72, z: 200 });
const floco = new CriarFlocoDeNeve(scene);
const frederico = criarBoneco(scene);
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
  renderer.setSize(innerWidth, innerHeight);
});