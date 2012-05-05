/*
*stabilizatore orizontale e verticale Avio Triplane
*lunghezza = 3,2512 metri 1/3 apertura alare
*elementi per alettone = 14
*distanza sezioni alettone 0,23 metri
*stabilizzatore verticale
*altezza 1 metro
*lunghezza 1 metro
*/
//tlasla ogni insieme di punti di una quantita pari a tlasla su asse z
var tlaslaPunti = function(punti,tlasla){
  var puntiTlaslati;
	puntiTlaslati = punti.map(function(v) { return [v[0], v[1], v[2] + tlasla]; } );
		return puntiTlaslati;
	};
//crea un insiele di elementi di cardinalità anumEle e distanti tra loro distEle
var creaElementiAla = function(punti,numEle,distEle) {
	var elementiAla = [];
	var tlaslaZ = 0;
	for(i=0;i<numEle;i++){
		elementiAla.push(tlaslaPunti(punti,tlaslaZ));
		tlaslaZ = tlaslaZ+ distEle;	
		}
		return elementiAla;
};
//crea le curve per ogni elemento
var creaCurveElementiAla = function(puntiElementi){
	var insiemeCurveElementi = [];
	puntiElementi.forEach( function(v) {
		insiemeCurveElementi.push(BEZIER(S0)(v)); 
		} );
		return insiemeCurveElementi;
	};
var domain1 = INTERVALS(1)(1080);
var domain2 = DOMAIN([[0,1],[0,1]])([30,50]);
var stabOPoint = [[2,1,0],[0,1,0],[0,1.5,0],[0,-0.01,0],[2,1,0]];//ampiezza ala circa 1metro alteza circa 10-15 cm
//il singolo stabilizzatre orinzontale e 1/3 la lunghezza dell'ala intera
//per allegerire la mole dei calcoli porto il numero dei segmenti da 14 a 4 con distanze di 0,97536 cm
var stabOElementi = creaElementiAla(stabOPoint,4,0.81);
var insiemeCurveStabO = creaCurveElementiAla(stabOElementi);
var strutturaCurveStabO = STRUCT(CONS(AA(MAP)(insiemeCurveStabO))(domain1));
//DRAW(strutturaCurveStabO);

//creo superfice stabilizzatore orizzontale;
var curvaSuperficeStabO = BEZIER(S1)(insiemeCurveStabO);
var superficeStabO = MAP(curvaSuperficeStabO)(domain2);
var superficeStabO1 = T([1])([0.4+1])(superficeStabO);//somma spessori stabilizzatore + distanza
var superficeStabO2 = T([1])([0.4+1])(superficeStabO1);
var totaleStabO = STRUCT([superficeStabO,superficeStabO1,superficeStabO2]);
DRAW(COLOR([0.5,0.2,0.3])(totaleStabO));
//stabilizzatore verticale
var stabV = SIMPLEX_GRID([([0,1]),[0,1],[0,0.1]]);
var stabVTlaslato = T([0,1,2])([1,1,1.3])(st