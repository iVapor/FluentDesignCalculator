import React, { Component } from 'react'
import "./showAnswer.css"

let log = console.log.bind(this)

let numberToStr = (index, value) => {
    let numStr =  value.toString(index)
    if (numStr.length > 12) {
        numStr = "∞"
    }

    return numStr
}

let displayValue = (type, value) => {
    log('value', value)
    //standard value is big than container.
    let useSciE = (value > 10^12) && (type === 'standard')
    log('useSciE', useSciE)
    if (useSciE) {
        type = 'sciE'
    }

    log('type', type)

    var transform = {
        standard : value,
        sciE: value.toExponential(3),
        bin : numberToStr(2, value),
        oct : numberToStr(8, value),
        hex : numberToStr(16, value)
    }

    return transform[type]
}

let displayInput = (value) => {
    return value
}

/*
* function: display answers.
* props:
* params: [
*   type : can be input, standard, sciE, bin, oct, hex.
*   value
*   ]
*/
class ShowAnswer extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        let type = this.props.type
        let value = this.props.value

        var numInCal
        if (type === 'input') {
            numInCal = displayInput(value)
        } else {
            numInCal = displayValue(type, value)
        }

        return (
            <div className="showAnswer">
                {numInCal}
            </div>
        )
    }
}

export default ShowAnswer