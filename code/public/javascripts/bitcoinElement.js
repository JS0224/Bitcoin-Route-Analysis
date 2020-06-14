//=================== bitcoin element object ================
function Block(data){
  if(data!=null){
    data['show'] = true;
    return data;
  }
  console.log("Failed making block object");
}

function Tx(data, center){
  if(data!=null){
    data['type'] = 'tx';
    data['good'] = true;
    data['real'] = true;
    if(!center){
      data['real'] = false;
    }
    else{
      data['position'] = [1000,1000];
    }
    return data;
  }
  console.log("Failed making tx object");
}

function Addr(data,center){
  if(data!=null){
    data['real'] = true;
    data['type'] = 'addr';
    data['hot'] = false;
    if (center){//child node
      data['position'] = [500,1000];
    }
    else{
      data['real'] = false;
    }
    return data;
  }
  console.log("Failed making addr object");
}

//=================== cluster realted function ================
function addElementInCluster(cluster, element){
  cluster.push(element);
  console.log("cluster", cluster);
  return (cluster.length - 1);
}

function updateDataInCluster(cluster,existId,type, newData){
  let obj, oldObj;
  oldObj = cluster[existId];
  if (type == 'addr'){
    obj = new Addr(newData, true);
    obj['hot'] = oldObj['hot'];
  }else{
    obj = new Tx(newData, true);
    obj['good'] = oldObj['good'];
  }
  obj['color'] = oldObj['color'];
  obj['div'] = oldObj['div'];
  obj['position'] = oldObj['position'];
  obj['isDrawn'] = true;
  cluster[existId] = obj;
}

function checkAddrInCluster(cluster,addr){
  for(let i=0; i< cluster.length; i++){
    if (cluster[i]['type'] =='addr' &&
        cluster[i]['addr'] == addr){
      if(cluster[i]['real']){//real address exist
        return [true, i];
      }
      else{//tmp address exist
        return [false, i];
      }
    }
  }//no data
  return [false, null];
}

function checkTxInCluster(cluster,hash){
  for(let i=0; i< cluster.length; i++){
    //console.log("all cluster : ", cluster[i]);
    if (cluster[i]['type'] == 'tx' &&
        cluster[i]['transaction_hash'] == hash){
        if(cluster[i]['real']){//real address exist
          return [true, i];
        }
        else{//tmp address exist
          return [false, i];
        }
    }
  }
  return [false, null];
}

//row : one row of tx including address info
//return list of [parent, childnodes]
function addTxInCluster(cluster, rowString){
  let newIdList =[];
  //parent(addr)
  let existId = checkTxInCluster(cluster, rowString['transaction_hash']);
  if (existId[1] == null){//brand new data
      let newPId = addElementInCluster(cluster, new Tx(rowString, true));
      newIdList.push(newPId);
  }else{//data exist
      newIdList.push(existId[1]);
      if(!existId[0]){//tmp data
        updateDataInCluster(cluster,existId[1], 'tx',rowString);
      }
      //do nothing for exsting real data
  }

  let othersJSON = JSON.parse(rowString['others']);
  //child(addr)
  let inputAddr = othersJSON['inputs'];
  let outputAddr = othersJSON['out'];
  let addrs = inputAddr.concat(outputAddr);

  for(let i=0; i<addrs.length; i++){
    let isValid = 'addr' in addrs[i];
    if(!isValid) {continue;}

    let addr = addrs[i]['addr'];
    existId = checkAddrInCluster(cluster, addr);
    if (existId[1] == null){//brand new data
        let data = {
          'addr' : addrs[i]['addr'],
          'position' : [getPositionX(addrs.length, i),getPositionY(addrs.length, i)]
        };
        let newCId = addElementInCluster(cluster, new Addr(data, false));
        newIdList.push(newCId);
    }else{//data exist
        newIdList.push(existId[1]);
        //do nothing for exsting real, tmp data
    }
  }
  return newIdList;
}


//rows : many rows with same addr, diff tx
//return list of [parent, childnodes]
function addAddrInCluster(cluster, rows){
  let newIdList =[];
  //parent(addr)
  let existId = checkAddrInCluster(cluster, rows[0]['addr']);
  if (existId[1] == null){//brand new data
      let newPId = addElementInCluster(cluster, new Addr(rows[0], true));
      newIdList.push(newPId);
  }else{//data exist
      newIdList.push(existId[1]);
      if(!existId[0]){//tmp data
        updateDataInCluster(cluster,existId[1], 'addr', rows[0]);
      }
      //do nothing for exsting real data
  }

  //child(tx)
  for(let i=0; i<rows.length; i++){
    let hash = rows[i]['transaction_hash'];
    existId = checkTxInCluster(cluster, hash);
    if (existId[1] == null){//brand new data
        let data = {
          'transaction_hash' : rows[i]['transaction_hash'],
          'position' : [getPositionX(rows.length, i),getPositionY(rows.length, i)]
        };
        let newCId = addElementInCluster(cluster, new Tx(data, false));
        newIdList.push(newCId);
    }else{//data exist
        newIdList.push(existId[1]);
        //do nothing for exsting real, tmp data
    }
  }
  return newIdList;
}

//add lines connecting parent and children (parent : addr/tx, child : tx/addr)
function addLine(lines, addedId){
  //console.log("lines: ", lines, "adddedId : ",addedId);
  let parentId  = addedId[0];
  let arr = [parentId + 'ele'];
  for(let i=1; i<addedId.length; i++){
    if (addedId[i] > parentId){
      arr.push(addedId[i] + 'ele');
    }
  }
  if (arr.length > 1){
    lines.push(arr);
    drawLine(arr);
  }
}

//=============== position realted function ================
function getTheta(length, i){
  let dividend = 360 / length; //ex - 51
  let degree = dividend * i; //ex - 306
  return Math.PI * (degree / 180);
}

function getPositionX (length, i){
  let theta = getTheta(length, i);
  let radius = 200;
  return  Math.round(radius * Math.cos(theta));
}

function getPositionY (length, i){
  let theta = getTheta(length, i);
  let radius = 200;
  return Math.round(radius * Math.sin(theta));
}
