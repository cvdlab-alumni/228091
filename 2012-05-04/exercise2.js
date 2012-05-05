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

//var puntiTriangoloMotore = [[0,0,0],[0,0,0.6] [0,0.35,0.6], [0,-0.35,6],[0,0]];
var triangoloMotore = TRIANGLE_FAN([[0,0,0],[0,0.35,0.6],[0,-0.35,0.6]]);
var triangoloPilota = T([0])([2.8956])(triangoloMotore);
var lineaBase = POLYLINE([[0,0,0],[2.9,0,0]]);
var lineaLato1 = POLYLINE([[0,0.35,0.6],[2.9,0.35,0.6]]);
var lineaLato2 = POLYLINE([[0,-0.35,0.6],[2.9,-0.35,0.6]]);
var totCarlingaMotePilota = STRUCT([triangoloMotore,triangoloPilota,lineaBase,lineaLato1,lineaLato2]);
var carlingaCodaLato1 = POLYLINE([[2.9,0,0],[7.65,0,0],[7.65,0,0.4],[2.9,0.35,0.6],[2.9,0,0]]);
var carlingaCodaLato2 = POLYLINE([[2.9,0,0],[7.65,0,0],[7.65,0,0.4],[2.9,-0.35,0.6],[2.9,0,0]]);
var strutturaCarlinga = STRUCT([totCarlingaMotePilota ,carlingaCodaLato1,carlingaCodaLato2])
DRAW(strutturaCarlinga);
