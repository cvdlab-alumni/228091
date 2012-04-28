console.log('test');

var load = function (id, n) {
  var url = "https://raw.github.com/cvdlab-cg/" + id 
    + "/master/2012-04-03/exercise" + n + ".js";

  var script = document.createElement('script');
  script.src = url;
  document.body.appendChild(script);

  return url;
};
var poly1 = POLYLINE([[0,0],[9,0],[9,3],[8,3],[8,1],[5,1],[5,3],[4,3],[4,1],[1,1],[1,3],[0,3],[0,0]]);
var p1 = EXTRUDE([3])(poly1);
var p2 = T([1])([7])(S([1])([-1])(p1));
var walls = STRUCT([p1, p2]);
//DRAW(COLOR([0.3,0.3,0.3])(walls));
var roof = T([0,1,2])([-1,-1,3])(CUBOID([11,9,0.3]));
var coloredRoof = COLOR([0.3,0.3,0.9,0.4])(roof);
//DRAW(coloredRoof);
var domain = INTERVALS(1)(20);
var controls = [[1,0], [1,1], [1,0], [1,1]];
var curve = MAP(CUBIC_HERMITE(S0)(controls))(domain);
//DRAW(curve);
var domain = INTERVALS(1)(20);
var controls = [[0,0],[1,2],[3,2],[3,0],[5,-1],[6,1]];
var curve = MAP(BEZIER(S0)(controls))(domain);
//DRAW(curve);
var domain = INTERVALS(1)(20);
var controls = [[0,0,0],[1,2,1],[3,2,2],[3,0,3],[5,-1,-2],[6,1,-5]];
var curve = MAP(BEZIER(S0)(controls))(domain);
//DRAW(curve);
var domain = INTERVALS(1)(20);
var controls = [[0,0],[0,0],[3,2],[4,-1],[7,3],[9,0],[11,1],[12,0],[12,0]];
var curveh1 = SPLINE(CUBIC_CARDINAL(domain))(controls);
var curveh3 = COLOR([0.3,0,0])(SPLINE(CUBIC_CARDINAL(domain,3))(controls));
var curveh6 = COLOR([0.6,0,0])(SPLINE(CUBIC_CARDINAL(domain,6))(controls));
var curveh01 = COLOR([0,0,0.5])(SPLINE(CUBIC_CARDINAL(domain,0.1))(controls));
//DRAW(curveh1);
var domain = INTERVALS(1)(20);
var controls = [[0,0],[0,0],[3,2],[4,-1],[7,3],[9,0],[11,1],[12,0],[12,0]];
var curve = SPLINE(CUBIC_UBSPLINE(domain))(controls);
//DRAW(curve);
var domain = INTERVALS(1)(20);
var points = [[-3,6],[-4,2],[-3,-1],[-1,1],[1.5,1.5],[3,4],[5,5],[7,2],[6,-2],[2,-3]];
var splineCardinal = COLOR([1,0,0])(SPLINE(CUBIC_CARDINAL(domain))(points));
var splineCubic = COLOR([0,1,0])(SPLINE(CUBIC_UBSPLINE(domain))(points));
var drawPoints = SIMPLICIAL_COMPLEX(points)([[0],[1],[2],[3],[4],[5],[6],[7],[8],[9]]);
var out = STRUCT([splineCardinal,splineCubic,drawPoints]);
DRAW(out);
