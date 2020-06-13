//clicked search btn
function searchData(type){
    console.log("in search data");
    var value = document.getElementById(type+"_input").value;
    //type : block, tx, addr
    socket.emit(type, value);
}

//clicked hot_btn only
function displayHotOnly(){
  alert("hot only");
}

//clicked color circle
function colorChoose(id){
  createNewDialog('dialog', id);
}

/*let chooseColor = function(id) {
  return function curried_func(e) {
       createNewDialog('dialog', id);
   }
}*/

//clicked setting_complete_btn
function setCondition(){
  let time_val = document.getElementById('time_condition_input').value;
  let number_val = document.getElementById('used_number_input').value;
  alert("time_val: " + time_val + "number_val" + number_val);
}

//========== event regarding bitcoin element ==========//
let showInfoDiv = function(num) {
  return function curried_func(e) {
       let infoDiv = document.getElementById(num +'info');
       infoDiv.style.visibility = 'visible';
   }
}

let hideInfoDiv = function(num) {
  return function curried_func(e) {
       let infoDiv = document.getElementById(num +'info');
       infoDiv.style.visibility = 'hidden';
   }
}

let getMoreData = function(num) {
  return function curried_func(e) {
       let chosenEle = cluster[num];
       if (chosenEle['real']){
          console.log("no more data to get from this");
          return;
       }
       else{
          if (chosenEle['type'] == 'tx'){
            console.log("txhere", chosenEle['transaction_hash']);
            socket.emit('tx', chosenEle['transaction_hash']);
          }else{
            console.log("addrhere", chosenEle['addr']);
            socket.emit('addr', chosenEle['addr']);
          }
       }
   }
}
