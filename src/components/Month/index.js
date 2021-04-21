import {MonthElement, NameOfMonth} from "./styles";
import React, {useCallback} from "react";
import Day from "../Day";

const Month = ({odd}) => {

    return <MonthElement odd={odd} >
        {/*<NameOfMonth>{moment(timeField, format).format("MMMM YYYY")}</NameOfMonth>*/}
        <Day />
    </MonthElement>
}

export default Month