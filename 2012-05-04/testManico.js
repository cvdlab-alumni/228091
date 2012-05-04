console.log('test');

var load = function (id, n) {
  var url = "https://raw.github.com/cvdlab-cg/" + id 
    + "/master/2012-05-04/exercise" + n + ".js";

  var script = document.createElement('script');
  script.src = url;
  document.body.appendChild(script);

  return url;
};

// Esercitazione 04/05/2012
/*
	Tecnica transfinita, curve -> superfici
						 superfici -> solidi

	Esempio: due curve e uno spazio di vettori di vettori costanti, li diamo in pasto ad hermite
*/

// Curva con hermite simile ad arco di crf

var domain1 = INTERVALS(1)(1080);
var domain2 = DOMAIN([[0,1],[0,1]])([30,50]);


// p0, p1, t0, t1
var controlpoints1 = [[1,0,0],[0,1,0],[0,2,0],[-2,0,0]];
var c1 = CUBIC_HERMITE(S0)(controlpoints1); // La curva 1/4 di circonferenza!!! (un array di funzioni)
var curve1 = MAP(c1)(domain1); // L'immagine della curva
DRAW(COLOR([1,0,0])(curve1));
//DRAW(curve1);


var controlpoints2 = [[2,0,0],[0,2,0],[0,3,0],[-3,0,0]];
var c2 = CUBIC_HERMITE(S0)(controlpoints2); // La curva 1/4 di circonferenza esterna alla prima (un array di funzioni)
var curve2 = MAP(c2)(domain1); // L'immagine della curva
//DRAW(COLOR([0,1,0])curve2);

// Generiamo una superficie piana
// Usiamo queste due  curve dentro bezier per generare una superficie piena
// Bezier transfinito

var s12 = BEZIER(S1)([c1,c2]); // manici controllo sono le CURVE!!!!! // questa produceva prima [x(u,v), y(u,v)] 
var surface12 = MAP(s12)(domain2);
//DRAW(COLOR([0.1,0.2,0.3,0.3])(surface12));
// DRAW(SKELETON(1)(surface12));

// Adesso bisogna andare in 3d quindi nelle curve precedenti aggiungiamo una coordinata, 
// per ottenere la funzione profilo 3d la coordinata finta sara' ,0

// Adesso costruiamo la superficie con cubic hermite (usiamo l'insieme di curve e i campi vettoriali) (mescola transfinita ovvero funzione invece di punti)
var sh12 = CUBIC_HERMITE(S1)([c1,c2,[0,0,3],[0,0,-3]]); // ovviamente il segno indica il verso della tangente su cui arrivo al corrispettivo manico di controllo
var surfaceh12 = MAP(sh12)(domain2);
//DRAW(COLOR([0.1,0.2,0.3])(surfaceh12));
