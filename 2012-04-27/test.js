console.log('test');

var load = function (id, n) {
  var url = "https://raw.github.com/cvdlab-cg/" + id 
    + "/master/2012-04-27/exercise" + n + ".js";

  var script = document.createElement('script');
  script.src = url;
  document.body.appendChild(script);

  return url;
};

function tlaslaPoint(punto,valore){
	var newPoint = [];
	for(j=0;j<punto.length;j++){
		newPoint.push(punto[j]);//copia punto
		}
	newPoint[1] = newPoint[1] + valore;//tlasla Y
	return newPoint;
};

function costruisciBlocco2(){
var ritorno = [];
for(i=0;i<pointsBlocco1.length;i++){
	if(i==0 || i==1 || i==12){
		point = pointsBlocco1[i];
		var tPoint = tlaslaPoint(point,7);
		ritorno.push(tPoint);		
		}
	if(i==2 || i==3 || i==6 || i==7 || i==10 || i==11){
		point = pointsBlocco1[i];
		var tPoint = tlaslaPoint(point,1);
		ritorno.push(tPoint);		
			}
	if(i==4 || i==5 || i==8 || i==9){
		point = pointsBlocco1[i];
		var tPoint = tlaslaPoint(point,5);
		ritorno.push(tPoint);		
			}
	}
	return ritorno;
};

var pointsBlocco1 = [[0,0], [9,0], [9,3],[8,3],[8,1],[5,1],[5,3],[4,3],[4,1],[1,1],[1,3],[0,3],[0,0]];
var blocco1 = POLYLINE(pointsBlocco1);
//DRAW(blocco1);
var pointsBlocco2 = costruisciBlocco2();
var blocco2 = POLYLINE(pointsBlocco2);
//DRAW(blocco2);
var labrintoTot = STRUCT([blocco1,blocco2]);
var labrintoConMuri = EXTRUDE([3])(labrintoTot);
//DRAW(labrintoConMuri);
var labrintoColorato = COLOR([0.8, 0.4, 0.2, 0.7])(labrintoConMuri);
//DRAW(labrintoColorato);
var roof = T([0,1,2])([-1,-1,3])(CUBOID([11,9,0.3]));
var coloredRoof = COLOR([0.3,0.3,0.9,0.4])(roof);
//DRAW(coloredRoof);
var labrintoChiuso = STRUCT([labrintoColorato, coloredRoof]);
//DRAW(labrintoChiuso);
var tetto = BOUNDARY(1)(roof);
//DRAW(tetto);
var domain = INTERVALS(1)(20);
var controls = [[1,0], [1,1], [1,0], [1,1]];
var curve = MAP(CUBIC_HERMITE(S0)(controls))(domain);
DRAW(curve);
