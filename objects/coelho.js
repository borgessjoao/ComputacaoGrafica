import * as THREE from 'three';
import { or } from 'three/tsl';

export function criarCoelho(scene) {
    const grupoCoelho = new THREE.Group();

    const pelo = new THREE.MeshLambertMaterial({ color: 0x964B00 });
    const olhoMaterial = new THREE.MeshLambertMaterial({ color: 0x000000 });
    const narizMaterial = new THREE.MeshLambertMaterial({ color: 0xff69b4 });

    // corpo
    const corpo = new THREE.Mesh(new THREE.SphereGeometry(15, 32, 32), pelo);
    corpo.scale.set(1, 0.8, 1);
    corpo.position.y = 15;
    grupoCoelho.add(corpo);

    // cabeca
    const cabeca = new THREE.Mesh(new THREE.SphereGeometry(10, 32, 32), pelo);
    cabeca.position.set(0, 25, 12);
    grupoCoelho.add(cabeca);

    // molde das orelhas
    const geoOrelha = new THREE.SphereGeometry(3, 32, 32);

    // orelha esquerda
    const orelhaEsq = new THREE.Mesh(geoOrelha, pelo);
    orelhaEsq.scale.set(1, 5, 0.5);
    orelhaEsq.position.set(-4, 40, 10);
    orelhaEsq.rotation.z = 0.2;
    grupoCoelho.add(orelhaEsq);

    // orelha direita
    const orelhaDir = orelhaEsq.clone();
    orelhaDir.position.x = 4;
    orelhaDir.rotation.z = -0.2;
    grupoCoelho.add(orelhaDir);

    // molde dos olhos
    const geoOlho = new THREE.SphereGeometry(2, 16, 16);

    // olho esquerdo
    const olhoEsq = new THREE.Mesh(geoOlho, olhoMaterial); 
    olhoEsq.position.set(-5.5, 27, 18);
    grupoCoelho.add(olhoEsq);

    // olho direito
    const olhoDir = olhoEsq.clone();
    olhoDir.position.x = 5.5;
    grupoCoelho.add(olhoDir);

    // nariz
    const nariz = new THREE.Mesh(new THREE.SphereGeometry(1.2, 16, 16), narizMaterial);
    nariz.position.set(0, 24, 21);
    grupoCoelho.add(nariz);

    // Rabo
    const rabo = new THREE.Mesh(new THREE.SphereGeometry(4, 16, 16), pelo);
    rabo.position.set(0, 10, -15);
    grupoCoelho.add(rabo);

    grupoCoelho.position.set(200, 50, 0);
    grupoCoelho.scale.set(2, 2, 2);
    grupoCoelho.rotation.y = 45 * (Math.PI / 180);
    

    grupoCoelho.update = function(tempo) {
    // Movimentacao suave das orelhas
    const oscilacaoZ = Math.sin(tempo * 3) * 0.05; 
    const oscilacaoY = Math.sin(tempo * 3) * 0.1;

    // Aplica as oscilações
    orelhaEsq.rotation.z = 0.1 + oscilacaoZ;
    orelhaEsq.position.y = 37 - oscilacaoY * 7; 
    
    orelhaDir.rotation.z = - 0.1 - oscilacaoZ;
    orelhaDir.position.y = 37 - oscilacaoY * 7;
    };

    scene.add(grupoCoelho);

    return grupoCoelho;
}