$(document).ready(function(){
    console.log('page loaded...'); 
    var id = null;
    $.ajax({
        type: 'GET',
        url: 'http://localhost:4000/tasks',
        dataType: 'json',
        success: function (data) {
            $.each(data.data, function (k, v) {
                console.log(k + " : " + v.taskString);
                console.log('taskID'+ v.taskID);
                $("#taskList ul").append("<li>" +v.taskID +' : '+ v.taskString +"</li>");
                $('li').addClass('list-group-item list-group-item');
                });
             $('ul li').on('click',function(){
                    $('li').removeClass('active');
                    $(this).addClass('active');
                    var liText = $(this).text();
                    var temp = [];
                        temp = liText.split(':');
                    id = temp[0];
                });
        }
    });
    $("#btn1").click(function(){
        $.ajax({
            type: 'GET',
            url: 'http://localhost:4000/tasks/add?taskString='+ $('#inputTask').val(),
            success: function(data){
                console.log("SUCCESS: ", data);
                },
            error : function(e) {
                console.log("ERROR: ", e);
            },
            done : function(e) {
                console.log("DONE");
            }
            });
            console.log("SUCCESS: ertwrtertrta");
            window.location.reload(true);
    });
   
    $("#btn2").on("click",function() {        
    $.ajax({
        method: 'POST',
        url: 'http://localhost:4000/tasks/delete',
        data:{
            name: id       
        },
        success: function(data){
           console.log("SUCCESS: ", data);
            window.location.reload(true);
        },        
        error: function(){
            console.log('erorr');
        }
        });
        
    });
});     