window.onload = function(){
    var input = document.getElementById('input'),
        doit = document.getElementById('evaluate'),
        processed = true;
    
    doit.addEventListener('click', calc);
    
    document.onkeypress = function(e){
        e = e || window.event;
        // C клавиатуры возможен ввод только цифр и символов +-*/()
        if(!e.key.match(/[0-9\(\)\+\-\*\/]/)){
            return false;
        }
        // Если уже была произведена какая-либо операция - очистить дисплей калькулятора
        if(processed){
            input.value = '';
            processed = false;
        }
        input.value += e.key;
    }
    
    document.onkeydown = function(e) {
        e = e || window.event;
        /*
           27 - Escape - очистить поле
           13 - Enter  - вычислить выражение
           8  - Backspace - убрать последний введенный символ
        */
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
