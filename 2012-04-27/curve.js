var up = STRUCT([
POLYLINE([[0,0],[9,0]]),
POLYLINE([[1,1],[4,1]]),
POLYLINE([[5,1],[8,1]]),
POLYLINE([[0,3],[1,3]]),
POLYLINE([[4,3],[5,3]]),
POLYLINE([[8,3],[9,3]]),

POLYLINE([[0,0],[0,3]]),
POLYLINE([[1,1],[1,3]]),
POLYLINE([[4,1],[4,3]]),
POLYLINE([[5,1],[5,3]]),
POLYLINE([[8,1],[8,3]]),
POLYLINE([[9,0],[9,3]]),
]);

// qui puoi scalare e traslare

var down = STRUCT([
POLYLINE([[0,7],[9,7]]),
POLYLINE([[1,6],[4,6]]),
POLYLINE([[5,6],[8,6]]),
POLYLINE([[0,4],[1,4]]),
POLYLINE([[4,4],[5,4]]),
POLYLINE([[8,4],[9,4]]),

POLYLINE([[0,4],[0,7]]),
POLYLINE([[1,4],[1,6]]),
POLYLINE([[4,4],[4,6]]),
POLYLINE([[5,4],[5,6]]),
POLYLINE([[8,4],[8,6]]),
POLYLINE([[9,4],[9,7]]),
]);


var lab3dUp = COLOR([0.2,0.1,0.2,1])(EXTRUDE([3])(up));
var lab3dDown = COLOR([0.2,0.1,0.2,1])(EXTRUDE([3])(down));
var lab = STRUCT([lab3dUp,lab3dDown]);

// Tetto con cuboid
var tetto = COLOR([1,0,0,0.5])(T([2])([3])(BOUNDARY(CUBOID([9,7,0.5]))));
var lab = STRUCT([lab,tetto]);


//
// CURVE
//

// ESERCIZIO 3
// interval in N pezzi
var domain = INTERVALS(1)(50);
// punti controllo (p0, p1, t0, t1)
var controlpoints = [[1,0],[1,1],[1,0],[1,1]];
// S0 x curve (prende la prima coordinate di ogni punto), punticontrollo, torna una funzione di mapping
var curveMapping = CUBIC_HERMITE(S0)(controlpoints);
// mappa curva su dominio
var curve = MAP(curveMapping)(domain);
// disegna
DRAW(curve);

// ESERCIZIO 4
// Quintica
var domain = INTERVALS(1)(50);
// Grado punti - 1 (solo punti no t)
var controlpoints = [[0,0],[1,2],[3,2],[3,0],[5,-1],[6,1]];
var curveMapping = BEZIER(S0)(controlpoints);
var curve = MAP(curveMapping)(domain);
DRAW(COLOR([0,1,1])(curve));
// poligono dei punti di cntrollo
DRAW(POLYLINE(controlpoints));

// ESERCIZIO 4z
// Quintica
var domain = INTERVALS(1)(50);
// Grado punti - 1 (solo punti no t)
var controlpoints = [[0,0,1],[1,2,2],[3,2,3],[3,0,4],[5,-1,5],[6,1,6]];
var curveMapping = BEZIER(S0)(controlpoints);
var curve = MAP(curveMapping)(domain);
DRAW(COLOR([0,1,1])(curve));
// poligono dei punti di cntrollo
DRAW(POLYLINE(controlpoints));

// ESERCIZIO 5
// Spline è curva a tratti (POLYLINE = spline di grado 1)
// Spline cardinale cubica: spline interpolatrice (che interpola con qualsiasi insieme di punti finito) 
//   	complesso cubiche hermit attaccate tra loro con continuità geometrica e di derivata prima ovvero:
//  	TRATTO i-esimo di curva: ci(u) = U3 * Bh * [p(i) p(i+1) h(p(i+1)-p(i-1)) h(p(i+2) - p(i)) ]
//		ci(u) = U(3) B(h) [0 1 0 0]		[p(i-1)]
//						  [0 0 1 0]		[p(i)]
//						  [-h 0 h 0]	[p(i+1)]
//						  [0 -h 0 h]	[p(i+2)]
//							Bhc matrice di trasformazione da hermit a cardinale
//							l'h scala la lunghezza del vettore
//
// Dati (p0...pm) m+1 punti costrisco una spline cardinale cubica. per ogni (m-2) segmenti impongo 4 vincoli
// la curva interpolera' tutti i punti tra p(0+1) e p(m-1)
// per interpolare i punti iniziali li raddoppio (2 volte sullo stesso posto) cosi' l'algoritmo 
// d'interpolazione funziona uguale
// la tangente in un punto e' parallela al vettore differenza tra il suo predecesssore e successore
// tra due punti viene generata una hermitiana
// CUBIC_CARDINAL(domain, h)

var domain = INTERVALS(1)(50);
var controlpoints = [[0,0],[0,0],[3,2],[4,-1],[7,3],[9,0],[11,1],[12,0],[12,0]];
// Spline unisce i pezzi di curva
var splineCardinal = SPLINE(CUBIC_CARDINAL(domain,3))(controlpoints);
// DRAW(splineCardinal);


var drawBezierS0 = function(controlPoints) {
	var domain = INTERVALS(1)(1080); // In HD xD

	// punti di controllo
	var listaDfacce = [];
	controlPoints.forEach( function(v,i) { listaDfacce.push([i]); } );
	DRAW( COLOR([0.1,0.6,0.2])( SIMPLICIAL_COMPLEX(controlPoints)(listaDfacce) ) );

	// polyline che unisce punti di controllo
	DRAW( COLOR([0.5,0.2,0.7])( POLYLINE(controlPoints) ) );

	// curva
	var curveMapping = BEZIER(S0)(controlPoints);
	var curve = MAP(curveMapping)(domain);
	DRAW( COLOR([0,0.5,0.5])( curve ) );
};

// Cubic uspline
var domain = INTERVALS(1)(20);
var controlpoints = [[-3,6],[-4,2],[-3,-1],[-1,1],[1.5,1.5],[3,4],[5,5],[7,2],[6,-2],[2,-3]];
var splineCubic = SPLINE(CUBIC_UBSPLINE(domain))(controlpoints);
DRAW(splineCubic);