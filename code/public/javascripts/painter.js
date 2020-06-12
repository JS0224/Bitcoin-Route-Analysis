document.write("<script src ='javascripts/drag.js'></script>");
//document.write("<script src='https://cdn.jsdelivr.net/npm/@svgdotjs/svg.js@3.0/dist/svg.min.js'></script>");
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
  myCanvas.width = '80';
  myCanvas.height = '80';
//  myCanvas.style.border = '1px solid black';
  return myCanvas;
}

//Create Div
function createDiv(num){
  const container = document.getElementById("container_image");
  var iDiv = document.createElement('div');
  iDiv.id = num + 'ele';
  iDiv.style.zIndex = num;
  iDiv.style.position = 'absolute';
  iDiv.classList.add('moving-part');
  container.appendChild(iDiv);
  dragElement(iDiv);
  return iDiv;
}

function drawCircleOnCanvas(myDiv,color){ //myCanvas : canvas element
  //Draw circle in canvas
  let myCanvas = myDiv.childNodes[0];
  var ctx = myCanvas.getContext("2d");
  var circle = new Path2D();
  circle.arc(40, 40, 35, 0, 2 * Math.PI);
  ctx.fillStyle = color;
  ctx.fill(circle);
}

function drawRectangleOnCanvas(myDiv,color){
  let myCanvas = myDiv.childNodes[0];
  var ctx = myCanvas.getContext("2d");
  ctx.fillStyle = color
  ctx.strokeRect(0, 0, 80, 80);
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
  //console.log("color setting");
  var i = 0;
  for (i; i<cluster.length; i++){
    let item = cluster[i];
    if (item['type'] == 'tx'){//TX
      item['color'] = colorArray[3];
      if(item['good']){//good_TX
        item['color'] = colorArray[2];
      }
    }else{//ADDR
      item['color'] = colorArray[1];
      if(item['hot']){//good_TX
        item['color'] = colorArray[0];
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
  $('.moving-part').connections('update');
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

//draw line connecting div1 and div2
function drawLine(div1, div2){
  $().connections({
    from: '#' + div1.id, to: '#' + div2.id,
    'class': 'single-line'
  });
}
