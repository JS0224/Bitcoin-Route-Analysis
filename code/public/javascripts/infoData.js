function getInfoData(data){
  if (data['type'] == 'tx'){
    return getTxData(data);
  }
  return getAddrData(data);
}

function getAddrData(data){
  let text;
  if (data['real']){
    let input = data['input']? "YES" : "No";
    text =
      "addr : " + data['addr'] + '</br>' +
      "balance : " + data['balance'] + '</br>' +
      "block : " + data['block_height'] + '</br>' +
      "hot : " + data['hot'] + '</br>' +
      "input_addr : " + input;
  }else{
    text =
      "addr : " + data['addr'];
  }
  return text;
}

function getTxData(data){
  let text;
  if (data['real']){
    text =
      "block : " + data['block_height'] + '</br>' +
      "hash : " + data['transaction_hash'] + '</br>' +
      "fee : " + data['fee'] + '</br>' +
      "input_bal : " + data['input_balance'] + '</br>' +
      "output_bal :" + data['output_balance'] + '</br>' +
      "time : " + getTime(data['time']);
  }else{
    text =
      "hash : " + data['transaction_hash'];
  }
  return text
}

function getTime(time){
  var date = new Date(time * 1000);
  let year = date.getYears();
  let hour = date.getHours();
  let min = "0" + date.getMinutes();
  let sec = "0" + date.getSeconds();
  var format = year + 'y ' + hour + ':' + min.substr(-2) + ':' + seco.substr(-2);
  console.log(format);
}
