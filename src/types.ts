export type EstadoJogo = "fora" | "quero-jogar" | "jogando" | "ja-joguei";

export interface Comentario {
  autor: string;
  texto: string;
  data: string;
}

export interface Jogo {
  id: number;
  titulo: string;
  categoria: string;
  preco: number;
  capa: string;
  descricao: string;
  estado: EstadoJogo;
  precoPago?: number;
  loja?: string;
  nota?: number;
  comentarios: Comentario[];
}
