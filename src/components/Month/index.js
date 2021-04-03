import {MonthElement, NameOfMonth, DayContainer} from "./styles";
import moment from "moment";
import React, {useCallback} from "react";
import {format} from '../../constants'
import {getDaysArrayByMonth} from '../../utils'

const Month = ({timeField, odd, addStartIntervalTask, addEndIntervalTask}) => {

    const setPartInterval = useCallback((addInterval, day) => {
        const dArr = timeField.split('-')
        dArr[0] = day
        addInterval(moment(dArr.join('-'), format))
    }, [timeField])

    return <MonthElement odd={odd} >
        <NameOfMonth>{moment(timeField, format).format("MMMM YYYY")}</NameOfMonth>
        <DayContainer>
            {getDaysArrayByMonth(timeField).map((day) => <div
              onMouseUp={() => setPartInterval(addEndIntervalTask, day)}
              onMouseDown={() => setPartInterval(addStartIntervalTask, day)}
              key={day}
            >
                {day}
            </div>)}
        </DayContainer>
    </MonthElement>
}

export default Month