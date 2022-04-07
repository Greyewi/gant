import {ProcessElement, ProcessLine, ProcessRow} from "./styles"
import ProcessConfig from './ProcessConfig'
import TimeContainer from "../TimeContainer"
import DnDList from "../../ui/DnDList"
import React, {useMemo, useCallback} from "react"
import Modal from "../../ui/Modal"
import Form from "../Form"

const ProcessLineComponent = ({process, processKey, editProcess}) => {
  const handleEditProcess = useCallback((e) => editProcess({...process, name: e.target.value}), [editProcess, process])

  return <ProcessLine>
    <ProcessElement
      value={process.name}
      onChange={handleEditProcess}
    />
    <TimeContainer processId={process.id} processKey={processKey} />
  </ProcessLine>
}

const ProcessList = ({
                       processList,
                       editProcess,
                       changeProcessListPosition,
                       toggleEditTaskForm,
                       isOpenTaskFormId
                     }) => {

  const list = useMemo(
    () =>
      processList.map((process, processKey) => ({
        ...process,
        component: <ProcessLineComponent key={process} processKey={processKey} editProcess={editProcess} process={process}/>,
      })),
    [processList, editProcess]
  )

  const onToggleEditTaskForm = useCallback(() => toggleEditTaskForm(null), [])

  return (
    <ProcessRow>
      <DnDList
        onChangePosition={changeProcessListPosition}
        elementsMap={list}
      />
      <ProcessConfig/>
      {isOpenTaskFormId && (
        <Modal toggle={onToggleEditTaskForm} openTaskId={isOpenTaskFormId}>
          <Form/>
        </Modal>
      )}
    </ProcessRow>
  )
}

export default ProcessList
