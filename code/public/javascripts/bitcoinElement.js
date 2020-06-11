function Block(data){
  if(data!=null){
    data['show'] = true;
    return data;
  }
  console.log("Failed making block object");
}

function Tx(data){
  if(data!=null){
    data['type'] = 'tx';
    data['good'] = true;
    return data;
  }
  console.log("Failed making tx object");
}

function Addr(data){
  if(data!=null){
    data['type'] = 'addr';
    data['hot'] = false;
    return data;
  }
  console.log("Failed making addr object");
}

function addElementInCluster(cluster, element){
  cluster.push(element);
  console.log("cluster", cluster);
}
