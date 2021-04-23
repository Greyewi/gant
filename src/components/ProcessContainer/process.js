import Month from "../Month";
import TimeContainer from "../TimeContainer";
import React, {useMemo} from "react";
import {ProcessLine, ProcessName, ProcessContainer} from './style'
import DnDList from "../DnDList"


const Process = ({processList, addNewProcess, changeProcessPosition, changeProcess, removeProcess}) => {
    console.log(processList)

    const list = useMemo(() => processList.map((process, key) => ({...process, component: <ProcessLine key={key}>
        <ProcessName value={process.name} onChange={(event) => changeProcess({...process, name: event.target.value })} />
        <button onClick={() => (removeProcess(process.id))} key={key}>X</button>
        <TimeContainer processId={process.id}>
          <Month />
        </TimeContainer>
      </ProcessLine>})), [processList, changeProcess])

    return(
        <ProcessContainer>
            <DnDList
              onChangePosition={changeProcessPosition}
              elementsMap={list}
            />
            <button onClick={addNewProcess} style={{width: "80px", marginLeft: "20px"}}>Add</button>
        </ProcessContainer>
    )
}

export default Process