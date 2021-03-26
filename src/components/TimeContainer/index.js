import React from "react"
import {connect} from "react-redux"
import {timeFieldArraySelector} from "../../models/timeline"
import {FieldContainerElement} from "./styles";

const TimeContainer = ({children, timeFieldArray}) => {
    return <FieldContainerElement>
        {timeFieldArray.map((item, key) => React.cloneElement(children, {timeField: item, key: key, odd: (key % 2 === 0)}))}
    </FieldContainerElement>
}

export default connect((state) => ({
    timeFieldArray: timeFieldArraySelector(state)
}))(TimeContainer)