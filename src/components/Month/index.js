import {MonthElement} from "./styles"
import React from "react"
import Day from '../Day'

const Month = ({
                 timeField,
                 odd,
                 interval
               }) => {

  return <MonthElement odd={odd} isResizeTask={interval.length > 1}>
    <Day timeField={timeField}/>
  </MonthElement>
}

export default Month