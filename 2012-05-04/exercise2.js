/*fusoliera Avio Triplane
*fusoliera pilota e motore
*altezza 0,6 metri
*distanza tra ala superiore e inferiore circa 0,18 metri
*larghezza 0,7 metri
*lunghezza 3,9+3,6+2 feet = 9,5 feet = 2.8956 m
*
*fusoliera coda 
*lunghezza = 9,9 + 5,7 feet = 15,6 feet = 4.75488 metri
*altezza 0,30 metri
*/
var domain1 = INTERVALS(1)(1080);
var domain2 = DOMAIN([[0,1],[0,1]])([30,50]);
var puntiTriangoloMotore = [[0,0], [0.35,0.6], [-0.35,0.6],[0,0]];
var puntiTriangoloPilota = [[0,0,3], [0.35,0.6,3], [-0.35,0.6,3],[0,0,3]];
var triangoloMotore = POLYLINE(puntiTriangoloMotore);
var carlingaPilotaEMotore = EXTRUDE([3])(triangoloMotore);
var carlingaCodaLato1 = POLYLINE([[0,0,3],[0,0,7.75],[0,0.4,7.75],[0.35,0.6,3],[0,0,3]]);
var carlingaCodaLato2 = POLYLINE([[0,0,3],[0,0,7.75],[0,0.4,7.75],[-0.35,0.6,3],[0,0,3]]);
var strutturaCarlinga = STRUCT([carlingaPilotaEMotore,carlingaCodaLato1,carlingaCodaLato2]);
DRAW(COLOR([0,1,0])(strutturaCarlinga));