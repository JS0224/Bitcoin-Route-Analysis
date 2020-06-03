function Block(data){
  if(data!=null){
    data['show'] = true;
    return data;
  }
  console.log("Failed making block object");
}

function Tx(data){
  if(data!=null){
    data['show'] = true;
    data['type'] = 'tx';
    console.log(data['show']);
    return data;
  }
  console.log("Failed making tx object");
}

function Addr(data){
  if(data!=null){
    data['type'] = 'addr';
    data['show'] = true;
    return data;
  }
  console.log("Failed making addr object");
}

function addElementInCluster(cluster, element){
  cluster.push(element);
  console.log("cluster", cluster);
}
