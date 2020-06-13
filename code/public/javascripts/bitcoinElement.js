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

function addElementInCluster(cluster, element){
  cluster.push(element);
  console.log("cluster", cluster);
}


function checkAddrInCluster(cluster,addr){
  for(let i=0; i< cluster.length; i++){
    if (cluster[i]['type'] =='addr' &&
        cluster[i]['addr'] == addr){
      return i;
    }
  }
  return null;
}

function checkTxInCluster(cluster,hash){
  for(let i=0; i< cluster.length; i++){
    //console.log("all cluster : ", cluster[i]);
    if (cluster[i]['type'] == 'tx' &&
        cluster[i]['transaction_hash'] == hash){
      return i;
    }
  }
  return null;
}

//row : one row of tx including address info
function addTxInCluster(cluster, rowString){
  //parent(tx)
  let existId = checkTxInCluster(cluster, rowString['transaction_hash']);
  if (existId == null){
    addElementInCluster(cluster, new Tx(rowString, true));
  }else{//데이터가 이미 있음
    console.log("exsiting already" ,existId);
    cluster[existId] = new Tx(rowString, true);
    cluster[existId]['isDrawn'] = true;
  }


  let othersJSON = JSON.parse(rowString['others']);
  //child(addr)
  let inputAddr = othersJSON['inputs'];
  let outputAddr = othersJSON['out'];
  let addrs = inputAddr.concat(outputAddr);

  for(let i=0; i<addrs.length; i++){
    let isValid = 'addr' in addrs[i];
    if (isValid){
      let data = {
        'addr' : addrs[i]['addr'],
        'position' : [getPositionX(addrs.length, i),getPositionY(addrs.length, i)]
      };
      addElementInCluster(cluster, new Addr(data, false));
    }
    else;
  }
}

//rows : many rows with same addr, diff tx
function addAddrInCluster(cluster, rows){
  //parent(addr)
  let existId = checkAddrInCluster(cluster, rows[0]['addr']);
  if (existId == null){
      addElementInCluster(cluster, new Addr(rows[0], true));
  }else{//데이터가 이미 있음
    cluster[existId] = new Addr(rows[0], true);
    cluster[existId]['isDrawn'] = true;
  }

  //child(tx)
  for(let i=0; i<rows.length; i++){
    let data = {
      'transaction_hash' : rows[i]['transaction_hash'],
      'position' : [getPositionX(rows.length, i),getPositionY(rows.length, i)]
    };
    addElementInCluster(cluster, new Tx(data, false));
  }
}

//add lines connecting parent and children (parent : addr/tx, child : tx/addr)
function addLine(lines, parentIdNum, childNum){
  //console.log("parentID:, child num", parentIdNum, childNum);
  let arr = [];
  let i=0;
  for(; i<=childNum; i++){
    arr.push((parentIdNum + i) + 'ele');
  }
  lines.push(arr);
  drawLine(arr);
  //console.log("lines", lines);
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
  console.log("theta" , theta);
  return Math.round(radius * Math.sin(theta));
}
