// banco.js
import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.160/build/three.module.js';

export function criarBanco(scene) {
  const grupoBanco = new THREE.Group();

  const madeira = new THREE.MeshLambertMaterial({ color: 0x8B4513 });
  const metal   = new THREE.MeshLambertMaterial({ color: 0x555555 });

  // Assento
  const assento = new THREE.Mesh(new THREE.BoxGeometry(200, 10, 60), madeira);
  assento.position.y = 50;
  grupoBanco.add(assento);

  // Encosto
  const encosto = new THREE.Mesh(new THREE.BoxGeometry(200, 50, 8), madeira);
  encosto.position.set(0, 85, -26);
  encosto.rotation.x = THREE.MathUtils.degToRad(-10); // leve inclinação
  grupoBanco.add(encosto);

  // 4 pés
  const geoPe = new THREE.BoxGeometry(8, 50, 8);
  const posicoesPes = [
    [-85, 25, 25],
    [ 85, 25, 25],
    [-85, 25, -25],
    [ 85, 25, -25],
  ];
  posicoesPes.forEach(([x, y, z]) => {
    const pe = new THREE.Mesh(geoPe, metal);
    pe.position.set(x, y, z);
    grupoBanco.add(pe);
  });

  // Posiciona o banco na cena
  grupoBanco.position.set(200, 0, 0);

  scene.add(grupoBanco);
  return grupoBanco;
}