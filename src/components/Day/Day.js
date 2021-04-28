import {DayContainer} from "./styles";
import moment from "moment";
import React, {useCallback} from "react";
import {format} from '../../constants'
import {getDaysArrayByMonth, changeDayOfMonth} from '../../utils'
import {batch} from "react-redux";
import {TempTask} from "./styles"

const Day = ({addStartIntervalTempTask, addEndIntervalTempTask, processId, date, addProcessIdTemp, children, startInterval, endInterval, processIdTemp}) => {
    const isDateInsideInterval = moment(date, format).isBetween(moment(startInterval, format).add(-1, 'days'), moment(endInterval, format).add(1, 'days')) && processIdTemp === processId
    const isStartInterval = date === startInterval
    const isEndInterval = date === endInterval

    return <div

        onMouseDown={() => batch(()=>{
            addStartIntervalTempTask(date)
            addEndIntervalTempTask(date)
            addProcessIdTemp(processId)
        })}
/*        onMouseUp={(event) => setEndInterval(event.target.innerHTML)}*/
    >
        {children}
        <TempTask isDateInsideInterval={isDateInsideInterval} isStartInterval={isStartInterval} isEndInterval={isEndInterval}/>
    </div>
}

export default Day