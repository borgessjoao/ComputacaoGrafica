import * as THREE from 'three';

// Quantos flocos aparecem na cena ao mesmo tempo
const QUANTIDADE = 200;
 
// Área horizontal em que os flocos aparecem (em cm, igual ao resto da cena)
const AREA = 800;
 
// Altura em que os flocos nascem e somem
const Y_INICIO =  400; // topo — nasce aqui
const Y_FIM    = -20;  // chão  — some aqui

function posAleatoria() {
  return (Math.random() - 0.5) * AREA;
}

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

// cria mais (QUANTIDADE - 1) flocos clonando o original
// O floco original acima já conta como 1, então criamos os restantes clonando.
const todosFlocos = [floco];

for (let i = 1; i < QUANTIDADE; i++) {
    const clone = floco.clone();
    clone.position.set(
        posAleatoria(),
        Math.random() * (Y_INICIO - Y_FIM) + Y_FIM, // altura aleatória inicial
        posAleatoria()
    );
    // velocidade e rotação individuais guardadas no userData de cada clone
    clone.userData.velocidadeQueda = 0.3 + Math.random() * 0.5;
    clone.userData.velocidadeGiroY = 0.002 + Math.random() * 0.006;
    clone.userData.velocidadeGiroZ = 0.002 + Math.random() * 0.004;
    scene.add(clone);
    todosFlocos.push(clone);
}

// O floco original também recebe seus metadados
floco.userData.velocidadeQueda = 0.3 + Math.random() * 0.5;
floco.userData.velocidadeGiroY = 0.002 + Math.random() * 0.006;
floco.userData.velocidadeGiroZ = 0.002 + Math.random() * 0.004;

// Retorna objeto com .update() para chamar no animate() do main.js
// e também expõe o floco original em .rotation
const resultado = {
    rotation: floco.rotation,
    update() {
        for (const f of todosFlocos) {
            f.position.y -= f.userData.velocidadeQueda;
            f.rotation.y += f.userData.velocidadeGiroY;
            f.rotation.z += f.userData.velocidadeGiroZ;

            // Quando chega embaixo, renasce no topo em posição aleatória
            if (f.position.y < Y_FIM) {
                f.position.set(
                    posAleatoria(),
                    Y_INICIO,
                    posAleatoria()
                );
            }
        }
    }
};

return resultado;

}