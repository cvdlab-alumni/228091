console.log('test');

var load = function (id, n) {
  var url = "https://raw.github.com/cvdlab-cg/" + id 
    + "/master/2012-05-04/exercise" + n + ".js";

  var script = document.createElement('script');
  script.src = url;
  document.body.appendChild(script);

  return url;
};

// Curva NUBS , implementazione transfinita (S*)(grado)
// grado = 2... passa per punti medi dei segmenti del poligono di controllo (per tangenza)
var domain = INTERVALS(1)(20);
var controls = [[0,0],[-1,2],[1,4],[2,3],[1,1],[1,2],[2.5,1],[2.5,3],[4,4],[5,0]];
// nodi = punti + grado + 1
var nubs = NUBS(S0)(3)([0,0,0,0,1,2,3,4,5,6,7,7,7,7])(controls);
var model = MAP(nubs)(domain);
//DRAW(model);

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

var s12 = BEZIER(S1)([c1,c2]);
var surf = MAP(s12)(domain2);
//DRAW(surf);
//NUBS esempi da plasm doc
var domain = INTERVALS(1)(20);
var controls = [[0,0],[-1,2],[1,4],[2,3],[1,1],[1,2],[2.5,1],[2.5,3],[4,4],[5,0]];
var nubs = NUBS(S0)(3)([0,0,0,0,1,2,3,4,5,6,7,7,7,7])(controls);
var model = MAP(nubs)(domain);
//DRAW(model);
var domain = INTERVALS(1)(20);
var controls = [[0,0], [0.35,0.6], [0.35,0.6], [0.35,0.6]];
var curve = MAP(CUBIC_HERMITE(S0)(controls))(domain);
DRAW(curve)