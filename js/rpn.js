const parseStringToArray = str => {
    let arr = str.replace(/\s+/g,'').split(/(\d+|[^ 0-9])/);
    return arr.filter(item => item);
}

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
            case '(':
                stack.push(value);
                openBracket = true;
                break;
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
            default:
                output.push(value);
        }
    }
    if(openBracket){
        throw new Error('Open bracket');
    }
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