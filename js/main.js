window.onload = function(){
    var input = document.getElementById('input'),
        doit = document.getElementById('evaluate'),
        processed = true;
    
    doit.addEventListener('click', calc);
    
    document.onkeypress = function(e){
        e = e || window.event;
        if(!e.key.match(/[0-9\(\)\+\-\*\/]/)){
            return false;
        }
        if(processed){
            input.value = '';
            processed = false;
        }
        input.value += e.key;
    }
    
    document.onkeydown = function(e) {
        e = e || window.event;
        if(e.keyCode == 27){
            input.value = '';
        }else if(e.keyCode == 13){
            calc();
        }else if(e.keyCode == 8){
            input.value = input.value.slice(0,-1);
        }
    };
    
    function calc(){
        if(!input.value) return false;
        try{
            input.value = calculate(getRPN(parseStringToArray(input.value)));
        }catch(e){
            input.value = 'Error';
        }
        processed = true;
    }
};
