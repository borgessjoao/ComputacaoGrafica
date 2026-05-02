import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.160/build/three.module.js';

const vertexShader = `
  precision mediump float;

  attribute vec3 position;
  attribute vec3 normal;

  uniform mat4 modelMatrix;
  uniform mat4 modelViewMatrix;
  uniform mat4 projectionMatrix;
  uniform mat3 normalMatrix;

  varying vec3 vNormal;
  varying vec3 vWorldPos;

  void main() {
    vNormal   = normalize(normalMatrix * normal);
    vWorldPos = (modelMatrix * vec4(position, 1.0)).xyz;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  precision mediump float;

  uniform vec3 uColor;
  uniform vec3 uLightPos;
  uniform vec3 uAmbient;

  varying vec3 vNormal;
  varying vec3 vWorldPos;

  void main() {
    vec3 lightDir = normalize(uLightPos - vWorldPos);
    float diff    = max(dot(vNormal, lightDir), 0.0);
    vec3  color   = uAmbient * uColor + diff * uColor;
    gl_FragColor  = vec4(color, 1.0);
  }
`;

// CORES PRÉ-DEFINIDAS PARA O CHAPÉU
const CORES_CHAPEU = [
  { nome: 'Palha',         hex: 0xd4b896 },
  { nome: 'Bege escuro',   hex: 0xb89060 },
  { nome: 'Marrom',        hex: 0x7a4f2e },
  { nome: 'Preto',         hex: 0x1a1a1a },
  { nome: 'Branco',        hex: 0xf0ece4 },
  { nome: 'Vermelho',      hex: 0xc0392b },
  { nome: 'Azul marinho',  hex: 0x1a3a5c },
  { nome: 'Verde militar', hex: 0x4a6741 },
];

// SHADER PRÓPRIO (RawShaderMaterial)
// O uniform "uColor" é o que permite trocar a cor sem recriar nada.
// CRIA O MATERIAL COM O SHADER
function criarMaterial(corHex) {
  return new THREE.RawShaderMaterial({
    vertexShader,
    fragmentShader,
    uniforms: {
      uColor:    { value: new THREE.Color(corHex) },
      uLightPos: { value: new THREE.Vector3(300, 500, 300) },
      uAmbient:  { value: new THREE.Vector3(0.8, 0.8, 0.8) },
    },
    side: THREE.DoubleSide,
  });
}

// CRIA O SELETOR DE CORES NA TELA 
// Recebe um callback "aoMudarCor(hex)" chamado ao clicar em cada botão.
function criarSeletorCores(aoMudarCor) {
  const container = document.createElement('div');
  container.style.cssText = `
    position: fixed;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    align-items: center;
    gap: 10px;
    background: rgba(0,0,0,0.6);
    padding: 10px 16px;
    border-radius: 12px;
    z-index: 999;
  `;

  const label = document.createElement('span');
  label.textContent = 'Cor do chapéu:';
  label.style.cssText = 'color:#fff; font-family:sans-serif; font-size:13px; white-space:nowrap;';
  container.appendChild(label);

  CORES_CHAPEU.forEach((cor, i) => {
    const btn = document.createElement('button');
    btn.title = cor.nome;

    // Converte número hex (0xd4b896) → string CSS (#d4b896)
    const hexStr = '#' + cor.hex.toString(16).padStart(6, '0');

    btn.style.cssText = `
      width: 28px;
      height: 28px;
      border-radius: 50%;
      border: 2px solid transparent;
      background: ${hexStr};
      cursor: pointer;
      padding: 0;
      transition: transform 0.15s, border-color 0.15s;
    `;

    if (i === 0) {
      btn.style.borderColor = '#fff';
      btn.style.transform = 'scale(1.2)';
      btn.dataset.selecionado = 'true';
    }

    btn.addEventListener('mouseenter', () => {
      if (btn.dataset.selecionado !== 'true') btn.style.transform = 'scale(1.15)';
    });
    btn.addEventListener('mouseleave', () => {
      if (btn.dataset.selecionado !== 'true') btn.style.transform = 'scale(1)';
    });

    btn.addEventListener('click', () => {
      // Remove destaque de todos
      container.querySelectorAll('button').forEach(b => {
        b.style.borderColor = 'transparent';
        b.style.transform = 'scale(1)';
        b.dataset.selecionado = 'false';
      });
      // Destaca o clicado
      btn.style.borderColor = '#fff';
      btn.style.transform = 'scale(1.2)';
      btn.dataset.selecionado = 'true';

      // Atualiza o uniform do shader com o hex escolhido
      aoMudarCor(cor.hex);
    });

    container.appendChild(btn);
  });

  document.body.appendChild(container);
}

export function criarChapeu(scene, posicao = { x: 0, y: 0, z: 0 }) {

  // Material da topo e aba (começa na primeira cor da lista)
  const matTopo  = criarMaterial(CORES_CHAPEU[0].hex);
  // Material da faixa (marrom escuro fixo)
  const matFaixa = criarMaterial(0x2b1a0e);

  const grupo = new THREE.Group();

  // ── topo (LatheGeometry: perfil 2D girado 360° em torno do eixo Y) ─────────
  const perfiltopo = [
    new THREE.Vector2(11,  0),
    new THREE.Vector2(11,  1),
    new THREE.Vector2(10,  3),
    new THREE.Vector2( 9,  5),
    new THREE.Vector2( 8,  7),
    new THREE.Vector2( 7.5, 9),
    new THREE.Vector2( 7,  11),
    new THREE.Vector2( 7,  13),
    new THREE.Vector2( 6,  14),
  ];
  const topo1 = new THREE.Mesh(new THREE.LatheGeometry(perfiltopo, 64), matTopo);
  topo1.position.y = 1; // senta 1cm acima da aba
  grupo.add(topo1);

  // Tampa circular do topo
  const topo = new THREE.Mesh(new THREE.CircleGeometry(6, 64), matTopo);
  topo.rotation.x = -Math.PI / 2;
  topo.position.y = 15; // 1cm (aba) + 14cm (topo)
  grupo.add(topo);

  // Aba 
  // Face superior (anel com furo no centro para o topo passar)
  const abaTop = new THREE.Mesh(new THREE.RingGeometry(11, 19, 128), matTopo);
  abaTop.rotation.x = -Math.PI / 2;
  abaTop.position.y = 1.0;
  grupo.add(abaTop);

  // Face inferior
  const abaBot = new THREE.Mesh(new THREE.RingGeometry(11, 19.5, 128), matTopo);
  abaBot.rotation.x = Math.PI / 2;
  abaBot.position.y = 0.0;
  grupo.add(abaBot);

  // Borda lateral externa
  const abaExt = new THREE.Mesh(new THREE.CylinderGeometry(19, 19.5, 1, 128, 1, true), matTopo);
  abaExt.position.y = 0.5;
  grupo.add(abaExt);

  // Faixa
  const faixa = new THREE.Mesh(new THREE.CylinderGeometry(11.2, 11.2, 3, 64, 1, true), matFaixa);
  faixa.position.y = 2.5;
  grupo.add(faixa);

  // Posição do grupo na cena
  grupo.position.set(posicao.x, posicao.y, posicao.z);
  scene.add(grupo);

  // Seletor de cores na tela
  // Quando o usuário clicar em uma cor, atualiza o uniform uColor do matTopo.
  // O shader pega o novo valor automaticamente no próximo frame.
  criarSeletorCores((hex) => {
    matTopo.uniforms.uColor.value.set(hex);
  });

  return grupo;
}