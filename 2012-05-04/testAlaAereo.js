console.log('test');

var load = function (id, n) {
  var url = "https://raw.github.com/cvdlab-cg/" + id 
    + "/master/2012-05-04/exercise" + n + ".js";

  var script = document.createElement('script');
  script.src = url;
  document.body.appendChild(script);

  return url;
};
// Un semplice profilo alare
// Usiamo bezier per definire un poligono chiuso di controllo q1....q5 con q1 coincidente su q5
var domain1 = INTERVALS(1)(1080);
var domain2 = DOMAIN([[0,1],[0,1]])([30,50]);
//DRAW(domain2);

var wingcontrol = [[10,0,0],[0,5,0],[0,-3,0],[5,2,0],[10,0,0]];
var wingbezier = BEZIER(S0)(wingcontrol);
var wingimage = MAP(wingbezier)(domain1);
//DRAW(wingimage);
// T,S,R trasformazioni affini si applica solo su somplessi simpliciale
var POLYPOINT = function(points) {
	var listaDfacce = [];
	points.forEach( function(v,i) { listaDfacce.push([i]); } );
	// AA(LIST)(points) ritorna [[[10,0,0]],[[0,5,0]],[[0,-3,0]],[[5,2,0]],[[10,0,0]]]
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

var pT0 = [[10,0,0],[0,5,0],[0,-3,0],[5,2,0],[10,0,0]]//punti profilo ala
var pT1 = pT0.map(function(v) { return [v[0], v[1], v[2] + 10]; } );
var pT2 = pT1.map(function(v) { return [v[0], v[1], v[2] + 10]; } );
var pT3 = pT2.map(function(v) { return [v[0], v[1], v[2] + 10]; } );
var pT4 = pT3.map(function(v) { return [v[0], v[1], v[2] + 10]; } );

var cpT0 = BEZIER(S0)(pT0);//curve profilo ala
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


// Un casino in 3d
var domain1 = INTERVALS(1)(30);
var domain2 = DOMAIN([[0,1],[0,1]])([30,50]);
var domain3 = DOMAIN([[0,1],[0,1],[0,1]])([10,10,10]);

var pT0 = [[10,0,0],[0,5,0],[0,-3,0],[5,2,0],[10,0,0]]//punti profilo ala
var pT1 = pT0.map(function(v) { return [v[0], v[1], v[2] + 10]; } );
var pT2 = pT1.map(function(v) { return [v[0], v[1], v[2] + 10]; } );
var pT3 = pT2.map(function(v) { return [v[0] + 100, v[1] - 50, v[2] + 50]; } );
var pT4 = pT3.map(function(v) { return [v[0] + 100, v[1] - 50, v[2] + 50]; } );

var cpT0 = BEZIER(S0)(pT0);//curve profilo ala
var cpT1 = BEZIER(S0)(pT1);
var cpT2 = BEZIER(S0)(pT2);
var cpT3 = BEZIER(S0)(pT3);
var cpT4 = BEZIER(S0)(pT4);

var curvepTN = STRUCT(CONS(AA(MAP)([cpT0,cpT1,cpT2,cpT3,cpT4]))(domain1));
//DRAW(COLOR([1,0,0])(curvepTN));//disegna curve profilo ala

var cpS0 = BEZIER(S1)([cpT0,cpT1]);//disegna superfici profilo area
var cpS1 = BEZIER(S1)([cpT3,cpT4]);

var superTN = STRUCT(CONS(AA(MAP)([cpS0,cpS1]))(domain2));
//DRAW(COLOR([0,1,0,0.2])(superTN));

var solidB = BEZIER(S2)([cpS0,cpS1]);
var solidImage = MAP(solidB)(domain3);
DRAW(COLOR([0,0,1,0.5])(solidImage));