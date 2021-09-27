
$(document).ready(function(){


    let interval = null;
    let score = 0;
    let topScore = 0;
    let correctResult;
    let userAnswer;
    let timeLeft = 10;
    
    let numPair = [];
    

    const randomNumPair = (numberLimit) => {
        let randomArr = [];
        for ( i = 0; i < 2; i++) {
            let num = Math.floor((Math.random() * numberLimit) + 1);
            randomArr.push(num);
        }
        console.log('randomArr: ' + randomArr);
        return randomArr;            
    };

    const getGameNumPair = (operator) => {
        let rangeValue = numberLimit();
        numPair = randomNumPair(rangeValue);
        if (operator === '-' || operator === '/') {
            numPair.sort(function(a , b) {
                return b - a;
            });
            if (operator === '/' && numPair[0] % numPair[1] !== 0) {
                getGameNumPair('/');
            }
        }
    }     
    

    const randomEquation = () => {
        
        let result;
        let operator = operatorSelection();
        console.log('operator: ' + operator);
        getGameNumPair(operator);
        let gamePair = numPair;
        console.log(gamePair); 
        let a = gamePair[0];
        console.log('a: ' + a);
        let b = gamePair[1];
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
            $('#playerInputValue').val('');
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
                    $('#playerInputValue').prop('disabled', true);
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
        $('#playerInputValue').prop('disabled', false);
        $('#playerInputValue').css('opacity', '100%');
        $('#timer-value').text('10')
        score = 0;
        $('#gameScore').text(`Score: ${score}`);
        newQuestion();
    })
    

    $('#playerInputValue').on('keyup', function (event) {
        console.log(event.key)
        
        startGame();
        userAnswer = $('#playerInputValue').val();
        checkAnswer(userAnswer, correctResult);
        
        
    });
}); 












 





