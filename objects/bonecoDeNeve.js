import * as THREE from 'three';

export function criarBoneco(scene){

    const boneco_grupo = new THREE.Group();
    const cabeca_grupo = new THREE.Group();
    const braco1_grupo = new THREE.Group();
    const braco2_grupo = new THREE.Group();

    // textura do boneco
    const texturaNeve = new THREE.TextureLoader().load(`textures/Snow010A_1K-JPG_Color.jpg`);
    const neve = new THREE.MeshLambertMaterial({ map: texturaNeve });

    const madeira = new THREE.MeshPhongMaterial({color: 0x60360e});
    const cenoura = new THREE.MeshPhongMaterial({color: 0xd47217});
    const pedra = new THREE.MeshPhongMaterial({color: 0x393535});

    //corpo do boneco (três bolas de neve) as cores sao só para melhor visualização
    const esfera1 = new THREE.SphereGeometry(35);
    const cabeca = new THREE.Mesh(esfera1, neve);
    cabeca.position.set(0, 130, 0);

    const esfera2 = new THREE.SphereGeometry(40);
    const corpo1 = new THREE.Mesh(esfera2, neve);
    corpo1.position.set(0, 80, 0);

    const esfera3 = new THREE.SphereGeometry(50);
    const corpo2 = new THREE.Mesh(esfera3, neve);
    corpo2.position.set(0, 20, 0);
    

    //nariz (nariz)
    const cone = new THREE.ConeGeometry(5, 30, 32);
    const nariz = new THREE.Mesh(cone, cenoura);
    nariz.position.set(0, 125, 45);
    nariz.rotation.x = Math.PI / 2;
    nariz.rotation.y = 0;
    nariz.rotation.z = 0;


    //bracinhos (tubos)
    const cilindro = new THREE.CylinderGeometry(2, 2, 60);
    const braco1 = new THREE.Mesh(cilindro, madeira);
    const braco2 = new THREE.Mesh(cilindro, madeira);

    braco1.position.set(40, 90, 0);
    braco1.rotation.z = Math.PI / 4;

    braco2.position.set(-40, 90, 0);
    braco2.rotation.z = (Math.PI / 4)*3;


    //olhos
    const olho = new THREE.SphereGeometry(2);
    const olho1 = new THREE.Mesh(olho, pedra);
    const olho2 = new THREE.Mesh(olho, pedra);
    olho1.scale.set(1, 1.5, 1);
    olho2.scale.set(1, 1.5, 1);
    olho1.position.set(15, 130, 32);
    olho2.position.set(-15, 130, 32);


    //hierarquia
    braco1_grupo.add(braco1);
    braco2_grupo.add(braco2);
    cabeca_grupo.add(cabeca);
    cabeca_grupo.add(nariz);
    cabeca_grupo.add(olho1);
    cabeca_grupo.add(olho2);

    boneco_grupo.add(braco2_grupo);
    boneco_grupo.add(braco1_grupo);
    boneco_grupo.add(corpo1);
    boneco_grupo.add(corpo2);
    boneco_grupo.add(cabeca_grupo);

    boneco_grupo.rotation.y += 0.5;

    return boneco_grupo;
}
