<<<<<<< HEAD
=======

>>>>>>> 02309aac653eef85fb943b57c01e1f6337f36c88
var domain1 = INTERVALS(1)(1080);
var domain2 = DOMAIN([[0,1],[0,1]])([30,50]);
//volta di riferimento per costruzione arco
var controlpoints1 = [[1,1,0],[3,1,0],[0,0,0],[0,0,0]];
var c1 = CUBIC_HERMITE(S0)(controlpoints1); 
var curve1 = MAP(c1)(domain1); 

var controlpoints2 = [[1,3,0],[3,3,0],[0,0,0],[0,0,0]];
var c2 = CUBIC_HERMITE(S0)(controlpoints2); 
var curve2 = MAP(c2)(domain1); 

var s12 = BEZIER(S1)([c1,c2]); 
var surface12 = MAP(s12)(domain2);
var sh12 = CUBIC_HERMITE(S1)([c1,c2,[0,0,6,6],[0,0,-6,6]]);
var surfaceh12 = MAP(sh12)(domain2);
var voltaTlaslata = T([2])([2.2])(surfaceh12);
//DRAW(COLOR([0.1,0.2,0.3])(voltaTlaslata));
//prima parte arco prima dell'inizio della volta
var colonnaBase = CUBOID([2, 1, 0.2]);
var colonnaBaseTlaslata = T([0])([1])(colonnaBase);
var colonnaBaseTlaslata1 = T([2])([0.4])(colonnaBaseTlaslata);
var colonnaBaseTlaslata2 = T([2])([0.4])(colonnaBaseTlaslata1);
var colonnaBaseTlaslata3 = T([2])([0.4])(colonnaBaseTlaslata2);
var colonnaBaseTlaslata4 = T([2])([0.4])(colonnaBaseTlaslata3);
var colonnaBaseTlaslata5 = T([2])([0.4])(colonnaBaseTlaslata4);
var colonnaBaseTotale = STRUCT([colonnaBaseTlaslata,colonnaBaseTlaslata1,colonnaBaseTlaslata2,colonnaBaseTlaslata3,
colonnaBaseTlaslata4,colonnaBaseTlaslata5]);
//seconda perte arco con riferimento volta 
var colonnaBaseArco = T([0,1,2])([1,0,2.4])(CUBOID([2, 1.01, 0.2]));
var colonnaBaseArco1 = T([0,1,2])([1,0,2.8])(CUBOID([2, 1.05, 0.2]));
var colonnaBaseArco2 = T([0,1,2])([1,0,3.2])(CUBOID([2, 1.2, 0.2]));
var colonnaBaseArco3 = T([0,1,2])([1,0,3.6])(CUBOID([2, 1.6, 0.2]));
var colonnaTotale1 = STRUCT([colonnaBaseTotale,colonnaBaseArco,colonnaBaseArco1,colonnaBaseArco2,colonnaBaseArco3]);
var colonnaBaseTotale2 = T([0,1,2])([0,3,0])(colonnaBaseTotale);
var colonnaBaseArcoB = T([0,1,2])([1,2.99,2.4])(CUBOID([2, 1.01, 0.2]));
var colonnaBaseArcoB1 = T([0,1,2])([1,2.95,2.8])(CUBOID([2, 1.05, 0.2]));
var colonnaBaseArcoB2 = T([0,1,2])([1,2.8,3.2])(CUBOID([2, 1.2, 0.2]));
var colonnaBaseArcoB3 = T([0,1,2])([1,2.5,3.6])(CUBOID([2, 1.5, 0.2]));
var colonnaTotale2 = STRUCT([colonnaBaseTotale2,colonnaBaseArcoB,colonnaBaseArcoB1,colonnaBaseArcoB2,colonnaBaseArcoB3]);
var pianoFinale = CUBOID([2,4,0.2]);
//piani finali
var pianofinaleTlaslato = T([0,1,2])([1,0,4])(pianoFinale);
var pianofinaleTlaslato1 =T([2])([0.4])(pianofinaleTlaslato);
var pianofinaleTlaslato2 =T([2])([0.4])(pianofinaleTlaslato1);

var arco = STRUCT([colonnaTotale1,colonnaTotale2,pianofinaleTlaslato,pianofinaleTlaslato1,pianofinaleTlaslato2]);
//piramide
var points = [[0,0,0],[1,0,0],[0,1,0],[1,1,0],[0.5,0.5,2.4]];
var cells = [[0,1,2],[1,3,2],[2,3,4],[3,1,4],[0,1,4],[0,2,4]];
var piramide = SIMPLICIAL_COMPLEX(points)(cells);
var piramideTlaslata = T([0,1,2])([1.5,1.5,0])(piramide);
var logoTotale = STRUCT([arco,voltaTlaslata,piramideTlaslata]);
var logoSenzaVolta = STRUCT([arco,piramideTlaslata]);
//DRAW(logoTotale);
//DRAW(COLOR([0,0,1])(logoTotale));//con volta di riferimento
DRAW(COLOR([1,1,1])(logoSenzaVolta));//senza volta di riferimento
