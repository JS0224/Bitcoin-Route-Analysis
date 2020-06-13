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
    return data;
  }
  console.log("Failed making tx object");
}

function Addr(data,center){
  if(data!=null){
    data['real'] = true;
    data['type'] = 'addr';
    data['hot'] = false;
    if (!center){//child node
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

//row : one row of tx including address info
function addTxInCluster(cluster, rowString){
  //parent(tx)
  addElementInCluster(cluster, new Tx(rowString), true)
  let othersJSON = JSON.parse(rowString['others']);

  //child(addr)
  let input_addr = othersJSON['inputs'];
  let output_addr = othersJSON['out'];
  for(let i=0; i<input_addr.length; i++){
    let isValid = 'addr' in input_addr[i];
    if (isValid){
      let data = {'addr' : input_addr[i]['addr']};
      addElementInCluster(cluster, new Addr(data, false));
    }
    else;
  }
  for(let i=0; i<output_addr.length; i++){
    let isValid = 'addr' in output_addr[i];
    if (isValid){
      let data = {'addr' : output_addr[i]['addr']};
      addElementInCluster(cluster, new Addr(data, false));
    }
  }
}

//rows : many rows with same addr, diff tx
function addAddrInCluster(cluster, rows){
  //parent(addr)
  addElementInCluster(cluster, new Addr(rows[0]), true);

  //child(tx)
  for(let i=0; i<rows.length; i++){
    let data = {'transaction_hash' : rows[i]['transaction_hash']};
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
