import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.160/build/three.module.js';

export function criarBalanco(scene, posicao = { x: -450, y: 0, z: 100 }) {

  const preto  = new THREE.MeshStandardMaterial({ color: 0x1a1a1a });
  const marrom = new THREE.MeshStandardMaterial({ color: 0x7a3e0e });

  const grupo = new THREE.Group();

  //função para criar um cilindro entre dois pontos dados
  function cilindroEntre(p1, p2, raio, material) {
    const dir    = new THREE.Vector3().subVectors(p2, p1);
    const altura = dir.length();
    const meio   = new THREE.Vector3().addVectors(p1, p2).multiplyScalar(0.5);

    const geo  = new THREE.CylinderGeometry(raio, raio, altura, 8);
    const mesh = new THREE.Mesh(geo, material);

    mesh.position.copy(meio);

    //alinha cilindro na direção do vetor
    mesh.quaternion.setFromUnitVectors(
      new THREE.Vector3(0, 1, 0),
      dir.clone().normalize()
    );

    return mesh;
  }

  //suporte em A da lateral do balanço
  function criarSuporteA(xCentro) {
    const g = new THREE.Group();
    const abertura = 40; 
    const topo     = new THREE.Vector3(xCentro, 200,  0);
    const baseFrente = new THREE.Vector3(xCentro, 0,  abertura);
    const baseTras   = new THREE.Vector3(xCentro, 0, -abertura);

    g.add(cilindroEntre(baseFrente, topo, 3, preto));

    g.add(cilindroEntre(baseTras, topo, 3, preto));

    const mFrente = new THREE.Vector3().lerpVectors(baseFrente, topo, 0.45);
    const mTras   = new THREE.Vector3().lerpVectors(baseTras,   topo, 0.45);
    g.add(cilindroEntre(mFrente, mTras, 2, preto));

    return g;
  }

  grupo.add(criarSuporteA(0)); 
  grupo.add(criarSuporteA(300));

  //barra horizontal que liga os As
  const barraGeo  = new THREE.CylinderGeometry(4, 4, 300, 12);
  const barra     = new THREE.Mesh(barraGeo, preto);
  barra.rotation.z = Math.PI / 2;
  barra.position.set(150, 200, 0);
  grupo.add(barra);

  //função que auxilia a criação dos assentos
  function criarAssento(xAssento) { // xAssento: posição x do assento na barra
    const g = new THREE.Group();

    const alturaAssento  = 50; // altura do assento em relação ao chão
    const comprCorrente = 200 - alturaAssento; // da barra até o assento
    const meiAssento    = 20;  // metade da largura do assento
    const profAssento   = 10;  // metade da profundidade

    // 4 pontos de fixação na barra (dois na frente, dois atrás)
    const fixFL = new THREE.Vector3(xAssento - meiAssento, 200,  profAssento);
    const fixFR = new THREE.Vector3(xAssento + meiAssento, 200,  profAssento);
    const fixTL = new THREE.Vector3(xAssento - meiAssento, 200, -profAssento);
    const fixTR = new THREE.Vector3(xAssento + meiAssento, 200, -profAssento);

    // 4 pontos de fixação no assento
    const aFL = new THREE.Vector3(xAssento - meiAssento, alturaAssento,  profAssento);
    const aFR = new THREE.Vector3(xAssento + meiAssento, alturaAssento,  profAssento);
    const aTL = new THREE.Vector3(xAssento - meiAssento, alturaAssento, -profAssento);
    const aTR = new THREE.Vector3(xAssento + meiAssento, alturaAssento, -profAssento);

    // Correntes
    g.add(cilindroEntre(fixFL, aFL, 1, preto));
    g.add(cilindroEntre(fixFR, aFR, 1, preto));
    g.add(cilindroEntre(fixTL, aTL, 1, preto));
    g.add(cilindroEntre(fixTR, aTR, 1, preto));

    // Assento
    const assentoGeo = new THREE.BoxGeometry(meiAssento * 2, 4, profAssento * 2);
    const assento    = new THREE.Mesh(assentoGeo, marrom);
    assento.position.set(xAssento, alturaAssento - 2, 0);
    g.add(assento);

    return g;
  }

  grupo.add(criarAssento(90));  // assento esquerdo
  grupo.add(criarAssento(210)); // assento direito
  
  //posiciona na cena
  grupo.position.set(posicao.x, posicao.y, posicao.z);
  scene.add(grupo);

  return grupo;
}