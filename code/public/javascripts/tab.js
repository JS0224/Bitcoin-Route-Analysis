//tab
function tabToggle(){
  $('ul.tabs li').click(function(){
    var tab_id = $(this).attr('data-tab');
    $('ul.tabs li').removeClass('current');
    $('.tab-content').removeClass('current');
    $(this).addClass('current');
    $("#"+tab_id).addClass('current');
  })
}

//data selection
function formToggle(){
  $('div.selection-div div').click(function(){
    //console.log("click");
    var div_id = $(this).attr('select-div');
    $('div.selection-div div').removeClass('selection-current');
    $('.form-content').removeClass('form-current');
    $(this).addClass('selection-current');
    $("#"+div_id + "_form").addClass('form-current');
  })
}
