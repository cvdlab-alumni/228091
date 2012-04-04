	var pillarsArea1 = SIMPLEX_GRID([([0.15, -8, 0.15]),[0.15, -7, 0.15],[1.5,1,1]]);
	var floorArea1 = SIMPLEX_GRID([[9],[0.15, 7, 0.15],[-1.2, -1, -1,0.3]]);
	//DRAW(pillarsArea1);
	//DRAW(floorArea1);
	var building1 = STRUCT([pillarsArea1, floorArea1]);
	var translatedBuikding1 = T([0,1])([1,16])(building1);
	DRAW(translatedBuikding1);
