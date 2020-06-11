document.write("<script src ='javascripts/drag.js'></script>");
/*
  Basic algorithm

  drawCluster
  0. setColor of element
  case1. Already drawn
        -> draw On canvas
  case2. Not drawn
        -> crateTx(Addr)
          -> createDiv
          -> createCanvas
          -> draw On Canvas(rect or circle)
*/


//Create canvas
function createCanvas(){
  var myCanvas = document.createElement('canvas');
  myCanvas.width = '100';
  myCanvas.height = '100';
  myCanvas.style.border = '1px solid black';
  return myCanvas;
}

//Create Div
function createDiv(num){
  const container = document.getElementById("container_image");
  var iDiv = document.createElement('div');
  iDiv.id = num + 'ele';
  iDiv.style.zIndex = num;
  iDiv.style.position = 'absolute';
  container.appendChild(iDiv);
  dragElement(iDiv);
  return iDiv;
}


function drawCircleOnCanvas(myDiv,color){ //myCanvas : canvas element
  //Draw circle in canvas
  let myCanvas = myDiv.childNodes[0];
  var ctx = myCanvas.getContext("2d");
  var circle = new Path2D();
  circle.arc(50, 50, 30, 0, 2 * Math.PI);
  ctx.fillStyle = color;
  ctx.fill(circle);
}


function drawRectangleOnCanvas(myDiv,color){
  let myCanvas = myDiv.childNodes[0];
  var ctx = myCanvas.getContext("2d");
  ctx.fillStyle = color
  ctx.strokeRect(10, 10, 80, 80);
}

//crateTx
function createTx(num,color){
  //console.log("draw tx");
  let myDiv = createDiv(num);
  let myCanvas = createCanvas();
  myDiv.appendChild(myCanvas);
  drawRectangleOnCanvas(myDiv,color);
  return myDiv;
}

//createAddress
function createAddr(num,color){
  //console.log("draw addr");
  let myDiv = createDiv(num);
  let myCanvas = createCanvas();
  myDiv.appendChild(myCanvas);
  drawCircleOnCanvas(myDiv,color);
  return myDiv;
}

function setColorInCluster(cluster){
  console.log("color setting");
  var i = 0;
  for (i; i<cluster.length; i++){
    let item = cluter[i];
    if (item['type'] == 'tx'){//TX
      item['color'] = COLOR_BAD_TX;
      if(item['good']){//good_TX
        item['color'] = COLOR_GOOD_TX;
      }
    }else{//ADDR
      item['color'] = COLOR_COLD_ADDR;
      if(item['hot']){//good_TX
        item['color'] = COLOR_HOT_ADDR;
      }
    }
  }
}

function drawElementOnCanvas(item){
    if(item['type'] == 'tx'){
      drawRectangleOnCanvas(item['div'], item['color']);
    }else{//Addr
      drawCircleOnCanvas(item['div'], item['color']);
    }
}

function drawCluster(cluster){
  console.log("draw cluster");
  setColorInCluster(cluster);
  var i = 0;
  for(i=0; i<cluster.length; i++){
     //Already drawn
    if ('isDrawn' in cluster[i]){
      drawElementOnCanvas(cluster[i]);
      continue;
    }
    //Not Drawn
    else{
      cluster[i]['isDrawn'] = true;
      //Tx
      if (cluster[i]['type']=='tx'){
        let myDiv = createTx(i,cluster[i]['color']);
        cluster[i]['div'] = myDiv;
      }
      //Addr
      else{
        //console.log("time to draw address");
        let myDiv = createAddr(i, cluster[i]['color']);
        cluster[i]['div'] = myDiv;
      }
    }
  }
}



function drawLine(){

}
