const player1 = "X";
const player2 = "O";
var playTime = player1;
var gameOver = false;
var images = new Array();

var sequence = [];
var actualRound = 0;
var seqPos = 0;
var gameOver = false;
var numVitA = 0;
var numVitB=  0;



preloadImages("imagens/x.png", "imagens/o.png")
atualizaMostrador();
inicializarEspacos();

function preloadImages() {
	for (i = 0; i < preloadImages.arguments.length; i++) {
		images[i] = new Image()
		images[i].src = preloadImages.arguments[i]
	}
}



function atualizaMostrador() {

	if (gameOver) {
	}

	if (playTime == player1) {

		var player = document.querySelectorAll("div#mostrador img")[0];
		player.setAttribute("src", images[0].src);
	} else {

		var player = document.querySelectorAll("div#mostrador img")[0];
		player.setAttribute("src", images[1].src);
	}
}

function resetaMostrador() {
	var espacos = document.getElementsByClassName("espaco");
	for (var i = 0; i < espacos.length; i++) {

		espacos[i].innerHTML = "<img id='p1' src='" + images[0].src + "' border='0'><img id='p2' src='" + images[1].src + "' border='0'>";
		espacos[i].getElementsByTagName('img')[0].style.display = "none";
		espacos[i].getElementsByTagName('img')[1].style.display = "none";
		if(espacos[i].getAttribute("jogada")!= ""){
			espacos[i].setAttribute("jogada", "")
		}
	}
	
	playTime = player1;
	
	atualizaMostrador();

}

function inicializarEspacos() {

	var espacos = document.getElementsByClassName("espaco");
	for (var i = 0; i < espacos.length; i++) {

		espacos[i].innerHTML = "<img id='p1' src='" + images[0].src + "' border='0'><img id='p2' src='" + images[1].src + "' border='0'>";
		espacos[i].getElementsByTagName('img')[0].style.display = "none";
		espacos[i].getElementsByTagName('img')[1].style.display = "none";

		espacos[i].addEventListener("click", function () {

			if (gameOver) { return; }



			if (this.getAttribute("jogada") == "") {

				if (playTime == player1) {
					this.getElementsByTagName('img')[0].style.display = "inline";
					//this.innerHTML = "<img src='"+images[0].src+"' border='0'>";
					this.setAttribute("jogada", player1);
					playTime = player2;

				} else {
					this.getElementsByTagName('img')[1].style.display = "inline";
					//this.innerHTML = "<img src='"+images[1].src+"' border='0'>";
					this.setAttribute("jogada", player2);
					playTime = player1;
				}
				atualizaMostrador();
				verificarVencedor();

			}

		});
	}
}

async function verificarVencedor() {


	var a1 = document.getElementById("a1").getAttribute("jogada");
	var a2 = document.getElementById("a2").getAttribute("jogada");
	var a3 = document.getElementById("a3").getAttribute("jogada");

	var b1 = document.getElementById("b1").getAttribute("jogada");
	var b2 = document.getElementById("b2").getAttribute("jogada");
	var b3 = document.getElementById("b3").getAttribute("jogada");

	var c1 = document.getElementById("c1").getAttribute("jogada");
	var c2 = document.getElementById("c2").getAttribute("jogada");
	var c3 = document.getElementById("c3").getAttribute("jogada");


	var vencedor = "";

	if (((a1 == b1 && a1 == c1) || (a1 == a2 && a1 == a3) || (a1 == b2 && a1 == c3)) && a1 != "") {
		vencedor = a1;
	} else if ((b2 == b1 && b2 == b3 && b2 != "") || (b2 == a2 && b2 == c2 && b2 != "") || (b2 == a3 && b2 == c1 && b2 != "")) {
		vencedor = b2;
	} else if (((c3 == c2 && c3 == c1) || (c3 == a3 && c3 == b3)) && c3 != "") {
		vencedor = c3;
	}

	if (vencedor != "") {
		gameOver = true;
		if(vencedor == player1){
			numVitA++;
			document.getElementById("contador1").innerHTML = numVitA;
		}
		else if(vencedor == player2){
			numVitB++;
			document.getElementById("contador2").innerHTML = numVitB;
		}
		if(numVitA == 3){
			alert("O ganhador foi o: '" + "Jogador 1" + "'");
			numVitA = 0;
			numVitB = 0;
			document.getElementById("contador1").innerHTML = numVitA;
			document.getElementById("contador2").innerHTML = numVitB;
			resetaMostrador();
		}
		else if(numVitB == 3){
			alert("O ganhador foi o: '" + "Jogador 2" + "'");
			numVitA = 0;
			numVitB = 0;
			document.getElementById("contador1").innerHTML = numVitA;
			document.getElementById("contador2").innerHTML = numVitB;
			resetaMostrador();
		}
		vencedor = "";
			
		resetaMostrador();
		gameOver = false;
	}

}

function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));

}






















