import type { Jogo } from "./types.js";

// Mantém o catálogo em memória durante o uso da página.
export const jogos: Jogo[] = [
  {
    id: 1,
    titulo: "Red Dead Redemption 2",
    categoria: "Aventura",
    preco: 299.9,
    capa: "https://cdn.akamai.steamstatic.com/steam/apps/1174180/header.jpg",
    descricao:
      "Western de mundo aberto da Rockstar Games: acompanhe Arthur Morgan e a gangue de Dutch van der Linde durante o fim do Velho Oeste.",
    estado: "quero-jogar",
    comentarios: [
      {
        autor: "Ana",
        texto: "A exploração desse mundo é incrível!",
        data: "28/10/2026",
      },
    ],
  },
  {
    id: 2,
    titulo: "Hades",
    categoria: "Ação",
    preco: 73.99,
    capa: "https://cdn.akamai.steamstatic.com/steam/apps/1145360/header.jpg",
    descricao:
      "Roguelike de ação da Supergiant Games em que Zagreu, filho de Hades, tenta escapar do submundo da mitologia grega.",
    estado: "jogando",
    comentarios: [],
  },
  {
    id: 3,
    titulo: "The Witcher 3: Wild Hunt",
    categoria: "RPG",
    preco: 79.99,
    capa: "https://cdn.akamai.steamstatic.com/steam/apps/292030/header.jpg",
    descricao:
      "RPG de mundo aberto da CD Projekt RED: como o caçador de monstros Geralt de Rívia, você procura Ciri enquanto a Caçada Selvagem ameaça o mundo.",
    estado: "ja-joguei",
    comentarios: [],
  },
  {
    id: 4,
    titulo: "Forza Horizon 5",
    categoria: "Corrida",
    preco: 249,
    capa: "https://cdn.akamai.steamstatic.com/steam/apps/1551360/header.jpg",
    descricao:
      "Corrida de mundo aberto ambientada no México, com centenas de carros e festivais de corrida espalhados pelo mapa.",
    estado: "fora",
    comentarios: [],
  },
  {
    id: 5,
    titulo: "EA SPORTS FC 25",
    categoria: "Esporte",
    preco: 299.9,
    capa: "https://cdn.akamai.steamstatic.com/steam/apps/2669320/header.jpg",
    descricao:
      "Simulador de futebol da EA Sports com clubes e jogadores licenciados, modos online e o Ultimate Team.",
    estado: "fora",
    comentarios: [],
  },
  {
    id: 6,
    titulo: "Hollow Knight",
    categoria: "Indie",
    preco: 46.99,
    capa: "https://cdn.akamai.steamstatic.com/steam/apps/367520/header.jpg",
    descricao:
      "Metroidvania de ação da Team Cherry, ambientada no reino subterrâneo de insetos de Hallownest, com combate preciso e mapa interligado.",
    estado: "quero-jogar",
    comentarios: [],
  },
  {
    id: 7,
    titulo: "Sid Meier's Civilization VI",
    categoria: "Estratégia",
    preco: 199,
    capa: "https://cdn.akamai.steamstatic.com/steam/apps/289070/header.jpg",
    descricao:
      "Estratégia por turnos da Firaxis: fundamente uma civilização e conduza seu povo da Idade da Pedra até a Era da Informação.",
    estado: "fora",
    comentarios: [],
  },
  {
    id: 8,
    titulo: "Counter-Strike 2",
    categoria: "Ação",
    preco: 0,
    capa: "https://cdn.akamai.steamstatic.com/steam/apps/730/header.jpg",
    descricao:
      "Shooter tático gratuito da Valve, com partidas competitivas de 5 contra 5 e modos casuais.",
    estado: "jogando",
    comentarios: [],
  },
  {
    id: 9,
    titulo: "Elden Ring",
    categoria: "RPG",
    preco: 229.9,
    capa: "https://cdn.akamai.steamstatic.com/steam/apps/1245620/header.jpg",
    descricao:
      "RPG de ação da FromSoftware com mundo aberto criado em parceria com o escritor George R. R. Martin, nas Terras Intermédias.",
    estado: "fora",
    comentarios: [],
  },
  {
    id: 10,
    titulo: "Stardew Valley",
    categoria: "Indie",
    preco: 24.99,
    capa: "https://cdn.akamai.steamstatic.com/steam/apps/413150/header.jpg",
    descricao:
      "Simulador de fazenda criado por Eric Barone: cultive, crie animais, pesque, explore minas e conheça os moradores da vila.",
    estado: "ja-joguei",
    comentarios: [],
  },
];
