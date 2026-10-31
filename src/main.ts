import { jogos } from "./dados.js";
import {
  adicionarJogo,
  excluirJogo,
  filtrarJogos,
  mudarEstado,
  salvarDetalhes,
  validarJogo,
  validarPreco,
} from "./logica.js";
import {
  obterElemento,
  renderizarCatalogo,
  renderizarDetalhes,
  renderizarLista,
} from "./ui.js";
import type { EstadoJogo, Jogo } from "./types.js";

const modalDetalhes = obterElemento<HTMLDivElement>("modal-detalhes");
const modalCadastro = obterElemento<HTMLDivElement>("modal-cadastro");
const modalEdicao = obterElemento<HTMLDivElement>("modal-edicao");
const campoBusca = obterElemento<HTMLInputElement>("busca");
const filtroCategoria = obterElemento<HTMLSelectElement>("filtro-categoria");
const navCatalogo = obterElemento<HTMLButtonElement>("nav-catalogo");
const navLista = obterElemento<HTMLButtonElement>("nav-lista");
const abrirCadastro = obterElemento<HTMLButtonElement>("abrir-cadastro");
const formJogo = obterElemento<HTMLFormElement>("form-jogo");
const formEdicao = obterElemento<HTMLFormElement>("form-edicao");
const erroCadastro = obterElemento("erro-cadastro");
const erroEdicao = obterElemento("erro-edicao");
const tituloModalEdicao = obterElemento<HTMLHeadingElement>("titulo-modal-edicao");
const campoTitulo = obterElemento<HTMLInputElement>("campo-titulo");
const campoCategoria = obterElemento<HTMLSelectElement>("campo-categoria");
const campoPreco = obterElemento<HTMLInputElement>("campo-preco");
const campoCapa = obterElemento<HTMLInputElement>("campo-capa");
const campoDescricao = obterElemento<HTMLTextAreaElement>("campo-descricao");
const campoEstado = obterElemento<HTMLSelectElement>("campo-estado");
const campoNota = obterElemento<HTMLSelectElement>("campo-nota");
const campoPrecoPago = obterElemento<HTMLInputElement>("campo-preco-pago");
const campoLoja = obterElemento<HTMLSelectElement>("campo-loja");
const campoComentario = obterElemento<HTMLTextAreaElement>("campo-comentario");
const telaCatalogo = obterElemento("tela-catalogo");
const telaLista = obterElemento("tela-lista");

let jogoEmEdicao: Jogo | null = null;

// Atualiza as duas grades usando os dados atuais.
function atualizarTelas(): void {
  renderizarCatalogo(
    filtrarJogos(jogos, campoBusca.value, filtroCategoria.value),
    jogos.length,
    abrirDetalhes,
    adicionarNaLista,
  );
  renderizarLista(jogos, atualizarEstado, removerDaLista, abrirEdicao);
}

// Mostra o painel de detalhes do jogo.
function abrirDetalhes(jogo: Jogo): void {
  renderizarDetalhes(jogo, adicionarNaLista, confirmarExclusao);
  modalDetalhes.hidden = false;
}

// Adiciona o jogo à lista.
function adicionarNaLista(jogo: Jogo): void {
  mudarEstado(jogo, "quero-jogar");
  modalDetalhes.hidden = true;
  atualizarTelas();
}

// Exclui do catálogo somente após confirmação.
function confirmarExclusao(jogo: Jogo): void {
  if (
    !window.confirm("Tem certeza de que deseja excluir este jogo do catálogo?")
  )
    return;
  excluirJogo(jogos, jogo);
  modalDetalhes.hidden = true;
  atualizarTelas();
}

// Atualiza o estado escolhido no card.
function atualizarEstado(jogo: Jogo, estado: EstadoJogo): void {
  mudarEstado(jogo, estado);
  atualizarTelas();
}

// Remove da lista sem excluir o jogo ou os comentários.
function removerDaLista(jogo: Jogo): void {
  mudarEstado(jogo, "fora");
  atualizarTelas();
}

// Abre o modal de edição para o jogo selecionado.
function abrirEdicao(jogo: Jogo): void {
  jogoEmEdicao = jogo;
  erroEdicao.textContent = "";
  tituloModalEdicao.textContent = `Editar detalhes: ${jogo.titulo}`;
  preencherFormularioDetalhes(jogo);
  modalEdicao.hidden = false;
}

// Preenche os dados pessoais atuais no modal de edição.
function preencherFormularioDetalhes(jogo: Jogo): void {
  campoNota.value = jogo.nota === undefined ? "" : String(jogo.nota);
  campoPrecoPago.value =
    jogo.precoPago === undefined ? "" : String(jogo.precoPago);
  campoLoja.value = jogo.loja ?? "";
  campoComentario.value = "";
}

// Valida e cadastra os campos do formulário.
function cadastrarJogo(evento: SubmitEvent): void {
  evento.preventDefault();
  const titulo = campoTitulo.value;
  const categoria = campoCategoria.value;
  const precoTexto = campoPreco.value;
  const erro = validarJogo(titulo, categoria, precoTexto);
  erroCadastro.textContent = erro;
  if (erro) return;

  adicionarJogo(jogos, {
    titulo: titulo.trim(),
    categoria,
    preco: Number(precoTexto),
    capa: campoCapa.value.trim(),
    descricao: campoDescricao.value.trim(),
    estado: campoEstado.value as EstadoJogo,
  });
  formJogo.reset();
  modalCadastro.hidden = true;
  atualizarTelas();
}

// Valida e salva os dados pessoais do jogo em edição.
function salvarEdicao(evento: SubmitEvent): void {
  evento.preventDefault();
  if (!jogoEmEdicao) return;

  const notaTexto = campoNota.value;
  const precoTexto = campoPrecoPago.value;
  const erro = precoTexto.trim() ? validarPreco(precoTexto) : "";
  erroEdicao.textContent = erro;
  if (erro) return;

  salvarDetalhes(
    jogoEmEdicao,
    notaTexto ? Number(notaTexto) : undefined,
    precoTexto.trim() ? Number(precoTexto) : undefined,
    campoLoja.value,
    campoComentario.value,
  );
  modalEdicao.hidden = true;
  atualizarTelas();
}

// Mostra uma tela e esconde a outra.
function trocarTela(tela: "catalogo" | "lista"): void {
  const catalogo = tela === "catalogo";
  telaCatalogo.hidden = !catalogo;
  telaLista.hidden = catalogo;
  navCatalogo.classList.toggle("active", catalogo);
  navLista.classList.toggle("active", !catalogo);
}

// Fecha todos os modais.
function configurarModais(): void {
  const modais = document.querySelectorAll<HTMLElement>(".modal-layer");
  modais.forEach((modal: HTMLElement): void => {
    modal.addEventListener("click", (evento: MouseEvent): void => {
    if (evento.target === evento.currentTarget) modal.hidden = true;
    });
  });
  document
    .querySelectorAll<HTMLElement>(".close-modal")
    .forEach((botao: HTMLElement): void => {
    botao.addEventListener("click", (): void => {
      const modal = botao.closest<HTMLElement>(".modal-layer");
      if (modal) modal.hidden = true;
    });
    });
  document.addEventListener("keydown", (evento: KeyboardEvent): void => {
    if (evento.key === "Escape") {
    modais.forEach((modal: HTMLElement): void => {
      modal.hidden = true;
    });
    }
  });
}

// Liga eventos e prepara a primeira exibição.
function iniciarAplicacao(): void {
  campoBusca.addEventListener("input", atualizarTelas);
  filtroCategoria.addEventListener("change", atualizarTelas);
  navCatalogo.addEventListener("click", (): void => trocarTela("catalogo"));
  navLista.addEventListener("click", (): void => trocarTela("lista"));
  abrirCadastro.addEventListener("click", (): void => {
    erroCadastro.textContent = "";
    modalCadastro.hidden = false;
    campoTitulo.focus();
  });
  formJogo.addEventListener("submit", cadastrarJogo);
  formEdicao.addEventListener("submit", salvarEdicao);
  configurarModais();
  atualizarTelas();
}

iniciarAplicacao();
