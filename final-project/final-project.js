var domain1 = INTERVALS(1)(50);
var domain2 = DOMAIN([[0,1],[0,1]])([50,50]);
var domain3 = DOMAIN([[0,1]])([50]);
var risultatoConversione = new Array();
//parsen json
function daJsonAArray(scalaXYZ){
  this.scalaXYZ = scalaXYZ || 1;//imposta scala di default a 1
  var puntiImgDicom = new Array();//array contentente punti
  var jqxhr =
  $.getJSON('oggettiJson/DICOM/json_brain.json', function(data) {
    //console.log(data);
 	var ogettoFreepol = data.plugins[2].sets.valArray;//recupera array contenti immagini di tutte le slice
  		//console.log(ogettoFreepol);
  		$.each(ogettoFreepol,function(indiceInterno,figure){//itera sulle figure contenute in una slice
    		//console.log(figure);
    		if(figure.length > 0  ){//seleziono figure contententi informazioni
    			$.each(figure,function(indicePunti,figura){//itera su una figura della slice
    			//console.log(punto);
    				if(figura.length > 30){//prendo le figure con piu di 30 punti
    					var disegno = [];
    					$.each(figura,function(indicePunti,punti){//itera su insieme di punti di una figura
    						if(indicePunti % 10 == 0 ){//prendo un punto ogni 10
							 //$.each(punti,function(indicePunto,punto){//itera sulle coordinate di un punto (x,y,z)	
									disegno.push([((punti.x)/scalaXYZ),((punti.y)/scalaXYZ),punti.z/scalaXYZ]);
  								//});
  								}
  						});
  					}
  					if(disegno != undefined) {
  						puntiImgDicom.push(disegno);
  					}
  				});
  			}
    	});
  //console.log(puntiImgDicom);
 }).complete(function() { //alert("complete") copletato il parsen del json copia il risultato su array di lavoro
	copiaRisultato(puntiImgDicom); 	
 	});
  //console.log(risultatoConversione);
  return jqxhr;
};
//copia il risultato su array di lavoro
function copiaRisultato(risultatoJson){
	
 	 $.each(risultatoJson,function(indiceDisegno,disegno){	
			risultatoConversione.push(disegno);});	
	};
//calcola nodi per curve e superfici NUBS
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
         //calcola nodi per superfici
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
//crea singola cuva NUBS
function creaCurvaNubs(puntiCurva){
	var knots0 = knots(puntiCurva,0);//calcola knots
	var curva =  NUBS(S0)(2)(knots0)(puntiCurva);//calcola curva NUBS
	return curva;
	};
//crea array di curve NUBs
function creaCurveNubs(arrayPunti){
	var curveNubs = [];//array di ritorno composto da curve NUBS
	for(var i = 0; i < arrayPunti.length; i++){
		curveNubs[i] = creaCurvaNubs(arrayPunti[i]);		
		}
	return curveNubs;	
};
//disegna i contorni delle slice DICOM
function disegnaContorni(){
	for(i=0;i<risultatoConversione.length;i++){
		var pointZ0 = risultatoConversione[i]; 
		var knots0 = knots(pointZ0);
		var c0 = NUBS(S0)(2)(knots0)(pointZ0);
		var curve0 = COLOR([0.71,0.73,0.83])(MAP(c0)(domain1));
		DRAW(curve0);
	};
};
//disegna superfici NUBS	
function disegnaModello(){

	var curveNUBS = creaCurveNubs(risultatoConversione);//array formato da curve
	var knotsCurveNUBS = knots(risultatoConversione,1);
	var nubsDICOM = NUBS(S1)(3)(knotsCurveNUBS)(curveNUBS);
	//console.log(nubsDICOM.length);
	var model = COLOR([0.48,0.48,0.51])(MAP(nubsDICOM)(domain2));
	//var model = MAP(nubsDICOM)(domain2);
	DRAW(model);
};
//avvia parsen json e alla fine disegna tutto
function avviaLetturaJson(){
	var jqxhr = daJsonAArray(100);//carico il modello con scala 1:100
	jqxhr.complete(function(){ //alert("third complete");	
	//console.log(risultatoConversione);
	//console.log(risultatoConversione.length);
	disegnaContorni();
	disegnaModello();
	});
};

