var pillarsArea1 = SIMPLEX_GRID([([0.15, -7, 0.15]),[0.15, -6, 0.15],[1.5,1,1]]);
	var floorArea1 = SIMPLEX_GRID([[10],[0.15, 8, 0.15],[-1.5, -1, -1,0.3]]);
	var pillarsArea2 = SIMPLEX_GRID([REPLICA(3)([0.15, -7, 0.15]),[0.15, -7, 0.15],[1.5,1,1]]);
	var floorArea2 = SIMPLEX_GRID([[27],[0.15, 12, 0.15],[-1.5, -1, -1,0.3]]);
	var translatedfloorArea1 = T([0,1])([-1,-1])(floorArea1);
	var translatedfloorArea2 = T([0,1])([-2.5,-2.5])(floorArea2);
	//DRAW(pillarsArea1);
	//DRAW(floorArea1);
	//DRAW(pillarsArea2);
	//DRAW(floorArea2);
	//DRAW(translatedfloorArea2);
	var building1 = STRUCT([pillarsArea1, translatedfloorArea1]);
	var building2 = STRUCT([pillarsArea2, translatedfloorArea2]);
	var translatedBuikding1 = T([0,1])([1,16])(building1);
	var translatedBuikding2 = T([0,1])([25,7])(building2);
	var redBuilding1 = COLOR([1,0,0])(translatedBuikding1);//colora di rosso primo edificio
	DRAW(redBuilding1);
	var greenBuilding2 = COLOR([0,1,0])(translatedBuikding2);//colora di verde secondo edificio
	//DRAW(bluBuilding2);
	var building = STRUCT([redBuilding1,greenBuilding2]);	
	