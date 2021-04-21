import Month from "../Month";
import TimeContainer from "../TimeContainer";
import React from "react";
import {ProcessLine, ProcessName, ProcessContainer} from './style'

const Process = ({processList, addNewProcess, removeProcess, changeProcess}) => {
    console.log(processList)
    return(
        <ProcessContainer>
            {processList.map((item, key) =>
                <ProcessLine key={key}>
                    <ProcessName value={item.name} onChange={(event) => changeProcess({...item, name: event.target.value })} />
                    <TimeContainer>
                        <Month />
                    </TimeContainer>
                </ProcessLine>
            )}
            <button onClick={addNewProcess}>Add</button>
        </ProcessContainer>
    )
}

export default Process