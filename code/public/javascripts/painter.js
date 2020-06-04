function drawCircle(myDiv,color){ //myCanvas : canvas element
  //Create canvas
  var myCanvas = document.createElement('canvas');
  myCanvas.width = '100';
  myCanvas.height = '100';
  myCanvas.style.border = '1px solid black';
  myDiv.appendChild(myCanvas);

  //Draw circle in canvas
  var ctx = myCanvas.getContext("2d");
  var circle = new Path2D();
  circle.arc(50, 50, 30, 0, 2 * Math.PI);
  ctx.fillStyle = color;
  ctx.fill(circle);
}

function drawRectangle(myDiv){
  //Create canvas
  var myCanvas = document.createElement('canvas');
  myCanvas.width = '100';
  myCanvas.height = '100';
  myCanvas.style.border = '1px solid black';
  myDiv.appendChild(myCanvas);

  //Draw circle in canvas
  var ctx = myCanvas.getContext("2d");
  ctx.strokeRect(10, 10, 80, 80);
}

function drawLine(){

}

function drawTx(num){
  console.log("draw tx");
  const container = document.getElementById("container_image");
  var iDiv = document.createElement('div');
  iDiv.id = num + 'ele';
  container.appendChild(iDiv);
  drawRectangle(iDiv);
}

function drawAddr(num){
  console.log("draw addr");
  const container = document.getElementById("container_image");
  var iDiv = document.createElement('div');
  iDiv.id = num + 'ele';
  container.appendChild(iDiv);
  drawCircle(iDiv, 'red');
}

function drawCluster(cluster){
  console.log("draw cluster");
  var i = 0;
  for(i=0; i<cluster.length; i++){
    if ('isDrawn' in cluster[i]){ //Already drawn
      continue;
    }
    else{//Not drawn
      cluster[i]['isDrawn'] = true;
      if (cluster[i]['type']=='tx'){//TX
        drawTx(i);
      }
      else{//Addr
        console.log("time to draw address");
        drawAddr(i);
      }
    }
  }
}
