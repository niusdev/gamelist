import type { EstadoJogo, Jogo } from "./types.js";

// Cria um jogo novo e adiciona ao catálogo.
export function adicionarJogo(
  jogos: Jogo[],
  dados: Omit<Jogo, "id" | "comentarios">,
): void {
  jogos.push({ ...dados, id: Date.now(), comentarios: [] });
}

// Remove o jogo selecionado do catálogo.
export function excluirJogo(jogos: Jogo[], jogo: Jogo): void {
  const indice: number = jogos.indexOf(jogo);
  if (indice !== -1) jogos.splice(indice, 1);
}

// Atualiza o estado e limpa os dados pessoais ao retirar da lista.
export function mudarEstado(jogo: Jogo, estado: EstadoJogo): void {
  jogo.estado = estado;
  if (estado === "fora") {
    jogo.nota = undefined;
    jogo.precoPago = undefined;
    jogo.loja = undefined;
  }
}

// Salva os detalhes pessoais e, se houver texto, adiciona um comentário.
export function salvarDetalhes(
  jogo: Jogo,
  nota: number | undefined,
  precoPago: number | undefined,
  loja: string,
  comentario: string,
): void {
  jogo.nota = nota;
  jogo.precoPago = precoPago;
  jogo.loja = loja || undefined;
  const texto: string = comentario.trim();
  if (texto) {
    jogo.comentarios.push({
      autor: "Você",
      texto,
      data: new Date().toLocaleDateString("pt-BR"),
    });
  }
}

// Busca por título e categoria ao mesmo tempo.
export function filtrarJogos(
  jogos: Jogo[],
  busca: string,
  categoria: string,
): Jogo[] {
  const termo: string = busca.trim().toLowerCase();
  return jogos.filter(
    (jogo: Jogo): boolean =>
      jogo.titulo.toLowerCase().includes(termo) &&
      (categoria === "Todas" || jogo.categoria === categoria),
  );
}

// Retorna somente os jogos da lista pessoal.
export function jogosDaLista(jogos: Jogo[]): Jogo[] {
  return jogos.filter((jogo: Jogo): boolean => jogo.estado !== "fora");
}

// Conta quantos jogos estão no estado escolhido.
export function contarPorEstado(jogos: Jogo[], estado: EstadoJogo): number {
  return jogos.filter((jogo: Jogo): boolean => jogo.estado === estado).length;
}

// Valida um preço não negativo; zero é permitido.
export function validarPreco(texto: string): string {
  if (!texto.trim()) return "Informe um preço.";
  const preco: number = Number(texto);
  if (!Number.isFinite(preco)) return "Informe um valor numérico válido.";
  if (preco < 0) return "O preço não pode ser negativo.";
  return "";
}

// Retorna o primeiro erro do formulário de cadastro.
export function validarJogo(
  titulo: string,
  categoria: string,
  precoTexto: string,
): string {
  if (!titulo.trim()) return "Informe o título do jogo.";
  if (!categoria) return "Selecione uma categoria.";
  return validarPreco(precoTexto);
}
