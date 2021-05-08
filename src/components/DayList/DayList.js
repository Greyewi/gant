import {DayContainer} from "../Day/styles";
import {getDaysArrayByMonth, addDayToMonth} from "../../utils";
import React from "react";
import Day from "../Day"
import {dontRenderOtherProcess} from "../../hoc/memo";

const DayList = ({timeField, ...rest}) => {

    return <DayContainer>
        {getDaysArrayByMonth(timeField).map((day) => <Day
            {...rest}
            key={day}
            date={addDayToMonth(timeField, day)}
        >{day}</Day>)}
    </DayContainer>
}

export default dontRenderOtherProcess(DayList)