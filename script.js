
$(document).ready(function(){


    let interval = null;
    let score = 0;
    let topScore = 0;
    let correctResult;
    let userAnswer;
    let timeLeft = 10;

    const randomNum = (numberLimit) => {
        let num = Math.floor((Math.random() * numberLimit) + 1);
        return num;
    };

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
            case 'x':
            result = a * b;
            break
            case '/':
            result = a / b;
            break
        }
        console.log('result: ' + result);
        return result;
    };

    const newQuestion = () => {
        correctResult = randomEquation();
    }

    const checkAnswer = (userAnswer, correctResult) => {
        if (Number(userAnswer) === correctResult) {    
            score += 1;
            $('#gameScore').text(`Score: ${score}`);
            newQuestion();
            updateTimeLeft(+1);
        }
    };

    const numberLimit = () => {
        let rangeValue = $('#numLimit').val()
        console.log('rangeValue: ' + rangeValue);
        return rangeValue;
    }
    
     


    const operatorSelection = () => {
        let operator = (document.getElementById('sum').checked) ?        '+':
                       (document.getElementById('minus').checked) ?      '-':
                       (document.getElementById('multiply').checked) ?   'x':
                       (document.getElementById('divide').checked) ?     '/':
                       'operatorSelection error.'; 
        return operator;
    };

    
    const updateTimeLeft = (amount) => {
        timeLeft += amount;
        $('#timer-value').text(timeLeft)
    }

    const startGame = () => {

        $('#numLimit').prop('disabled', true);
        $('.filter').prop('disabled', true);
        $('#reset').prop('disabled', true);
        $('#timer-value').text('')

        if (!interval) {
            if (timeLeft === 0) {
                updateTimeLeft(10);
            };

            interval = setInterval(function () {
                updateTimeLeft(-1);
                $('#timer-value').text(timeLeft)
               
                if (timeLeft === 0) {
                    $('#timer-value').text('XX');
                    $('#playerInputValue').css('opacity', '0%');
                    $('#playerInputValue').css('disabled', 'true');
                    $('#reset').prop('disabled', false);
                    stopTimer();
                    if (score > topScore) {
                        topScore = score;
                        $('#topScore').text(`Top score: ${topScore}`);
                    }
                } 
                console.log(timeLeft);
            }, 1000);
        }
    }

    

    const stopTimer = () => {
        clearInterval(interval);
        interval = null;
        $('#numLimit').prop('disabled', false);
        $('.filter').prop('disabled', false);
    } 
    $('#timer-value').text('10')
    newQuestion();
    
    console.log('correctResult: ' + correctResult);

    $('#numLimitLabel').text(`Number Limit: ${numberLimit()}`);

    $('#numLimit').on('click', function () {
        $('#numLimitLabel').text(`Number Limit: ${numberLimit()}`);
        newQuestion();
    });
    $('.filter').on('click', function () {
        newQuestion();
    });


    $('#reset').on('click', function () {
        $('#playerInputValue').css('disabled', 'false');
        $('#playerInputValue').css('opacity', '100%');
        $('#timer-value').text('10')
        score = 0;
        $('#gameScore').text(`Score: ${score}`);
        newQuestion();
    })
    

    $('#playerInputValue').on('keyup', function (event) {
        console.log(event.key)
        
        if (event.key === 'Enter') {
            startGame();
            userAnswer = $('#playerInputValue').val();
            checkAnswer(userAnswer, correctResult);
            $('#playerInputValue').val('');
        }
    });
}); 












 





// TIMER FUNCTION
/* 
const startTimer = function (startValue) {
    $('#numLimit').prop('disabled', true);
    $('.filter').prop('disabled', true);
    $('#timer-value').text('')
    if (!timer) {
      let futureTime = Date.now() + (startValue * 1000);
      timer = setInterval(function () {
      let timeRemaining = Math.floor((futureTime - Date.now())/1000);
        $('#timer-value').text(timeRemaining)
        
        $('#playerInputValue').on('keyup', function (event) {
            
            
            if (event.key === 'Enter') {
                console.log('1a camada.')
                console.log('correctResult: ' + correctResult + ' ' + typeof correctResult);
                
                console.log('userAnswer: ' + userAnswer +  ' ' + typeof userAnswer);
                if (Number(userAnswer) === correctResult) {
                    console.log('voilá.');
                    futureTime += 10;
                }
            }
        });
        if (timeRemaining === 0) {
            $('#timer-value').text('Time is up! Game Over!')
            count = 0;
            stopTimer();
        } else if (timeRemaining < 5) {
            $('#timer-value').css('color', 'red');
        } else if (timeRemaining < 10) {
            $('#timer-value').css('color', 'yellow');
        } else if(timeRemaining < 30) {
            $('#timer-value').css('color', 'lime');
        } else {
            $('#timer-value').css('color', 'skyblue');
        }
      }, 300); 
    }
}; 
*/

// STOP TIMER
/*
const stopTimer = () => {
    window.clearInterval(timer);
    timer=null;
    
    $('#numLimit').prop('disabled', false);
    $('.filter').prop('disabled', false);
} 
*/

// NUMBER LIMIT
/* 

const numberLimit = () => {
    let rangeValue = $('#numLimit').val()
    console.log('rangeValue: ' + rangeValue);
    return rangeValue;
}

const numLimDisplay = (value) => {
    $('#numLimitLabel').text(`Number Limit: ${value}`)
} 

*/

// OPERATOR SELECTION
/*
const operatorSelection = () => {
    let operator = (document.getElementById('sum').checked) ?        '+':
                   (document.getElementById('minus').checked) ?      '-':
                   (document.getElementById('multiply').checked) ?   'x':
                   (document.getElementById('divide').checked) ?     '/':
                   'operatorSelection error.'; 
    return operator;
};
*/

// WINDOW ONLOAD LOGIC
/*
window.onload = function () {
    
    correctResult = randomEquation();
    console.log('correctResult: ' + correctResult);

    $('#numLimitLabel').text(`Number Limit: ${numberLimit()}`);

    $('#numLimit').on('click', function () {
        $('#numLimitLabel').text(`Number Limit: ${numberLimit()}`);
        correctResult = randomEquation();
    });
    $('.filter').on('click', function () {
        correctResult = randomEquation();
    });

    $('#playerInputValue').on('keyup', function (event) {
        console.log(event.key)
        
        if (event.key === 'Enter') {
            userAnswer = $('#playerInputValue').val();
            console.log('userAnswer: ' + userAnswer);
            playGame();
            $('#playerInputValue').val('');
              

        }
    })

    $('#startButton').on('click', function () {
        startTimer(10);
    });
    $('#reset').on('click', function () {
        console.log('Reset clicked!');
        stopTimer();
    });
    //let sumOption = document.getElementById('sum');
    console.log(document.getElementById('sum').checked)
    console.log(operatorSelection());      
};
*/
