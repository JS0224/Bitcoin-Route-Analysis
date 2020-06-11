//clicked hot_btn only
function displayHotOnly(){
  alert("hot only");
}

//clicked color circle
function colorChoose(id){
  createNewDialog('dialog', id);
}

//clicked setting_complete_btn
function setCondition(){
  let time_val = document.getElementById('time_condition_input').value;
  let number_val = document.getElementById('used_number_input').value;
  alert("time_val: " + time_val + "number_val" + number_val);
}
