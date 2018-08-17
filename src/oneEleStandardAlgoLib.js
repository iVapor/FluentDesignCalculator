let log = console.log.bind(console)

let reciprocalCalcul = (num) => {
    let finalValue
    if (num === 0) {
        finalValue = 'ERROR'
    }
    finalValue = 1 / num

    return finalValue
}

let percentCalcul = (num) => {
    return num / 100
}

let negativeCalcul = (num) => {
    return -num
}

let oneEleStandardAlgoLib = (operator, num) => {
    num = Number(num)

    let operatorFunc = {
        percent: percentCalcul(num),
        sqrt: Math.sqrt(num),
        square: num * num,
        reciprocal: reciprocalCalcul(num),
        negative: negativeCalcul(num),
        dot: num + '.'
    }

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

export default oneEleStandardAlgoLib