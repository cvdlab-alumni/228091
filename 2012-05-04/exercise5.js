/*
<<<<<<< HEAD
*Avio triplane completo
=======
*Avio triplane su pista
>>>>>>> 5c91d02ac513a4a401e24ac878c4aba97fc77f00
*/

//tlasla ogni insieme di punti di una quantita pari a tlasla su asse Y
var tlaslaPunti = function(punti,tlasla){
<<<<<<< HEAD
	var puntiTlaslati;
=======
  var puntiTlaslati;
>>>>>>> 5c91d02ac513a4a401e24ac878c4aba97fc77f00
	puntiTlaslati = punti.map(function(v) { return [v[0], v[1] + tlasla, v[2] ]; } );
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
	
	//pista
var contornoEsternoPista = POLYLINE([[-30,0,0],[-30,20,0],[200,20,0],[200,0,0],[-30,0,0]]);
DRAW(contornoEsternoPista);
	//ala
var domain1 = INTERVALS(1)(1080);
var domain2 = DOMAIN([[0,1],[0,1]])([30,50]);
var alaPoint = [[2,0,1],[1,0,1],[1,0,0.5],[0.5,0,1.5],[2,0,1]];//ampiezza ala circa 1metro alteza circa 10-15 cm
var curvaSezioneAla = BEZIER(S0)(alaPoint);
var sezioneAla = MAP(curvaSezioneAla)(domain1);
//DRAW(sezioneAla);
//l'ala completa intera superiore nella realtà è composta da 41 elementi distanti circa 23 cm
//per allegerire la mole dei calcoli porto il numero dei segmenti da 41 a 10 con distanze di 0,97536 cm
var elementiSezione = creaElementiAla(alaPoint,10,0.98);
var insiemeCurveProfili = creaCurveElementiAla(elementiSezione);
var strutturaCurveProfile = STRUCT(CONS(AA(MAP)(insiemeCurveProfili))(domain1));
//DRAW(strutturaCurveProfile);
//creo superfice ala;
var curvaSuperficeAla = BEZIER(S1)(insiemeCurveProfili);
var superficeAla = MAP(curvaSuperficeAla)(domain2);

//creo triAla
var superficeAla1 = T([2])([0.4+1])(superficeAla);//somma spessori stabilizzatore + distanza
var superficeAla2 = T([2])([0.4+1])(superficeAla1);
var triAla = STRUCT([superficeAla,superficeAla1,superficeAla2]);
//DRAW(COLOR([0.5,0.2,0.3])(triAla));
//carlinga
var triangoloMotore = TRIANGLE_FAN([[0,0,0],[0,0.35,0.6],[0,-0.35,0.6]]);
var triangoloPilota = T([0])([2.8956])(triangoloMotore);
var lineaBase = POLYLINE([[0,0,0],[2.9,0,0]]);
var lineaLato1 = POLYLINE([[0,0.35,0.6],[2.9,0.35,0.6]]);
var lineaLato2 = POLYLINE([[0,-0.35,0.6],[2.9,-0.35,0.6]]);
var totCarlingaMotePilota = STRUCT([triangoloMotore,triangoloPilota,lineaBase,lineaLato1,lineaLato2]);
var carlingaCodaLato1 = POLYLINE([[2.9,0,0],[7.65,0,0],[7.65,0,0.4],[2.9,0.35,0.6],[2.9,0,0]]);
var carlingaCodaLato2 = POLYLINE([[2.9,0,0],[7.65,0,0],[7.65,0,0.4],[2.9,-0.35,0.6],[2.9,0,0]]);
var strutturaCarlinga = STRUCT([totCarlingaMotePilota ,carlingaCodaLato1,carlingaCodaLato2]);
var tlaslaCarlinga = T([1,2])([4.9,1.3])(strutturaCarlinga);
//DRAW(tlaslaCarlinga);
//stabilizzatore orizzontale verticale
var stabOPoint = [[2,0,1],[1,0,1],[1,0,0.5],[0.5,0,1.5],[2,0,1]];
//il singolo stabilizzatre orinzontale e 1/3 la lunghezza dell'ala intera
//per allegerire la mole dei calcoli porto il numero dei segmenti da 14 a 4 con distanze di 0,97536 cm
var stabOElementi = creaElementiAla(stabOPoint,4,0.81);
var insiemeCurveStabO = creaCurveElementiAla(stabOElementi);
var strutturaCurveStabO = STRUCT(CONS(AA(MAP)(insiemeCurveStabO))(domain1));
//creo superfice stabilizzatore orizzontale;
var curvaSuperficeStabO = BEZIER(S1)(insiemeCurveStabO);
var superficeStabO = MAP(curvaSuperficeStabO)(domain2);
var superficeStabO1 = T([2])([0.4+1])(superficeStabO);//somma spessori stabilizzatore + distanza
var superficeStabO2 = T([2])([0.4+1])(superficeStabO1);
//stabilizzatore verticale
var stabV = SIMPLEX_GRID([([0,1]),[0,0.1],[0,1]]);
var stabVTlaslato = T([0,1,2])([1,1.2,1.3])(stabV);
var totaleStab = STRUCT([superficeStabO,superficeStabO1,superficeStabO2,stabVTlaslato]);
var tlaslaStabilizzatore = T([0,1,2])([5.65,3.25,0])(totaleStab);
var strutturaTot = STRUCT([triAla,tlaslaCarlinga,tlaslaStabilizzatore])
//DRAW(tlaslaStabilizzatore,,totaleStab);
DRAW(COLOR([0.5,0.2,0.3])(strutturaTot));
//DRAW(stabVTlaslato);