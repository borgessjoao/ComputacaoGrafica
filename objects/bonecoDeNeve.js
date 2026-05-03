import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.160/build/three.module.js';

export function criarBoneco(scene){

    const boneco_grupo = new THREE.Group();
    const cabeca_grupo = new THREE.Group();
    const braco1_grupo = new THREE.Group();
    const braco2_grupo = new THREE.Group();

    const neve = new THREE.MeshBasicMaterial({color: 0xcedfdf});
    const madeira = new THREE.MeshBasicMaterial({color: 0x60360e});
    const mat_cenoura = new THREE.MeshBasicMaterial({color: 0xd47217});
    const pedra = new THREE.MeshBasicMaterial({color: 0x393535});

    //corpo do boneco (três bolas de neve) as cores sao só para melhor visualização
    const geometry1 = new THREE.SphereGeometry(35, 32, 32);
    const material1 = new THREE.MeshBasicMaterial({color: 0x8ff7f0});
    const cabeca = new THREE.Mesh( geometry1, material1 );
    cabeca.position.set(0, 130, 0);

    const geometry2 = new THREE.SphereGeometry(40, 32, 32);
    const material2 = new THREE.MeshBasicMaterial({color: 0xe9f78f});
    const corpo1 = new THREE.Mesh( geometry2, material2 );
    corpo1.position.set(0, 80, 0);

    const geometry3 = new THREE.SphereGeometry(50, 32, 32);
    const material3 = new THREE.MeshBasicMaterial({color: 0xf08ff7});
    const corpo2 = new THREE.Mesh( geometry3, material3 );
    corpo2.position.set(0, 20, 0);
    

    //nariz (nariz)
    const geometry4 = new THREE.ConeGeometry(5, 30, 32);
    const material4 = new THREE.MeshBasicMaterial({color: 0xffa500});
    const nariz = new THREE.Mesh( geometry4, material4 );
    nariz.position.set(0, 130, 45);
    nariz.rotation.x = Math.PI / 2;
    nariz.rotation.y = 0;
    nariz.rotation.z = 0;

    
    //bracinhos (tubos estranhos)
    const material6 = new THREE.MeshBasicMaterial({ color: 0x8B4513 });
    const geometry6 = new THREE.CylinderGeometry(2, 2, 60);
    const braco1 = new THREE.Mesh(geometry6, material6);
    const braco2 = new THREE.Mesh(geometry6, material6);

    braco1.position.set(40, 90, 0);
    braco1.rotation.z = Math.PI / 4;

    braco2.position.set(-40, 90, 0);
    braco2.rotation.z = (Math.PI / 4)*3;
 

    braco1_grupo.add(braco1);
    braco2_grupo.add(braco2);
    cabeca_grupo.add(cabeca);
    cabeca_grupo.add(nariz);

    boneco_grupo.add(braco2_grupo);
    boneco_grupo.add(braco1_grupo);
    boneco_grupo.add(corpo1);
    boneco_grupo.add(corpo2);
    boneco_grupo.add(cabeca_grupo);

    return boneco_grupo;
}
