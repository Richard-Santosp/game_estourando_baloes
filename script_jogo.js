var timerId = null; //Variavel que armazena a chamada da função timeOut
//função de inicialização do game
function inicia_jogo(){
    //Resgatando a informação do nivel escolhido na pagina index
    var url = window.location.search;
    var nivel_jogo = url.replace("?", "")

    var tempo_segundos = 0;
    var qtde_baloes = 80;
    
    //Estabelecendo o tempo conforme a dificuldade escolhida
    switch(nivel_jogo){
        case '1':
            tempo_segundos = 120;
            break
        case '2':
            tempo_segundos = 60;
            break
        case '3':
            tempo_segundos = 30;
            break
    }
    //definição do tempo no cronometro do jogo
    document.getElementById('cronometro').innerHTML = tempo_segundos;

    var qtde_baloes = 80;
    cria_baloes(qtde_baloes);

    //imprimindo a quandidade de balões inteiros e estourados
    document.getElementById('baloes_inteiros').innerHTML = qtde_baloes;
    document.getElementById('baloes_estourados').innerHTML = 0;

    contagem_tempo(tempo_segundos)
}

function cria_baloes(qtde_baloes){
    //imprimindo a quantidade de balões de forma dinamica
    for(var i = 1; i <= qtde_baloes; i++){
        var balao = document.createElement("img");
        balao.src = "imagens/balao_azul_pequeno.png";
        balao.style.margin = '12px'
        balao.onclick = function(){estourar(this)}
        balao.id = 'b'+i;

        document.getElementById('cenario').appendChild(balao);
    }
}
function estourar(e){
    //Atribuindo a função de estourar o balão com o click, e chamar a função para alterar a pontuação
    var id_balao = e.id;
    document.getElementById(id_balao).setAttribute("onclick","")
    document.getElementById(id_balao).src = "imagens/balao_azul_pequeno_estourado.png"
    pontuacao(-1);
}

function contagem_tempo(segundos){
    //Contagem regressiva do cronometro
    document.getElementById('cronometro').innerHTML = segundos;
    segundos = segundos - 1;
    if(segundos == -1){
        clearTimeout(timerId);
        game_over()
        return false
    }
    timerId = setTimeout("contagem_tempo("+segundos+")",1000);    
}
function game_over(){
    //
    alert("Game over - Você não conseguiu estourar todos os balões a tempo")
}

function pontuacao(acao){
    //alterando a pontuação ao estourar o balão e verificando se todos os balões ja foram estourados
    var baloes_inteiros  = document.getElementById("baloes_inteiros").innerHTML;
    var baloes_estourados = document.getElementById("baloes_estourados").innerHTML;

    baloes_inteiros = parseInt(baloes_inteiros);
    baloes_estourados = parseInt(baloes_estourados);

    baloes_inteiros = baloes_inteiros + acao;
    baloes_estourados = baloes_estourados - acao;

    document.getElementById("baloes_inteiros").innerHTML = baloes_inteiros;
    document.getElementById("baloes_estourados").innerHTML = baloes_estourados;

    situacao_jogo(baloes_inteiros);
}

function situacao_jogo(baloes_inteiros){
    //condicional de vitoria
    if (baloes_inteiros == 0){
        alert("Parabens vc conseguiu estourar todos os balões a tempo");
        parar_jogo();
    }
}
function parar_jogo(){
    //fim de jogo
    clearTimeout(timerId);
}