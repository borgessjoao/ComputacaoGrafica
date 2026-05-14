# PP1 Computação Gráfica

Repositório para o trabalho da matéria de Processamento Gráfico, na área de Computação Gráfica, proposta pelo professor Mário Lizier para a turma de 2026/1.

## Grupo:
Aline Riemer - 832869

Ana Beatriz Oliveira Carulla - 831499

João da Silva Borges - 831605

Marcela Molina Ferraz de Lima - 832162

## Estrutura do projeto

```text
ComputacaoGrafica/
├── main.js
├── README.md
├── index.html
├── objects/
|   ├── balanco.js
|   ├── banco.js
|   ├── bonecoDeNeve.js
|   ├── cachecol.js
|   ├── chapeu.js
|   ├── coelho.js
│   └── flocoDeNeve.js
├── textures/
    ├── Fabric016_1K-PNG_Color.png
    ├── Snow010A_1K-JPG_Color.jpg
    ├── Wood066_2K-PNG_Color.png
    └── passendorf_snow_4k.hdr
```

## Descrição do projeto

- Cada integrante do grupo foi responsável por implementar 1 objeto 3D e posicioná-lo na cena implementada no arquivo principal `main.js`.

- Além dos 4 objetos necessários, implementamos mais 3 (para obter os pontos extras).

- O trabalho foi feito com WebGL, JavaScript e a biblioteca Three.js. Para visualizar o resultado utilizamos o arquivo `index.html` no navegador (Pelo VS Code é possível visualizar com o uso da extensão Live Server sobre o arquivo html).

- O banco e o boneco de neve foram criados com textura de madeira e neve, respectivamente.

- O cachecol do boneco de neve também possui textura, de lã.

- O floco de neve foi um dos objetos com movimento, caindo do "céu ao chão" por toda a cena.

- O coelho possui animação de movimentação simples, incluindo o balançar das orelhas e o farejar contínuo do nariz.

- O chapéu utiliza shader próprio implementado via RawShaderMaterial, com vertex shader e fragment shader escritos em GLSL. O fragment shader usa iluminação difusa com um uniform `uColor` que permite alterar a cor do chapéu em tempo real, sem recriar o material.

- Na `main.js` foi criada a cena que utiliza uma HDRI - High Dynamic Range Image - que, com o `Three.js`, ela é responsável por definir o background e a iluminação, trazendo um aspecto mais realista.

- Ainda na `main.js` foram inseridos os 7 objetos, criadas as câmeras e foi feita a animação dos flocos de neve e do coelho.

## Câmeras
- **Câmera 1** — visão diagonal lateral (padrão)
- **Câmera 2** — visão de frente
- **Câmera 3** — visão de trás


## Como interagir com a cena


|         AÇÃO          |                  COMO FAZER                     |
|-----------------------|-------------------------------------------------| 
| Alternar câmeras      | Pressionar a tecla `C` ou `c`                   |
| Mudar a cor do chapéu | Clicar nas bolinhas coloridas no rodapé da tela |
