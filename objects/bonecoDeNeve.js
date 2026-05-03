import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.160/build/three.module.js';

export function criarBoneco(scene){

    //corpo do boneco (três bolas de neve)
    const geometry1 = new THREE.SphereGeometry(1, 32, 32);
    const material1 = new THREE.MeshBasicMaterial( { color: 0x8ff7f0} );
    const sphere1 = new THREE.Mesh( geometry1, material1 );
    sphere1.position.set(0,-1.5,0);
    scene.add( sphere1 );

    const geometry2 = new THREE.SphereGeometry(1, 32, 32);
    const material2 = new THREE.MeshBasicMaterial( { color: 0xe9f78f} );
    const sphere2 = new THREE.Mesh( geometry2, material2 );
    sphere2.position.set(0, 0, 0);
    scene.add( sphere2 );

    const geometry3 = new THREE.SphereGeometry(1, 32, 32);
    const material3 = new THREE.MeshBasicMaterial( { color: 0xf08ff7} );
    const sphere3 = new THREE.Mesh( geometry3, material3 );
    sphere3.position.set(0, 1.5, 0);
    scene.add( sphere3 );
    
    //nariz (cone)
    const geometry4 = new THREE.ConeGeometry(0.2, 1, 32);
    const material4 = new THREE.MeshBasicMaterial( { color: 0xffa500} );
    const cone = new THREE.Mesh( geometry4, material4 );
    cone.position.set(0, 1.25, 1.25);
    cone.rotation.x = Math.PI / 2;
    cone.rotation.y = 0;
    cone.rotation.z = 0;
    scene.add( cone );

    //bracinho1
    const material6 = new THREE.LineBasicMaterial({ color: 0x8B4513 });
    const geometry6 = new THREE.CylinderGeometry(0.05, 0.05, 2);

    const stick1 = new THREE.Mesh(geometry6, material6);

    stick1.position.set(1, 0.25, 0);
    stick1.rotation.z = Math.PI / 4;
    scene.add(stick1);

}

//bracinho2

//const stick2 = new THREE.Mesh(geometry7, material6);
//scene.add(stick2);
