console.log('test');

var load = function (id, n) {
  var url = "https://raw.github.com/cvdlab-cg/" + id 
    + "/master/2012-04-03/exercise" + n + ".js";

  var script = document.createElement('script');
  script.src = url;
  document.body.appendChild(script);

  return url;
};
var domain = INTERVALS(1)(20);
//prima coppia di punti = coordinate intervallo seconda vettore applicato 
var controls = [[0,0], [0,1], [1,-1], [1,-1]];//sinusoide 
var curve1 = MAP(CUBIC_HERMITE(S0)(controls))(domain);
DRAW(curve1);
//esempi preso da plasm.js
//var domain = INTERVALS(1)(20);
var controlpoints = [[1,0], [1,1], [1,1], [1,1]];//sinusoide inversa alla prima
var curveMapping = CUBIC_HERMITE(S0)(controlpoints);
var curve2 = MAP(curveMapping)(domain);
DRAW(curve2);
var domain1 = PROD1x1([INTERVALS(1)(14),INTERVALS(1)(14)]);
var c1 = CUBIC_HERMITE(S0)([[1,0,0],[0,1,0],[0,3,0],[-3,0,0]]);
var c2 = CUBIC_HERMITE(S0)([[0.5,0,0],[0,0.5,0],[0,1,0],[-1,0,0]]);
var sur3 = CUBIC_HERMITE(S1)([c1,c2,[1,1,1],[-1,-1,-1]]);
var out = MAP(sur3)(domain);
//DRAW(out);