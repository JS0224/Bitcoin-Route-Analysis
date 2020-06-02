document.write("<script src='javascripts/html5kellycolorpicker.min.js'></script>");
document.write("<script src ='javascripts/jquery-ui.js'></script>");
//참고 주석 https://www.cssscript.com/canvas-based-html5-hsv-color-picker-component/
function createNewDialog(id, caller){
  console.log("in the function");
  jQuery('#color').show();
  $('#'+id).dialog({
    buttons: {
      "Okay": function() {
        $( this ).dialog( "close" );

        let currentColor = document.getElementById("color").value;
        $('#' + caller + "_value").text(currentColor);
        console.log("the value of " +caller + " is " + currentColor);
      }
    }
  });
  KellyColorPicker({
      place : 'picker',
      input : 'color'
  })
}
