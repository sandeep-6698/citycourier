$(document).ready(()=>{
  $(document).on('click','.editButton',function(e){
      $('#lable').html($(this).attr('id'))
      $('#input').attr('name',$(this).attr('id').toLowerCase())
    $("#update-modal").css('display','block');
  })
  $(document).on('click','.closeButton',function(e){
    $("#update-modal").css('display','none');
    $('#input').val('');
  })
  $(document).on('click','.submitChange',function(e){
    let filedName = $('#input').attr('name');
   
    $.ajax({
        url: 'localhost:9000/user/updateProfile',
        type: 'post',
        data: {filedName: $('#input').val()},
        success: function(data){
            console.log(data)
        }
    })
    $('.closeButton').click();
  })
})