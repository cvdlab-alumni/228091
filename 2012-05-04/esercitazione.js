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


// Un semplice profilo alare
// Usiamo bezier per definire un poligono chiuso di controllo q1....q5 con q1 coincidente su q5
var domain1 = INTERVALS(1)(1080);
var domain2 = DOMAIN([[0,1],[0,1]])([30,50]);


var wingcontrol = [[10,0,0],[0,5,0],[0,-3,0],[5,2,0],[10,0,0]];
var wingbezier = BEZIER(S0)(wingcontrol);
var wingimage = MAP(wingbezier)(domain1);
// DRAW(wingimage);

// T,S,R trasformazioni affini si applica solo su somplessi simpliciale
var POLYPOINT = function(points) {
	var listaDfacce = [];
	points.forEach( function(v,i) { listaDfacce.push([i]); } );
	// AA(LIST)(points) ????
	return SIMPLICIAL_COMPLEX(points)(listaDfacce);
};

// 
var p1 = POLYPOINT(wingcontrol);
var trans = T([2])([10]);
var manyp1 = STRUCT([p1,trans,p1,trans,p1,trans,p1]);
//DRAW(manyp1);

// Super profilo alare

var domain1 = INTERVALS(1)(1080);
var domain2 = DOMAIN([[0,1],[0,1]])([30,50]);

var pT0 = [[10,0,0],[0,5,0],[0,-3,0],[5,2,0],[10,0,0]]
var pT1 = pT0.map(function(v) { return [v[0], v[1], v[2] + 10]; } );
var pT2 = pT1.map(function(v) { return [v[0], v[1], v[2] + 10]; } );
var pT3 = pT2.map(function(v) { return [v[0], v[1], v[2] + 10]; } );
var pT4 = pT3.map(function(v) { return [v[0], v[1], v[2] + 10]; } );

var cpT0 = BEZIER(S0)(pT0);
var cpT1 = BEZIER(S0)(pT1);
var cpT2 = BEZIER(S0)(pT2);
var cpT3 = BEZIER(S0)(pT3);
var cpT4 = BEZIER(S0)(pT4);

// Applica all'array di curve di bezier la funzione MAP => AA(f)([...])
// Applica il dominio alla sequenza di [MAP(x),MAP(y), ....] => CONS([seq])(domain)
// Poi struct
var curvepTN = STRUCT(CONS(AA(MAP)([cpT0,cpT1,cpT2,cpT3,cpT4]))(domain1));
//DRAW(curvepTN);

// Adesso modelliamo superficie sulle bezier
var surfWing = BEZIER(S1)([cpT0,cpT1,cpT2,cpT3,cpT4]);
var surfImage = MAP(surfWing)(domain2);
//DRAW(COLOR([0.1,0.2,0.3,0.4])(surfImage));


// Curva NUBS , implementazione transfinita (S*)(grado)
// grado = 2... passa per punti medi dei segmenti del poligono di controllo (per tangenza)
var domain = INTERVALS(1)(20);
var controls = [[0,0],[-1,2],[1,4],[2,3],[1,1],[1,2],[2.5,1],[2.5,3],[4,4],[5,0]];
// nodi = punti + grado + 1
var nubs = NUBS(S0)(3)([0,0,0,0,1,2,3,4,5,6,7,7,0,1,2,3,4,5,6,7,77,7])(controls);
var model = MAP(nubs)(domain);
DRAW(model);

// per interpolare punto iniziale e nodo finale devono essere triplicati i nodi relativi

var domain = INTERVALS(1)(20);
var domain2 = DOMAIN([[0,1],[0,1]])([30,50]);

var controls = [[0,0,0],[2,5,0],[7,3,0],[9,7,0],[12,2,0]];
// nodi = punti + grado + 1
var c1 = NUBS(S0)(2)([0,0,0,1,2,3,3,3])(controls);
var model1 = MAP(c1)(domain);
//DRAW(model1);

var controls2 = [[0,0,0],[2,5,3],[7,3,6],[9,7,-2],[12,2,-3]];
// nodi = punti + grado + 1
var c2 = NUBS(S0)(2)([0,0,0,1,2,3,3,3])(controls2);
var model2 = MAP(c2)(domain);
//DRAW(model2);

// superficie
var s1 = BEZIER(S1)([c1,c2]);
var sMap = MAP(s1)(domain2);
//DRAW(COLOR([0.1,0.2,0.1,0.5])(sMap));