import React, {useRef} from "react"
import Mousetrap from 'mousetrap';
import {timeFieldArraySelector, addNewMoth} from "../../models/timeline";
import {connect} from "react-redux";
import {ButtonElement} from './style'

const Button = props => {
    const {children, hotKey, onClick, timeFieldArray, addNewMoth} = props
    const inputEl = useRef(null)
    console.log(timeFieldArray)
    if(onClick){
        Mousetrap.bind(hotKey, () => {onClick(timeFieldArray)})
    } else {
        Mousetrap.bind(hotKey, () => {inputEl.click()})
    }

    return <ButtonElement
        onClick={()=>addNewMoth(onClick(timeFieldArray))}
        ref={inputEl}

    >
        {children}
    </ButtonElement>
}

export default connect((state) => ({
    timeFieldArray: timeFieldArraySelector(state)
}), {addNewMoth})(Button)


/*
import React from "react"
import {addPreviousMonth, addNextMonth} from "../../utils"
import {connect} from "react-redux"
import {timeFieldArraySelector} from "../../models/gant"

const Buttons = (timeFieldArray) => {
    return (
        <div>
            <button onClick={()=>addPreviousMonth(timeFieldArray)}>Prev</button>
            <button onClick={()=>addNextMonth(timeFieldArray)}>Next</button>
        </div>
    )
}

export default Buttons*/
