var altezzaBase = 1.72;
var altezzaMuri = 4;
var ssMuro = 0.2;
var ssMuroLisci = 0.1;
var ssVetrate = 0.05;
var gradiniCount = 6;
var gradLargo = 3/gradiniCount;
var gradSS = altezzaBase/gradiniCount;
var tettoSpesso = 0.51;
var lColonna = 0.10;

var baseStruttura = [];
var dueBlocchi = SIMPLEX_GRID([[1],[2],[altezzaBase]]);
//DRAW(dueBlocchi);
baseStruttura.push( dueBlocchi ); // 2 blocchi prima piscina
var settorePiscina = SIMPLEX_GRID([[-1,21],[1,-9,7],[altezzaBase]]);
baseStruttura.push( settorePiscina ); // settore piscina
//DRAW(settorePiscina);
var piscinaEScalini = SIMPLEX_GRID([[15],[17],[altezzaBase]]);
//DRAW(piscinaEScalini);
var piscinaEScaliniT = T([0])([22])(piscinaEScalini);
//DRAW(piscinaEScaliniT);
baseStruttura.push( piscinaEScaliniT); // corpo tra piscina e scalini
var protScalini = SIMPLEX_GRID([[3],[1],[altezzaBase]]);
var protScaliniT = T([0])([37])(protScalini);
//DRAW(protScaliniT);
baseStruttura.push( protScaliniT ); // prot scalini
var corpoScaliniNord = SIMPLEX_GRID([[3],[13],[altezzaBase]]);
var corpoScaliniNordT = T([0,1])([37,4])(corpoScaliniNord);
//DRAW(T([0,1,2])([37,4,3])(corpoScaliniNord));
baseStruttura.push( corpoScaliniNordT ); // corpo scalini e nord
baseStruttura.push( T([0,1])([40,4])(SIMPLEX_GRID([[7],[12],[altezzaBase]])) ); // corpo tra prima e pool dopo
baseStruttura.push( T([0,1])([47,4])(SIMPLEX_GRID([[5],[1],[altezzaBase]])) ); // protuberanza piscina nord
baseStruttura.push( T([0,1])([51,5])(SIMPLEX_GRID([[1],[1],[altezzaBase]])) ); // protuberanza piscina nord alto
baseStruttura.push( T([0,1])([1,17])(SIMPLEX_GRID([[8],[5],[altezzaBase]])) ); // promontorio nord
baseStruttura = STRUCT(baseStruttura);
//DRAW(baseStruttura);

var muriStrutturaGrossi = [];
// Piscina grossa + promontorio nord
muriStrutturaGrossi.push( T([0])([1-ssMuro])(SIMPLEX_GRID([[ssMuro],[-1,21],[altezzaBase+altezzaMuri]])) );
muriStrutturaGrossi.push( SIMPLEX_GRID([[-(1-ssMuro),7+ssMuro],[-(1-ssMuro), ssMuro],[-altezzaBase,altezzaMuri]]) );
muriStrutturaGrossi.push( SIMPLEX_GRID([[-(1-ssMuro),8+ssMuro+ssMuro],[-(21+1-ssMuro), ssMuro],[altezzaBase+altezzaMuri]]) );
muriStrutturaGrossi.push( SIMPLEX_GRID([[-9, ssMuro],[-(16+1-ssMuro), 5],[altezzaBase+altezzaMuri]]) );
// Muro sopra piscina grossa
muriStrutturaGrossi.push( SIMPLEX_GRID([[-7.5, 19],[-15, ssMuro],[-altezzaBase,altezzaMuri]]) );
// Muro destra piscina grossa
muriStrutturaGrossi.push( SIMPLEX_GRID([[-(25+ssMuro), 7 + (3-ssMuro)],[-(7+ssMuro), ssMuro],[-altezzaBase,altezzaMuri]]) );
// Muro sinistra piscinetta
muriStrutturaGrossi.push( SIMPLEX_GRID([[-(37+ssMuro), 4 + (1-ssMuro)+0.5],[-(11+ssMuro), ssMuro],[-altezzaBase,altezzaMuri]]) );
// Piscina piccola
muriStrutturaGrossi.push( SIMPLEX_GRID([[-41.5, 0.5+9+ssMuro],[-(5-ssMuro), ssMuro],[-altezzaBase,altezzaMuri]]) );
muriStrutturaGrossi.push( SIMPLEX_GRID([[-51, ssMuro],[-(5-ssMuro), 11+(2*ssMuro)],[altezzaBase+altezzaMuri]]) );
muriStrutturaGrossi.push( SIMPLEX_GRID([[-(38+1-ssMuro), 12+ssMuro],[-(16), ssMuro],[altezzaBase+altezzaMuri]]) );
muriStrutturaGrossi = STRUCT(muriStrutturaGrossi);


var fondoPiscina = [];
fondoPiscina.push( SIMPLEX_GRID([[-1,21],[-1,9],[altezzaBase/2]]) ); // settore fondo piscina grossa
fondoPiscina.push( SIMPLEX_GRID([[-47,4],[-5,11],[altezzaBase/2]]) ); // settore fondo piscina piccola
fondoPiscina = STRUCT(fondoPiscina);
//DRAW(fondoPiscina);
var gradini = [];
gradini.push( SIMPLEX_GRID([[-37, gradLargo],[-1,3],[altezzaBase]]) );
gradini.push( SIMPLEX_GRID([[-(37+gradLargo*1), gradLargo],[-1,3],[altezzaBase-(gradSS*1)]]) );
gradini.push( SIMPLEX_GRID([[-(37+gradLargo*2), gradLargo],[-1,3],[altezzaBase-(gradSS*2)]]) );
gradini.push( SIMPLEX_GRID([[-(37+gradLargo*3), gradLargo],[-1,3],[altezzaBase-(gradSS*3)]]) );
gradini.push( SIMPLEX_GRID([[-(37+gradLargo*4), gradLargo],[-1,3],[altezzaBase-(gradSS*4)]]) );
gradini.push( SIMPLEX_GRID([[-(37+gradLargo*5), gradLargo],[-1,3],[altezzaBase-(gradSS*5)]]) );
gradini.push( SIMPLEX_GRID([[-(37+gradLargo*6), gradLargo],[-1,3],[altezzaBase-(gradSS*6)]]) );
gradini = STRUCT(gradini);
//DRAW(gradini);
var gradiniScomposti = [];
gradiniScomposti.push( SIMPLEX_GRID([[-37, gradLargo],[-1,3],[altezzaBase]]) );
gradiniScomposti.push( T([2])([1])(SIMPLEX_GRID([[-(37+gradLargo*1), gradLargo],[-1,3],[altezzaBase-(gradSS*1)]]) ));
gradiniScomposti.push( T([2])([2])(SIMPLEX_GRID([[-(37+gradLargo*2), gradLargo],[-1,3],[altezzaBase-(gradSS*2)]]) ));
gradiniScomposti.push( T([2])([3])(SIMPLEX_GRID([[-(37+gradLargo*3), gradLargo],[-1,3],[altezzaBase-(gradSS*3)]]) ));
gradiniScomposti.push( T([2])([4])(SIMPLEX_GRID([[-(37+gradLargo*4), gradLargo],[-1,3],[altezzaBase-(gradSS*4)]]) ));
gradiniScomposti.push( T([2])([5])(SIMPLEX_GRID([[-(37+gradLargo*5), gradLargo],[-1,3],[altezzaBase-(gradSS*5)]]) ));
gradiniScomposti.push( T([2])([6])(SIMPLEX_GRID([[-(37+gradLargo*6), gradLargo],[-1,3],[altezzaBase-(gradSS*6)]]) ));
gradiniScomposti = STRUCT(gradiniScomposti);
DRAW(gradiniScomposti);
var panca = [];
panca.push( SIMPLEX_GRID([[-8,15],[-(14+0.05),0.5],[-(altezzaBase+0.5),0.1]]) );
for(var pancaI = 0; pancaI <= 8; pancaI++ ) {
  panca.push( SIMPLEX_GRID([[-(8+1.85*pancaI), 0.25],[-(14+0.05), 0.25],[-altezzaBase, 0.5]]) );
}
panca = STRUCT(panca);
//DRAW(panca);
var murettiNord = [];
murettiNord.push( SIMPLEX_GRID([[-5,ssMuroLisci],[-17,2],[-altezzaBase,altezzaMuri]]) );
murettiNord.push( SIMPLEX_GRID([[-5,ssMuroLisci],[-(20), 2-ssMuro],[-altezzaBase,altezzaMuri]]) );
murettiNord.push( SIMPLEX_GRID([[-5,1],[-(21), ssMuroLisci],[-altezzaBase,altezzaMuri]]) );
murettiNord.push( SIMPLEX_GRID([[-7,2],[-(21), ssMuroLisci],[-altezzaBase,altezzaMuri]]) );
murettiNord.push( SIMPLEX_GRID([[-1,5],[-17, ssMuroLisci],[-altezzaBase,altezzaMuri]]) );
murettiNord.push( SIMPLEX_GRID([[-7,2],[-17, ssMuroLisci],[-altezzaBase,altezzaMuri]]) );
murettiNord = STRUCT(murettiNord);

var tettoNord = [];
tettoNord.push( SIMPLEX_GRID([[-0.5, 0.5+8+0.8],[-(13+0.2),0.8+8+0.8],[-(altezzaBase+altezzaMuri), tettoSpesso]]) );
tettoNord = STRUCT(tettoNord);
var colonneEst = [];
// Sotto
colonneEst.push( SIMPLEX_GRID([[-(25+(1-lColonna)), lColonna],[-(6+(1-lColonna)), lColonna],[-altezzaBase, altezzaMuri]]) );
colonneEst.push( SIMPLEX_GRID([[-(31+(1-lColonna)), lColonna],[-(6+(1-lColonna)), lColonna],[-altezzaBase, altezzaMuri]]) );
colonneEst.push( SIMPLEX_GRID([[-(37+(1-lColonna)), lColonna],[-(6+(1-lColonna)), lColonna],[-altezzaBase, altezzaMuri]]) );
colonneEst.push( SIMPLEX_GRID([[-(43+(1-lColonna)), lColonna],[-(6+(1-lColonna)), lColonna],[-altezzaBase, altezzaMuri]]) );
// Sopra
colonneEst.push( SIMPLEX_GRID([[-(25+(1-lColonna)), lColonna],[-(13+(1-lColonna)), lColonna],[-altezzaBase, altezzaMuri]]) );
colonneEst.push( SIMPLEX_GRID([[-(31+(1-lColonna)), lColonna],[-(13+(1-lColonna)), lColonna],[-altezzaBase, altezzaMuri]]) );
colonneEst.push( SIMPLEX_GRID([[-(37+(1-lColonna)), lColonna],[-(13+(1-lColonna)), lColonna],[-altezzaBase, altezzaMuri]]) );
colonneEst.push( SIMPLEX_GRID([[-(43+(1-lColonna)), lColonna],[-(13+(1-lColonna)), lColonna],[-altezzaBase, altezzaMuri]]) );
colonneEst = STRUCT(colonneEst);

var tettoDestro = [];
tettoDestro.push( SIMPLEX_GRID([[-24,23],[-4,13],[-(altezzaBase+altezzaMuri), tettoSpesso]]) );
tettoDestro = STRUCT(tettoDestro);

var vetrate = []; // ssVetrate
// vetrata sud
vetrate.push( SIMPLEX_GRID([[-30,11],[-5, ssVetrate],[-altezzaBase, altezzaMuri]]) );
// vetrata su piscinetta
vetrate.push( SIMPLEX_GRID([[-44,ssVetrate],[-7, 7],[-altezzaBase, altezzaMuri]]) );
// vetrate doppie
vetrate.push( SIMPLEX_GRID([[-31,ssVetrate],[-(7+(2*ssMuro)), 6],[-altezzaBase, altezzaMuri]]) );
vetrate.push( SIMPLEX_GRID([[-32,ssVetrate],[-(7+(2*ssMuro)), 6],[-altezzaBase, altezzaMuri]]) );
// vetrate ortogonale su doppie
vetrate.push( SIMPLEX_GRID([[-30,10],[-(7+6+(2*ssMuro)), ssVetrate],[-altezzaBase, altezzaMuri]]) );
vetrate = STRUCT(vetrate);