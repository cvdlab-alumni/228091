var gambeSedia = SIMPLEX_GRID([([0.03, -0.3, 0.03]),[0.03, -0.3, 0.03],[0.25]]);
	var sedile = SIMPLEX_GRID([[0.36],[0.36],[-0.25,0.02]]);
	var sgabello = STRUCT([gambeSedia,sedile]);
	var sgabello1 = T([0,1])([32,9])(sgabello);
	var sgabello2 = T([0,1])([32,10])(sgabello);
	var sgabello3 = T([0,1])([3,16])(sgabello);
	var mobilio = STRUCT([sgabello1,sgabello2,sgabello3]);
	//DRAW(mobilio);
	//DRAW(gambeSedia);
	//DRAW(sedile);
	var pillarsArea1 = SIMPLEX_GRID([([0.15, -7, 0.15]),[0.15, -6, 0.15],[1.5,1,1]]);
	var floorArea1 = SIMPLEX_GRID([[10],[0.15, 8, 0.15],[-1.5, -1, -1,0.3]]);
	var pillarsArea2 = SIMPLEX_GRID([REPLICA(3)([0.15, -7, 0.15]),[0.15, -7, 0.15],[1.5,1,1]]);
	var floorArea2 = SIMPLEX_GRID([[27],[0.15, 12, 0.15],[-1.5, -1, -1,0.3]]);
	var vasca = SIMPLEX_GRID([[20],[9],[1]]);
	var translatedfloorArea1 = T([0,1])([-1,-1])(floorArea1);
	var translatedfloorArea2 = T([0,1])([-2.5,-2.5])(floorArea2);
	var translatedVasca = T([0,1,2])([1,1,-1])(vasca);
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
	//DRAW(redBuilding1);
	var greenBuilding2 = COLOR([0,1,0])(translatedBuikding2);//colora di verde secondo edificio
	//DRAW(bluBuilding2);
	var bluVasca = COLOR([0,0,1])(translatedVasca);//colora di blu la vasca
	var building = STRUCT([redBuilding1,greenBuilding2,bluVasca,mobilio]);	

	DRAW(building);