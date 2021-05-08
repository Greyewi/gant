import {dontRenderOtherProcess} from "../../hoc/memo";
import moment from "moment";
import React, {useMemo, memo} from "react";
import {format} from '../../constants';
import {getDaysArrayByMonth, changeDayOfMonth} from '../../utils'
import {batch} from "react-redux";
import {TempTask} from "./styles"
import {addFirstDate} from "../../models/tasks";

const Day = ({addStartIntervalTempTask, addEndIntervalTempTask, processId, date, addFirstDate, children, startInterval, endInterval, processIdTemp, firstDate}) => {
    const isDateInsideInterval = useMemo(() => moment(date, format).isBetween(moment(startInterval, format).add(-1, 'days'), moment(endInterval, format).add(1, 'days')) && processIdTemp === processId, [date, startInterval, endInterval, processId, processIdTemp])
    const isStartInterval = useMemo(() => date === startInterval, [date, startInterval])
    const isEndInterval = useMemo(() => date === endInterval, [date, startInterval])

    return <div

        onMouseDown={() => addFirstDate(date, processId)}
        onMouseEnter={() => {
            if(date === firstDate){
                batch(() => {
                    addStartIntervalTempTask(date)
                    addEndIntervalTempTask(date)
                })
                return 0
            }
            if(moment(date, format).isSameOrBefore(moment(firstDate, format))){
                addStartIntervalTempTask(date)
            } else if (moment(date, format).isSameOrAfter(moment(firstDate, format))) {
                addEndIntervalTempTask(date)
            }
        }}
/*        onMouseUp={(event) => setEndInterval(event.target.innerHTML)}*/
    >
        {children}
        <TempTask isDateInsideInterval={isDateInsideInterval} isStartInterval={isStartInterval} isEndInterval={isEndInterval}/>
    </div>
}

export default dontRenderOtherProcess(Day)
