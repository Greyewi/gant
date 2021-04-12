import {AddNewProcess, ProcessElement, ProcessLine, ProcessRow} from "./styles"
import Month from "../Month"
import TimeContainer from "../TimeContainer"
import DnDList from '../../ui/DnDList'
import {useMemo} from 'react'

const ProcessList = ({processList, addNewProcess, editProcess, changeProcessListPosition}) => {

  const list = useMemo(() => processList.map(process => ({
    ...process,
    component: <ProcessLine key={process.id}>
      <ProcessElement
        value={process.name}
        onChange={(e) => editProcess({...process, name: e.target.value})}
      />
      <TimeContainer processId={process.id}>
        <Month />
      </TimeContainer>
    </ProcessLine>
  })), [processList, editProcess])
  return (
    <ProcessRow>
      <DnDList
        onChangePosition={changeProcessListPosition}
        elementsMap={list}
      />
      <AddNewProcess onClick={addNewProcess}/>
    </ProcessRow>
  )
}

export default ProcessList