import {MonthElement, NameOfMonth} from "./styles";
import React, {useCallback} from "react";
import DayList from "../DayList";

const Month = ({odd, ...rest}) => {

    return <MonthElement odd={odd} >
        {/*<NameOfMonth>{moment(timeField, format).format("MMMM YYYY")}</NameOfMonth>*/}
        <DayList {...rest}/>
    </MonthElement>
}

export default Month