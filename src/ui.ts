import { contarPorEstado, jogosDaLista } from "./logica.js";
import type { EstadoJogo, Jogo } from "./types.js";

const nomesEstado: Record<EstadoJogo, string> = {
  fora: "Fora da minha lista",
  "quero-jogar": "Quero jogar",
  jogando: "Jogando",
  "ja-joguei": "Já joguei",
};
const estadosLista: EstadoJogo[] = ["quero-jogar", "jogando", "ja-joguei"];

// Busca um elemento obrigatório do HTML.
export function obterElemento<T extends HTMLElement = HTMLElement>(
  id: string,
): T {
  const elemento = document.getElementById(id);
  if (!elemento) throw new Error(`Elemento não encontrado: #${id}`);
  return elemento as T;
}

const gradeCatalogo = obterElemento<HTMLDivElement>("grade-catalogo");
const gradeLista = obterElemento<HTMLDivElement>("grade-lista");
const resumoLista = obterElemento<HTMLDivElement>("resumo-lista");
const conteudoDetalhes = obterElemento<HTMLDivElement>("conteudo-detalhes");

// Cria um elemento com classe e texto opcionais.
function criar(tag: string, classe: string, texto?: string): HTMLElement {
  const elemento = document.createElement(tag);
  elemento.className = classe;
  if (texto !== undefined) elemento.textContent = texto;
  return elemento;
}

// Cria um botão e liga sua ação.
function criarBotao(
  texto: string,
  classe: string,
  aoClicar: (evento: MouseEvent) => void,
): HTMLButtonElement {
  const botao = document.createElement("button");
  botao.type = "button";
  botao.className = classe;
  botao.textContent = texto;
  botao.addEventListener("click", aoClicar);
  return botao;
}

// Cria o mesmo botão de lista para o card e os detalhes.
function criarBotaoAdicionar(
  jogo: Jogo,
  aoAdicionar: (jogo: Jogo) => void,
): HTMLButtonElement {
  const naLista = jogo.estado !== "fora";
  const botao = criarBotao(
    naLista ? "Na sua lista" : "Adicionar à minha lista",
    naLista ? "button button-secondary" : "button button-primary",
    (evento: MouseEvent): void => {
      evento.stopPropagation();
      aoAdicionar(jogo);
    },
  );
  botao.disabled = naLista;
  return botao;
}

// Cria a capa do jogo.
function criarCapa(jogo: Jogo, classe: string): HTMLElement {
  const capa = criar("div", `cover ${classe}`);
  if (jogo.capa) {
    const imagem = document.createElement("img");
    imagem.src = jogo.capa;
    imagem.alt = `Capa de ${jogo.titulo}`;
    imagem.addEventListener("error", (): void => imagem.remove());
    capa.append(imagem);
  }
  return capa;
}

// Formata preços em reais.
function formatarPreco(preco: number): string {
  return preco.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

// Cria os metadados de preço e categoria.
function criarMeta(jogo: Jogo): HTMLElement {
  const meta = criar("div", "card-meta");
  meta.append(
    criar("span", "badge", formatarPreco(jogo.preco)),
    criar("span", "badge", jogo.categoria),
  );
  return meta;
}

// Cria o card clicável do catálogo.
function criarCardCatalogo(
  jogo: Jogo,
  abrirDetalhes: (jogo: Jogo) => void,
  adicionar: (jogo: Jogo) => void,
): HTMLElement {
  const card = criar("article", "game-card catalog-card");
  const conteudo = criar("div", "card-content");
  conteudo.append(
    criar("p", "card-title", jogo.titulo),
    criarMeta(jogo),
    criarBotaoAdicionar(jogo, adicionar),
  );
  card.append(criarCapa(jogo, "card-cover"), conteudo);
  card.addEventListener("click", (): void => abrirDetalhes(jogo));
  return card;
}

// Cria os controles de estado, edição e remoção da lista.
function criarCardLista(
  jogo: Jogo,
  mudar: (jogo: Jogo, estado: EstadoJogo) => void,
  remover: (jogo: Jogo) => void,
  editar: (jogo: Jogo) => void,
): HTMLElement {
  const card = criar("article", "game-card");
  const conteudo = criar("div", "card-content");
  const dadosPessoais: string[] = [];
  if (jogo.nota !== undefined) dadosPessoais.push(`Nota: ${jogo.nota}/5`);
  if (jogo.precoPago !== undefined) {
    dadosPessoais.push(`Pago: ${formatarPreco(jogo.precoPago)}`);
  }
  if (jogo.loja) dadosPessoais.push(`Loja: ${jogo.loja}`);

  const seletor = document.createElement("select");
  seletor.setAttribute("aria-label", `Estado de ${jogo.titulo}`);
  estadosLista.forEach((estado: EstadoJogo): void => {
    seletor.append(
      new Option(nomesEstado[estado], estado, false, estado === jogo.estado),
    );
  });
  seletor.addEventListener("change", (): void =>
    mudar(jogo, seletor.value as EstadoJogo),
  );

  const acoes = criar("div", "card-actions");
  acoes.append(
    seletor,
    criarBotao("Editar detalhes", "button button-secondary", (): void =>
      editar(jogo),
    ),
    criarBotao("Remover da lista", "button button-secondary", (): void =>
      remover(jogo),
    ),
  );
  conteudo.append(criar("p", "card-title", jogo.titulo), criarMeta(jogo));
  if (dadosPessoais.length) {
    conteudo.append(criar("p", "personal-details", dadosPessoais.join(" · ")));
  }
  conteudo.append(acoes);
  card.append(criarCapa(jogo, "card-cover"), conteudo);
  return card;
}

// Mostra uma mensagem simples quando uma grade não tem cards.
function criarEstadoVazio(mensagem: string): HTMLElement {
  const bloco = criar("div", "empty-state");
  bloco.append(criar("p", "", mensagem));
  return bloco;
}

// Cria um item do resumo da lista.
function criarChip(rotulo: string, quantidade: number): HTMLElement {
  const chip = criar("div", "summary-chip");
  chip.append(
    criar("span", "", rotulo),
    criar("strong", "", String(quantidade)),
  );
  return chip;
}

// Atualiza os cards do catálogo e diferencia catálogo vazio de busca sem resultados.
export function renderizarCatalogo(
  jogos: Jogo[],
  total: number,
  abrirDetalhes: (jogo: Jogo) => void,
  adicionar: (jogo: Jogo) => void,
): void {
  gradeCatalogo.replaceChildren();
  if (total === 0) {
    gradeCatalogo.append(
      criarEstadoVazio("Catálogo vazio. Cadastre o primeiro jogo."),
    );
  } else if (jogos.length === 0) {
    gradeCatalogo.append(
      criarEstadoVazio(
        "Nenhum resultado encontrado. Tente outro título ou ajuste a categoria.",
      ),
    );
  } else {
    jogos.forEach((jogo: Jogo): void =>
      gradeCatalogo.append(criarCardCatalogo(jogo, abrirDetalhes, adicionar)),
    );
  }
}

// Atualiza o resumo e os cards da lista pessoal.
export function renderizarLista(
  todosJogos: Jogo[],
  mudar: (jogo: Jogo, estado: EstadoJogo) => void,
  remover: (jogo: Jogo) => void,
  editar: (jogo: Jogo) => void,
): void {
  const lista = jogosDaLista(todosJogos);
  resumoLista.replaceChildren(
    criarChip("Total na lista", lista.length),
    ...estadosLista.map(
      (estado: EstadoJogo): HTMLElement =>
        criarChip(nomesEstado[estado], contarPorEstado(todosJogos, estado)),
    ),
  );
  gradeLista.replaceChildren();
  if (lista.length === 0) {
    gradeLista.append(
      criarEstadoVazio(
        "Sua lista está vazia. Adicione jogos pelo painel de detalhes.",
      ),
    );
  } else {
    lista.forEach((jogo: Jogo): void =>
      gradeLista.append(criarCardLista(jogo, mudar, remover, editar)),
    );
  }
}

// Cria os botões de ação dos detalhes.
function criarAcoesDetalhes(
  jogo: Jogo,
  adicionar: (jogo: Jogo) => void,
  excluir: (jogo: Jogo) => void,
): HTMLElement {
  const acoes = criar("div", "details-actions");
  acoes.append(
    criarBotaoAdicionar(jogo, adicionar),
    criarBotao("Excluir jogo", "button button-danger", (): void =>
      excluir(jogo),
    ),
  );
  return acoes;
}

// Cria a lista de comentários do jogo.
function criarComentarios(jogo: Jogo): HTMLElement {
  const lista = criar("div", "comments-list");
  if (jogo.comentarios.length === 0) {
    lista.append(criar("p", "empty-comments", "Ainda não há comentários"));
  } else {
    jogo.comentarios.forEach((comentario): void => {
      const item = criar("article", "comment");
      item.append(
        criar(
          "p",
          "comment-heading",
          `${comentario.autor} · ${comentario.data}`,
        ),
        criar("p", "", comentario.texto),
      );
      lista.append(item);
    });
  }
  return lista;
}

// Mostra detalhes, ações e comentários do jogo.
export function renderizarDetalhes(
  jogo: Jogo,
  adicionar: (jogo: Jogo) => void,
  excluir: (jogo: Jogo) => void,
): void {
  conteudoDetalhes.replaceChildren();
  conteudoDetalhes.append(
    criarCapa(jogo, "details-cover"),
    criar(
      "p",
      "eyebrow",
      `${jogo.categoria.toUpperCase()} · ${formatarPreco(jogo.preco)}`,
    ),
    Object.assign(document.createElement("h2"), {
      id: "detalhe-titulo",
      textContent: jogo.titulo,
    }),
    criar(
      "p",
      "details-description",
      jogo.descricao || "Nenhuma descrição foi adicionada para este jogo.",
    ),
    criarAcoesDetalhes(jogo, adicionar, excluir),
    criar("h3", "comments-title", "Comentários da comunidade"),
    criarComentarios(jogo),
  );
}
