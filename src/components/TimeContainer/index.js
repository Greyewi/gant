import React from "react"
import {connect} from "react-redux"
import {timeFieldArraySelector} from "../../models/timeline"
import {addNewTask, intervalSelector, addEndIntervalTempTask, addStartIntervalTempTask} from "../../models/tasks"
import {FieldContainerElement} from "./styles";

const TimeContainer = ({children, timeFieldArray, ...rest}) => {
    return <FieldContainerElement>
        {timeFieldArray.map((item, key) => React.cloneElement(children, {timeField: item, key: key, odd: (key % 2 === 0), ...rest}))}
    </FieldContainerElement>
}

export default connect((state) => ({
    timeFieldArray: timeFieldArraySelector(state),
    interval: intervalSelector(state)
}), {addNewTask, addStartIntervalTempTask, addEndIntervalTempTask})(TimeContainer)