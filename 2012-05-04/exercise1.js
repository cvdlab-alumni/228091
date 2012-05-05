

*
*ala superiore (intera) Avio Triplane
*lunghezza ala = 32 feet =  9.7536
*elementi per mezza ala 21 ,ala grande intera 42
*larghezza ala 3.6 feet = 1.09728 metri
*distanza sezioni di ala 0,23 metri
*altezza ala 0,1  0,15 metri
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
var alaPoint = [[2,1,0],[0,1,0],[0,1.5,0],[0,-0.01,0],[2,1,0]];//ampiezza ala circa 1metro alteza circa 10-15 cm
//var curvaSezioneAla = BEZIER(S0)(alaPoint);
//var sezioneAla = MAP(curvaSezioneAla)(domain1);
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
DRAW(COLOR([0.5,0.2,0.3])(superficeAla));

