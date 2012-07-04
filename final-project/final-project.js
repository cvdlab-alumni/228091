var domain1 = INTERVALS(1)(200);
var domain2 = DOMAIN([[0,1],[0,1]])([100,100]);
var risultatoConversione = new Array();

function daJsonAArray(tipo,scalaXY){
  this.scalaXY = scalaXY || 1;//imposta scala di default a 1
  this.tipo = tipo || 1;//imposta oggetto da trasformare  a 1:polygon
 							//0:polyline 2:Freepol
  var puntiImgDicom = new Array();//array contentente punti
  var jqxhr =
  $.getJSON('oggettiJson/DICOM/json_brain.json', function(data) {
  
  //var fettaDicom = [];  
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
									disegno.push([((punti.x)-scalaXY),((punti.y)-scalaXY),punti.z]);
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
 	
  console.log(risultatoConversione);
  return jqxhr;
};

function copiaRisultato(risultatoJson){
	//copio riusultato su altro array 
 	 $.each(risultatoJson,function(indiceDisegno,disegno){//itera sulle coordinate di un punto (x,y,z)	
			risultatoConversione.push(disegno);});	
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
  //console.log(knots);
  return knots;
};

function creaCurvaNubs(punti){
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

var domain = DOMAIN([[0,2]])([1000]);
	var mapping = function(p){
		var u = p[0];
		return [u, 1, 0];
	};
	       
function provaPlasm(){
	//var mapped = MAP(mapping)(domain);
	//DRAW(mapped);
	//COLOR([1,0,0])(mapped);
	var calcolaCurve = creaCurveNubs(risultatoConversione);
   var knotsDICOM = knots(risultatoConversione,1);
   var nubsDICOM = NUBS(S1)(3)(knotsDICOM)(calcolaCurve);
   //console.log(nubsDICOM.length);
   var model = COLOR([1,0.89,0.76])(MAP(nubsDICOM)(domain2))
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