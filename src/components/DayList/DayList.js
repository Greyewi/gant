import {DayContainer} from "../Day/styles";
import {getDaysArrayByMonth} from "../../utils";
import React from "react";
import Day from "../Day"

const DayList = ({timeField}) => {
    return <DayContainer>
        {getDaysArrayByMonth(timeField).map((day) => <Day
            key={day}
            day={day}
        />)}
    </DayContainer>
}

export default DayList