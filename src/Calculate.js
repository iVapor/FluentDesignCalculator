import React, { Component } from 'react'
import { FluentRevealEffect } from "fluent-reveal-effect"
import './Calculate.css'

import greenImg from "../public/images/green.jpg"
import dewdropImg from "../public/images/dewdrop.jpg"
import lucidImg from "../public/images/lucid.jpg"
import purpleImg from "../public/images/purple.jpg"

import oneEleStandardAlgoLib from './oneEleStandardAlgoLib'
import twoEleStandardAlgoLib from './twoEleStandardAlgoLib'

let log = console.log.bind(console)

class Calculate extends Component {
    constructor(props) {
        super(props)
        this.state = {
            displayNum: '0',
            displayFormula: '0',
            firstNum: '',
            secondNum: '',

            backgroundImg: greenImg,
            backgroundImgClass: ''
        }

        this.saveOprFormula = {
            disableNumDotNeg: '',
            opr: ''
        }
    }

    storeNum(num) {
        var displayNum = this.state.displayNum
        if (displayNum === '0' ) {
            displayNum = ''
        }
        if (num === '0' && displayNum === '0') {
            return
        }
        displayNum += num
        log('Line 31 In storeNum displayNum', displayNum)

        if (displayNum.length > 12) {
            return
        }
        this.setState({
            displayNum: displayNum
        })
    }

    oneEleCalcul(opr) {
        let { displayNum } = this.state
        let result = oneEleStandardAlgoLib(opr, displayNum)
        this.setState({
            displayNum : result
        })
    }

    saveTwoSymbol(opr) {
        let { displayNum } = this.state
        this.saveOprFormula.opr = opr

        let symbolOpr = {
            divide: '÷',
            multiply: '×',
            minus: '-',
            plus: '+'
        }
        let currentFormula = `${displayNum} ${symbolOpr[opr]}`
        this.setState({
            firstNum: displayNum,
            displayNum: '0',
            displayFormula: currentFormula
        })
    }

    calculTwoNum() {
        let displayNum = this.state.displayNum
        let firstNum = this.state.firstNum
        let symbol = this.saveOprFormula.opr
        log('symbol', symbol)
        var result = twoEleStandardAlgoLib(symbol, firstNum, displayNum)

        let symbolOpr = {
            divide: '÷',
            multiply: '×',
            minus: '-',
            plus: '+'
        }
        let currentFormula = `${firstNum} ${symbolOpr[symbol]} ${displayNum}`

        this.saveOprFormula.disableNumDotNeg = 'disable'
        this.setState({
            secondNum: displayNum,
            displayNum: result,
            displayFormula: currentFormula
        })
    }

    clearDisplay(action) {
        if (action === 'ce') {
            this.setState({
                displayNum: '0'
            })
        } else if (action === 'c') {
            this.saveOprFormula.disableNumDotNeg = ''
            this.setState({
                displayNum: '0',
                displayFormula: '0'
            })
        } else if (action === 'del') {
            let displayNum = this.state.displayNum
            let newDisplayNum = displayNum.slice(0, -1) || '0'
            this.setState({
                displayNum: newDisplayNum
            })
        }
    }

    changeBackground() {
        let { backgroundImg, backgroundImgClass } = this.state
        let backgroundLib = [ greenImg, dewdropImg, lucidImg, purpleImg ]
        let index = backgroundLib.indexOf(backgroundImg)
        index += 1
        if (index === 4) {
            index = 0
        }

        let imgClass =  (backgroundImgClass === 'changeBackgroundImg') ? '' : 'changeBackgroundImg'

        this.setState({
            backgroundImgClass: 'changeBackgroundImg'
        })

        setTimeout((() => {
            this.setState({
                backgroundImg: backgroundLib[index],
            })
        }), 1000)
        setTimeout((() => {
            this.setState({
                backgroundImgClass: ''
            })
        }), 2000)

    }

    //when mouse hover, button shows light effect.
    componentDidMount () {
        FluentRevealEffect.applyEffect(".effect-group-container", {
            clickEffect: true,
            lightColor: "rgba(20,20,20,0.8)",
            gradientSize: 80,
            isContainer: true,
            children: {
                borderSelector: ".btn-border",
                elementSelector: ".btn",
                lightColor: "rgba(20,20,20,0.3)",
                gradientSize: 150
            }
        })

        //For .title
        FluentRevealEffect.applyEffect(".title", {
            lightColor: "rgba(255,255,255,0.4)",
            gradientSize: 150
        })
    }
    render() {
        let { displayNum, displayFormula, backgroundImg, backgroundImgClass } = this.state

        return (
        <div className="Calcu">
            <div  className="background-img"  onClick={this.changeBackground.bind(this)}>
                <img src={backgroundImg} className={backgroundImgClass} alt="backgroundImg"/>
            </div >

            <div className="title"><span>Fluent </span><span>Design </span><span>Calculator</span></div>
            <div className="calcu-main">
                <div className="displayFormula">{displayFormula}</div>
                <div className="displayNum">
                    {displayNum}
                </div>
                <div className="calcu-button">
                    <table>
                        <tbody>
                        <tr>
                            <td>
                                <div className="effect-group-container">
                                    <div className="btn-border">
                                        <button className="btn"
                                                onClick={() => this.oneEleCalcul('percent')}
                                        >%</button>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <div className="effect-group-container">
                                    <div className="btn-border">
                                        <button className="btn"
                                                onClick={() => this.oneEleCalcul('sqrt')}
                                        >√</button>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <div className="effect-group-container">
                                    <div className="btn-border">
                                        <button className="btn"
                                                onClick={() => this.oneEleCalcul('square')}
                                        >x²</button>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <div className="effect-group-container">
                                    <div className="btn-border">
                                        <button className="btn"
                                                onClick={() => this.oneEleCalcul('reciprocal')}
                                        >1⁄x</button>
                                    </div>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div className="effect-group-container">
                                    <div className="btn-border">
                                        <button className="btn"
                                                onClick={() => this.clearDisplay('ce')}
                                        >CE</button>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <div className="effect-group-container">
                                    <div className="btn-border">
                                        <button className="btn"
                                                onClick={() => this.clearDisplay('c')}
                                        >C</button>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <div className="effect-group-container">
                                    <div className="btn-border">
                                        <button className="btn"
                                                onClick={() => this.clearDisplay('del')}
                                        >Del</button>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <div className="effect-group-container">
                                    <div className="btn-border">
                                        <button className="btn basic-opr"
                                                onClick={() => this.saveTwoSymbol('divide')}
                                        >÷</button>
                                    </div>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td className="input-num">
                                <div className="effect-group-container">
                                    <div className="btn-border">
                                        <button className="btn"
                                                onClick={() => this.storeNum('7')}
                                                disabled={this.saveOprFormula.disableNumDotNeg}
                                        >7</button>
                                    </div>
                                </div>
                            </td>
                            <td className="input-num">
                                <div className="effect-group-container">
                                    <div className="btn-border">
                                        <button className="btn"
                                                onClick={() => this.storeNum('8')}
                                                disabled={this.saveOprFormula.disableNumDotNeg}
                                        >8</button>
                                    </div>
                                </div>
                            </td>
                            <td className="input-num">
                                <div className="effect-group-container">
                                    <div className="btn-border">
                                        <button className="btn"
                                                onClick={() => this.storeNum('9')}
                                                disabled={this.saveOprFormula.disableNumDotNeg}
                                        >9</button>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <div className="effect-group-container">
                                    <div className="btn-border">
                                        <button className="btn basic-opr"
                                                onClick={() => this.saveTwoSymbol('multiply')}
                                        >×</button>
                                    </div>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td className="input-num">
                                <div className="effect-group-container">
                                    <div className="btn-border">
                                        <button className="btn"
                                                onClick={() => this.storeNum('4')}
                                                disabled={this.saveOprFormula.disableNumDotNeg}
                                        >4</button>
                                    </div>
                                </div>
                            </td>
                            <td className="input-num">
                                <div className="effect-group-container">
                                    <div className="btn-border">
                                        <button className="btn"
                                                onClick={() => this.storeNum('5')}
                                                disabled={this.saveOprFormula.disableNumDotNeg}
                                        >5</button>
                                    </div>
                                </div>
                            </td>
                            <td className="input-num">
                                <div className="effect-group-container">
                                    <div className="btn-border">
                                        <button className="btn"
                                                onClick={() => this.storeNum('6')}
                                                disabled={this.saveOprFormula.disableNumDotNeg}
                                        >6</button>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <div className="effect-group-container">
                                    <div className="btn-border">
                                        <button className="btn  basic-opr"
                                                onClick={() => this.saveTwoSymbol('minus')}
                                        >-</button>
                                    </div>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td className="input-num">
                                <div className="effect-group-container">
                                    <div className="btn-border">
                                        <button className="btn"
                                                onClick={() => this.storeNum('1')}
                                                disabled={this.saveOprFormula.disableNumDotNeg}
                                        >1</button>
                                    </div>
                                </div>
                            </td>
                            <td className="input-num">
                                <div className="effect-group-container">
                                    <div className="btn-border">
                                        <button className="btn"
                                                onClick={() => this.storeNum('2')}
                                                disabled={this.saveOprFormula.disableNumDotNeg}
                                        >2</button>
                                    </div>
                                </div>
                            </td>
                            <td className="input-num">
                                <div className="effect-group-container">
                                    <div className="btn-border">
                                        <button className="btn"
                                                onClick={() => this.storeNum('3')}
                                                disabled={this.saveOprFormula.disableNumDotNeg}
                                        >3</button>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <div className="effect-group-container">
                                    <div className="btn-border">
                                        <button className="btn basic-opr"
                                                onClick={() => this.saveTwoSymbol('plus')}
                                        >+</button>
                                    </div>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div className="effect-group-container">
                                    <div className="btn-border">
                                        <button className="btn"
                                                onClick={() => this.oneEleCalcul('negative')}
                                                disabled={this.saveOprFormula.disableNumDotNeg}
                                        >±</button>
                                    </div>
                                </div>
                            </td>
                            <td className="input-num">
                                <div className="effect-group-container">
                                    <div className="btn-border">
                                        <button className="btn"
                                                onClick={() => this.storeNum('0')}
                                                disabled={this.saveOprFormula.disableNumDotNeg}
                                        >0</button>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <div className="effect-group-container">
                                    <div className="btn-border">
                                        <button className="btn"
                                                onClick={() => this.oneEleCalcul('dot')}
                                                disabled={this.saveOprFormula.disableNumDotNeg}
                                        >.</button>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <div className="effect-group-container">
                                    <div className="btn-border">
                                        <button className="btn basic-opr" onClick={this.calculTwoNum.bind(this)}>=</button>
                                    </div>
                                </div>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>

        </div>
        )

    }

}

export default Calculate