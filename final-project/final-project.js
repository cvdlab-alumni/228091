var domain1 = INTERVALS(1)(200);
var domain2 = DOMAIN([[0,1],[0,1]])([100,100]);

function daJsonAArray(tipo,scalaXY){
  this.scalaXY = scalaXY || 1;//imposta scala di default a 1
  this.tipo = tipo || 1;//imposta oggetto da trasformare  a 1:polygon
  								//0:polyline 2:Freepol
  var ritorno =
  $.getJSON('oggettiJson/DICOM/json_brain.json', function(data) {
  var fettaDicom = [];  
  console.log(data);
   var puntiImgDicom = [];
   if(tipo == 2){
  		var ogettoFreepol = data.plugins[2].sets.valArray;//recupera array contenti immagini prese da una slice
  		console.log(ogettoFreepol);
  		$.each(ogettoFreepol,function(indiceInterno,figura){//itera su ogettoFreepol
    		console.log(figura);
    		if(figura.length > 0 ){
    			$.each(figura,function(indicePunti,punto){//itera sui punti di ogni disegno di una una slice
    			console.log(punto);
    			puntiFigura = [];
				puntiFigura.push([((punto.x)/scalaXY),((punto.y)/scalaXY),punto.z]);
  					});
  				}
    		fettaDicom.push(puntiFigura);
  			});
  		puntiImgDicom.push(fettaDicom)
  	 	};

  console.log(puntiImgDicom);
 });
  return ritorno;	
};

function knots (point,par) {
  this.par = par || 0;
  console.log(par);
  var k = 2;	
  var m =point.length;
  var n = (m + k + 1);
  var first = 1;
  var last = n - 3;

  var knots = [];

  for (var i = 0; i < 3; i++) {
    	knots[i] = 0;
  		};

  for (var i = 3; i < last; i++,first++) {
    	knots[i] = first;

  		};

  for (var i = last; i < n; i++) {
    	knots[i] = first;
  		};

	 if(par == 1){
  		knots.unshift(0);//aggiunge uno 0 in coda per calcolo NUBS 3D
  		//toglie gli ultimi valori dall'array
  		for(var i = 0;i < 3;i++){
			knots.pop();//toglie gli ultimi 3 valori  			
  			}
  		var ultimo = knots.pop();//prende ultimo valore dell'array
  		for(var i = 0;i < 4;i++){
			knots.push(ultimo);//inserisci 4 volte l'ultimo valore 			
  			}
  };
  console.log(knots);
  return knots;
};

function creaCurvaNubs(){
	var knots0 = knots(punti,0);
	return  NUBS(S0)(2)(knots0)(punti);
	};

function creaCurveNubs(arrayPunti){
	var curveNubs = [];
	for(var i = 0; i < arrayPunti.length; i++){
		curveNubs[i] = creaCurvaNubs(arrayPunti[i]);		
		}
	return curveNubs;	
};
var puntiDICOM = daJsonAArray(2,100);
var calcolaCurve = creaCurveNubs(puntiDICOM);
var knotsDICOM = knots(puntiDICOM,1);
var nubsDICOM = NUBS(S1)(3)(knotsDICOM)(calcolaCurve);

	var model = COLOR([1,0.89,0.76])(MAP(nubsDICOM)(domain2))
DRAW(model);
