import { jogos } from "./dados.js";
import { adicionarJogo, excluirJogo, filtrarJogos, mudarEstado, salvarDetalhes, validarJogo, validarPreco, } from "./logica.js";
import { obterElemento, renderizarCatalogo, renderizarDetalhes, renderizarLista, } from "./ui.js";
const modalDetalhes = obterElemento("modal-detalhes");
const modalCadastro = obterElemento("modal-cadastro");
const modalEdicao = obterElemento("modal-edicao");
const campoBusca = obterElemento("busca");
const filtroCategoria = obterElemento("filtro-categoria");
const navCatalogo = obterElemento("nav-catalogo");
const navLista = obterElemento("nav-lista");
const abrirCadastro = obterElemento("abrir-cadastro");
const formJogo = obterElemento("form-jogo");
const formEdicao = obterElemento("form-edicao");
const erroCadastro = obterElemento("erro-cadastro");
const erroEdicao = obterElemento("erro-edicao");
const tituloModalEdicao = obterElemento("titulo-modal-edicao");
const campoTitulo = obterElemento("campo-titulo");
const campoCategoria = obterElemento("campo-categoria");
const campoPreco = obterElemento("campo-preco");
const campoCapa = obterElemento("campo-capa");
const campoDescricao = obterElemento("campo-descricao");
const campoEstado = obterElemento("campo-estado");
const campoNota = obterElemento("campo-nota");
const campoPrecoPago = obterElemento("campo-preco-pago");
const campoLoja = obterElemento("campo-loja");
const campoComentario = obterElemento("campo-comentario");
const telaCatalogo = obterElemento("tela-catalogo");
const telaLista = obterElemento("tela-lista");
let jogoEmEdicao = null;
// Atualiza as duas grades usando os dados atuais.
function atualizarTelas() {
    renderizarCatalogo(filtrarJogos(jogos, campoBusca.value, filtroCategoria.value), jogos.length, abrirDetalhes, adicionarNaLista);
    renderizarLista(jogos, atualizarEstado, removerDaLista, abrirEdicao);
}
// Mostra o painel de detalhes do jogo.
function abrirDetalhes(jogo) {
    renderizarDetalhes(jogo, adicionarNaLista, confirmarExclusao);
    modalDetalhes.hidden = false;
}
// Adiciona o jogo à lista.
function adicionarNaLista(jogo) {
    mudarEstado(jogo, "quero-jogar");
    modalDetalhes.hidden = true;
    atualizarTelas();
}
// Exclui do catálogo somente após confirmação.
function confirmarExclusao(jogo) {
    if (!window.confirm("Tem certeza de que deseja excluir este jogo do catálogo?"))
        return;
    excluirJogo(jogos, jogo);
    modalDetalhes.hidden = true;
    atualizarTelas();
}
// Atualiza o estado escolhido no card.
function atualizarEstado(jogo, estado) {
    mudarEstado(jogo, estado);
    atualizarTelas();
}
// Remove da lista sem excluir o jogo ou os comentários.
function removerDaLista(jogo) {
    mudarEstado(jogo, "fora");
    atualizarTelas();
}
// Abre o modal de edição para o jogo selecionado.
function abrirEdicao(jogo) {
    jogoEmEdicao = jogo;
    erroEdicao.textContent = "";
    tituloModalEdicao.textContent = `Editar detalhes: ${jogo.titulo}`;
    preencherFormularioDetalhes(jogo);
    modalEdicao.hidden = false;
}
// Preenche os dados pessoais atuais no modal de edição.
function preencherFormularioDetalhes(jogo) {
    campoNota.value = jogo.nota === undefined ? "" : String(jogo.nota);
    campoPrecoPago.value =
        jogo.precoPago === undefined ? "" : String(jogo.precoPago);
    campoLoja.value = jogo.loja ?? "";
    campoComentario.value = "";
}
// Valida e cadastra os campos do formulário.
function cadastrarJogo(evento) {
    evento.preventDefault();
    const titulo = campoTitulo.value;
    const categoria = campoCategoria.value;
    const precoTexto = campoPreco.value;
    const erro = validarJogo(titulo, categoria, precoTexto);
    erroCadastro.textContent = erro;
    if (erro)
        return;
    adicionarJogo(jogos, {
        titulo: titulo.trim(),
        categoria,
        preco: Number(precoTexto),
        capa: campoCapa.value.trim(),
        descricao: campoDescricao.value.trim(),
        estado: campoEstado.value,
    });
    formJogo.reset();
    modalCadastro.hidden = true;
    atualizarTelas();
}
// Valida e salva os dados pessoais do jogo em edição.
function salvarEdicao(evento) {
    evento.preventDefault();
    if (!jogoEmEdicao)
        return;
    const notaTexto = campoNota.value;
    const precoTexto = campoPrecoPago.value;
    const erro = precoTexto.trim() ? validarPreco(precoTexto) : "";
    erroEdicao.textContent = erro;
    if (erro)
        return;
    salvarDetalhes(jogoEmEdicao, notaTexto ? Number(notaTexto) : undefined, precoTexto.trim() ? Number(precoTexto) : undefined, campoLoja.value, campoComentario.value);
    modalEdicao.hidden = true;
    atualizarTelas();
}
// Mostra uma tela e esconde a outra.
function trocarTela(tela) {
    const catalogo = tela === "catalogo";
    telaCatalogo.hidden = !catalogo;
    telaLista.hidden = catalogo;
    navCatalogo.classList.toggle("active", catalogo);
    navLista.classList.toggle("active", !catalogo);
}
// Fecha todos os modais.
function configurarModais() {
    const modais = document.querySelectorAll(".modal-layer");
    modais.forEach((modal) => {
        modal.addEventListener("click", (evento) => {
            if (evento.target === evento.currentTarget)
                modal.hidden = true;
        });
    });
    document
        .querySelectorAll(".close-modal")
        .forEach((botao) => {
        botao.addEventListener("click", () => {
            const modal = botao.closest(".modal-layer");
            if (modal)
                modal.hidden = true;
        });
    });
    document.addEventListener("keydown", (evento) => {
        if (evento.key === "Escape") {
            modais.forEach((modal) => {
                modal.hidden = true;
            });
        }
    });
}
// Liga eventos e prepara a primeira exibição.
function iniciarAplicacao() {
    campoBusca.addEventListener("input", atualizarTelas);
    filtroCategoria.addEventListener("change", atualizarTelas);
    navCatalogo.addEventListener("click", () => trocarTela("catalogo"));
    navLista.addEventListener("click", () => trocarTela("lista"));
    abrirCadastro.addEventListener("click", () => {
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
