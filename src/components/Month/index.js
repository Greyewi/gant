import {MonthElement, NameOfMonth} from "./styles";
import moment from "moment";
import React from "react";


const Month = ({timeField, odd}) => {
    return <MonthElement odd={odd} >
        <NameOfMonth>{moment(timeField, "DD-MM-YYYY").format("MMMM YYYY")}</NameOfMonth>

    </MonthElement>
}

export default Month