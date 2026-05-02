import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.160/build/three.module.js';

export function CriarFlocoDeNeve( scene ) {

    const material = new THREE.MeshBasicMaterial( { 
    color: 0xDDEEFF,
    roughness: 0.2,
    metalness: 0.2,
    opacity: 0.5,
} );

//função de ramo
function createBranch() {
    const group = new THREE.Group();

    const main = new THREE.Mesh(
        // A unidade de medida do THREE eh metro, então 0.01 = 1cm e 0.0003 = 0.3mm
        new THREE.CylinderGeometry(0.0003, 0.0003, 0.01),
        material
    );
    main.rotation.z = Math.PI / 2;
    group.add(main);

    //detalhes
    for (let i = 0.002; i < 0.01; i += 0.03) {
        const detalhe = new THREE.Mesh(
            new THREE.CylinderGeometry(0.0002, 0.0002, 0.005),
            material
        );
        detalhe.position.x = i;
        detalhe.rotation.z = Math.PI / 3.7;
        group.add(detalhe);

        const mirror = detalhe.clone();
        mirror.rotation.z = -Math.PI / 3.7;
        group.add(mirror);
    }

    return group;
}

//floco completo
const floco = new THREE.Group();

for (let i = 0; i < 6; i++) {
    const branch = createBranch();
    branch.rotation.z = (i * Math.PI) / 3;
    floco.add(branch);
}
    

floco.position.set(0, 50, 0);
floco.scale.set(2000, 2000, 2000); // Pra visualizacao
scene.add(floco);

return floco;

}


