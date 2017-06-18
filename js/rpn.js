//Парсит входящую строку - удаляет из нее пробелы и разбивает на токены
const parseStringToArray = str => {
    let arr = str.replace(/\s+/g,'').split(/(\d+|[^ 0-9])/);
    return arr.filter(item => item);
}

//Конвертирует входящий массив символов из инфиксной записи в обратную польскую нотацию (ОПН)
const getRPN = arr => {
    var operator = null,
        value = null,
        stack = [], 
        output = [],
        len = arr.length,
        openBracket = false;
    
    for(var i=0; i<len; i++){
        value = arr[i];
        switch(value){
            // Открывающие скобки добавляются в стек 
            case '(':
                stack.push(value);
                openBracket = true;
                break;
            // Если очередной символ  - закрывающая скобка -
            // идем по стеку и выталкиваем в выходную строку все операторы
            // пока не встретится открывающая скобка
            case ')':
                operator = stack.pop();
                while(operator !== '('){
                    if(!operator){
                        throw new Error('Brackets are inconsistent')
                    }
                    output.push(operator);
                    operator = stack.pop();
                }
                openBracket = false;;
                break;
            // В случае +- идем по стеку и выталкиваем в выходную строку всё содержимое
            // пока есть операторы и пока не встретится открывающая скобка
            case '+':
            case '-':
                if(stack.length){
                    operator = stack.pop();
                    while(operator && operator !== '('){
                        output.push(operator);
                        operator = stack.pop();
                    }
                    if(operator) stack.push(operator);
                }
                stack.push(value);
                break;
            // В случае */ если в стек не пуст - идем по нему и выталкиваем в выходную строку
            // все содержимое пока есть операторы и пока не встретится +-(
            case '*':
            case '/':
                if(stack.length){
                    operator = stack.pop();
                    while(operator && operator !== '+' && operator !== '-' && operator !== '('){
                        output.push(operator);
                        operator = stack.pop();
                    }
                    if(operator) stack.push(operator); 
                }
                stack.push(value);
                break;
            // Цифры сразу помещаются в выходную строку
            default:
                output.push(value);
        }
    }
    // Данная ошибка может возникнуть при некорректной входной строке, 
    // например " 1 + (2 "
    if(openBracket){
        throw new Error('Open bracket');
    }
    // Если в стеке остались операторы - дописываем их в выходную строку
    while(stack.length){
        output.push(stack.pop());
    }
    return output;
}

const operators = {
    '+': (x, y) => x + y,
    '-': (x, y) => x - y,
    '*': (x, y) => x * y,
    '/': (x, y) => x / y
};

//Вычисление выражения, записанного в ОПН
const calculate = rpn => {
    var stack = [];
    rpn.forEach(token => {
        if(token in operators){
            let [y, x] = [stack.pop(), stack.pop()];
            stack.push(operators[token](x, y));
        }else{
            stack.push(parseFloat(token));
        }
    });
    
    if(isNaN(stack[0]) || stack[0] == Infinity){
        throw new Error('Math error');
    }
    return stack[0];
};