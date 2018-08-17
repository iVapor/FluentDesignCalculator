let log = console.log.bind(console)

let divideCalcul = (firstNum, secondNum) => {
    let finalValue
    if (secondNum === 0) {
        finalValue = 'ERROR'
    }
    finalValue = firstNum / secondNum

    return finalValue
}

let twoEleStandardAlgoLib = (operator, firstNum, secondNum) => {
    log('In twoEleStandardAlgoLib')
    let operatorFunc = {
        divide: divideCalcul(firstNum, secondNum),
        multiply: firstNum * secondNum,
        minus: firstNum - secondNum,
        plus: firstNum + secondNum,
    }

    log("operator", operator)
    let result = operatorFunc[operator]
    log('Number(result)', Number(result))
    let hugeNum = Number(result) > 10e12
    if (!Number.isInteger(result)) {
        result = result.toFixed(3)
    }
    log('hugeNum', hugeNum)
    if (hugeNum) {
        result = result.toExponential(3)
    }
    return result
}

export default twoEleStandardAlgoLib