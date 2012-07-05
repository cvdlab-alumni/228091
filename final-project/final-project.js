var domain1 = INTERVALS(1)(200);
var domain2 = DOMAIN([[0,1],[0,1]])([10,10]);
var domain3 = DOMAIN([[0,1]])([10]);
var risultatoConversione = new Array();

function daJsonAArray(tipo,scalaXY){
  this.scalaXY = scalaXY || 1;//imposta scala di default a 1
  this.tipo = tipo || 1;//imposta oggetto da trasformare  a 1:polygon
 							//0:polyline 2:Freepol
  var puntiImgDicom = new Array();//array contentente punti
  var jqxhr =
  $.getJSON('oggettiJson/DICOM/json_brain.json', function(data) {
    //console.log(data);
   if(tipo == 2){
  		var ogettoFreepol = data.plugins[2].sets.valArray;//recupera array contenti immagini prese da una slice
  		//console.log(ogettoFreepol);
  		$.each(ogettoFreepol,function(indiceInterno,figure){//itera sulle figure contenute in una slice
    		//console.log(figure);
    		if(figure.length > 0 ){
    			$.each(figure,function(indicePunti,figura){//itera su una figura della slice
    			//console.log(punto);
    				if(figura.length > 0){//itera sui punti di un disegno
    					var disegno = [];
    					$.each(figura,function(indicePunti,punti){//itera su insieme di punti di una figura
							 //$.each(punti,function(indicePunto,punto){//itera sulle coordinate di un punto (x,y,z)	
									disegno.push([((punti.x)/scalaXY),((punti.y)/scalaXY),punti.z/scalaXY]);
  								//});
  						});
  					}
  					if(disegno != undefined) {
  						puntiImgDicom.push(disegno);
  					}
  				});
  			}
    	});
   };
  //console.log(puntiImgDicom);
 }).complete(function() { //alert("complete")
	copiaRisultato(puntiImgDicom); 	
 	});
  //console.log(risultatoConversione);
  return jqxhr;
};

function copiaRisultato(risultatoJson){
	//copio riusultato su altro array 
 	 $.each(risultatoJson,function(indiceDisegno,disegno){//itera sulle coordinate di un punto (x,y,z)	
			risultatoConversione.push(disegno);});	
	};

function knots (point,par) {
  this.par = par || 0;
  //console.log(par);
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
  //console.log(knots);
  return knots;
};

function creaCurvaNubs(puntiCurva){
	var knots0 = knots(puntiCurva,0);//calcola knots
	var curva =  NUBS(S0)(2)(knots0)(puntiCurva);//calcola curva NUBS
	return curva;
	};

function creaCurveNubs(arrayPunti){
	var curveNubs = [];//array di ritorno composto da curve NUBS
	for(var i = 0; i < arrayPunti.length; i++){
		curveNubs[i] = creaCurvaNubs(arrayPunti[i]);		
		}
	return curveNubs;	
};
	       
function provaPlasm(){
	//var mapped = MAP(mapping)(domain);
	//DRAW(mapped);
	//COLOR([1,0,0])(mapped);
	/*
	var pointZ0 = risultatoConversione[0]; 
	var knots0 = knots(pointZ0);
	var c0 = NUBS(S0)(2)(knots0)(pointZ0);
	var curve0 = MAP(c0)(domain1);
	DRAW(curve0);
	var pointZ1 = risultatoConversione[1]; 
	var knots1 = knots(pointZ1);
	var c1 = NUBS(S0)(2)(knots1)(pointZ1);
	var curve1 = MAP(c1)(domain1);
	DRAW(curve1);
	var pointZ2 = risultatoConversione[2]; 
	var knots2 = knots(pointZ2);
	var c2 = NUBS(S0)(2)(knots2)(pointZ2);
	var curve2 = MAP(c2)(domain1);
	DRAW(curve2);}
	for(i=0;i<risultatoConversione.length;i++){
		var pointZ0 = risultatoConversione[i]; 
		var knots0 = knots(pointZ0);
		var c0 = NUBS(S0)(2)(knots0)(pointZ0);
		var curve0 = MAP(c0)(domain3);
		DRAW(curve0);
	}*/
	var curveNUBS = creaCurveNubs(risultatoConversione);//array formato da curve
	var knotsCurveNUBS = knots(risultatoConversione,1);
	var nubsDICOM = NUBS(S1)(3)(knotsCurveNUBS)(curveNUBS);
	//console.log(nubsDICOM.length);
	 model = COLOR([1,0.89,0.76])(MAP(nubsDICOM)(domain2))
	DRAW(model);
};

function avviaLetturaJson(){
	var jqxhr = daJsonAArray(2,100);
	jqxhr.complete(function(){ //alert("third complete");	
	//console.log(risultatoConversione);
	provaPlasm();
	});
};
//console.log(risultatoConversione);

//var puntiDICOM = daJsonAArray(2,100);
/*
var calcolaCurve = creaCurveNubs(puntiDICOM);
var knotsDICOM = knots(puntiDICOM,1);
var nubsDICOM = NUBS(S1)(3)(knotsDICOM)(calcolaCurve);
console.log(nubsDICOM.length);
var model = COLOR([1,0.89,0.76])(MAP(nubsDICOM)(domain2))
DRAW(model);
*/