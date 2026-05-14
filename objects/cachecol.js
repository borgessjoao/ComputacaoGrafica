import * as THREE from 'three';

export function criarCachecol(scene){

    const cachecol = new THREE.Group();

    //textura do cachecol (peguei de um site gratuito)
    const texturaTrico = new THREE.TextureLoader().load('textures/Fabric016_1K-PNG_Color.png');

    texturaTrico.wrapS = THREE.RepeatWrapping;
    texturaTrico.wrapT = THREE.RepeatWrapping;
    texturaTrico.center.set(0.5, 0.5);
    texturaTrico.rotation = Math.PI / 2;


    const texturaCilindro = texturaTrico.clone();
    const texturaPonta = texturaTrico.clone();
    texturaCilindro.repeat.set(2, 15);
    texturaPonta.repeat.set(4, 2);

    const tricoCilindro = new THREE.MeshLambertMaterial({map: texturaCilindro, roughness: 1.0});
    const tricoPonta = new THREE.MeshLambertMaterial({map: texturaPonta, roughness: 1.0});

    //formato cilindrico
    const cilindro = new THREE.CylinderGeometry(34, 34, 15, 64);
    const pescoço = new THREE.Mesh(cilindro, tricoCilindro);
    cachecol.position.set(0, 110, 0);

    //retangulinho saindo dele
    const retangulo = new THREE.BoxGeometry(15, 40, 1);
    const ponta = new THREE.Mesh(retangulo, tricoPonta);
    ponta.rotation.x -= 0.27;
    ponta.position.set(5, -10, 35);
    ponta.rotation.y += 0.1;

    cachecol.add(pescoço);
    cachecol.add(ponta);

    return cachecol;
}