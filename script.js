


let timer = null;

var startTimer = function (startValue) {
    if (!timer) {
      let futureTime = Date.now() + (startValue * 1000);
      timer = setInterval(function () {
        timeRemaining = Math.floor((futureTime - Date.now())/1000);
        $('#timer-value').text(timeRemaining)
        $('#startButton').click(function () {
            futureTime += 1;
        })

        if (timeRemaining < 0) {
            clearInterval(timer);
            $('#timer-value').text('Time is up! Game Over!')
        } else if (timeRemaining < 5) {
            $('#timer-value').css('color', 'red');
        } else if (timeRemaining < 10) {
            $('#timer-value').css('color', 'yellow');
        } else if(timeRemaining < 30) {
            $('#timer-value').css('color', 'lime');
        } else {
            $('#timer-value').css('color', 'skyblue');
        }
      }, 20); 
    }
};

const randomNum = (numberLimit) => {
    let num = Math.floor((Math.random() * numberLimit) + 1);
    return num;
};

const operatorSelection = () => {
    let operator = (document.getElementById('sum').checked) ?        '+':
                   (document.getElementById('minus').checked) ?      '-':
                   (document.getElementById('multiply').checked) ?   'X':
                   (document.getElementById('divide').checked) ?     '/':
                   'operatorSelection error.'; 
    return operator;
};

const numberLimit = () => {
    let rangeValue = $('#numLimit').val()
    console.log('rangeValue: ' + rangeValue);
    return rangeValue;
}

const randomEquation = () => {
    let rangeValue = numberLimit();
    let result;
    let operator = operatorSelection();
    console.log('operator: ' + operator);
    let a = randomNum(rangeValue);
    console.log('a: ' + a);
    let b = randomNum(rangeValue);
    console.log('b: ' + b);
    $('#mathOpValue').text(`${a} ${operator} ${b}`)
    switch (operator) {
        case '+':
        result = a + b;
        break
        case '-':
        result = a - b;
        break 
        case 'X':
        result = a * b;
        break
        case '/':
        result = a / b;
        break
    }
    console.log('result: ' + result);
    return result;
}



window.onload = function () {
    startTimer(10);
    
    $('#numLimitLabel').text(`Number Limit : ${numberLimit()}`);

    $('#numLimit').on('click', function () {
        $('#numLimitLabel').text(`Number Limit : ${numberLimit()}`);
    })

    //let sumOption = document.getElementById('sum');
    console.log(document.getElementById('sum').checked)
    console.log(operatorSelection());
    randomEquation();
      
};


