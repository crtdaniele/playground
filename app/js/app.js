console.log("Load script.js");

var app = {};

//GENERIC FUNCTION
function setCookie(key, value) {
    var expires = new Date();
    expires.setTime(expires.getTime() + 31536000000);
    document.cookie = key + '=' + value + ';expires=' + expires.toUTCString();
}

function getCookie(key) {
    var keyValue = document.cookie.match('(^|;) ?' + key + '=([^;]*)(;|$)');
    return keyValue ? keyValue[2] : null;
}

function getJson(url) {
    $(".boxtab__loading").show();
    
    var json = $.ajax({
        dataType: "json",
        url: url,
        async: true
    });

    return Promise.resolve(json)
}

function ValidateEmail(mail) 
{
 if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail))
  {
    return true
  }
    return false
}

function inputRequired(input, type, errorClass){
    if(type == "email"){
        if(!ValidateEmail(input.val())){
            input.addClass(errorClass);
        }else{
            input.removeClass(errorClass);
            return true;
        }
    }else{
        if(input.val().length == 0){
            input.addClass(errorClass);
        }else{
            input.removeClass(errorClass);
            return true;
        }
    }

    input.on('change', function (){
        if(type == "email"){
            if(!ValidateEmail(input.val())){
                input.addClass(errorClass);
            }else{
                input.removeClass(errorClass);
                return true;
            }
        }else{
            if(input.val().length == 0){
                input.addClass(errorClass);
            }else{
                input.removeClass(errorClass);
                return true;
            }
        }
    })
}