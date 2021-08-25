import {ProcessElement, ProcessLine, ProcessRow} from "./styles"
import ProcessConfig from './ProcessConfig'
import Month from "../Month"
import TimeContainer from "../TimeContainer"
import DnDList from "../../ui/DnDList"
import React, {useMemo} from "react"
import Modal from "../../ui/Modal"
import Form from "../Form"

const ProcessList = ({
                       processList,
                       editProcess,
                       changeProcessListPosition,
                       toggleEditTaskForm,
                       isOpenTaskFormId
                     }) => {

  const list = useMemo(
    () =>
      processList.map(process => ({
        ...process,
        component: (
          <ProcessLine key={process.id}>
            <ProcessElement
              value={process.name}
              onChange={(e) =>
                editProcess({...process, name: e.target.value})
              }
            />
            <TimeContainer processId={process.id}>
              <Month/>
            </TimeContainer>
          </ProcessLine>
        ),
      })),
    [processList, editProcess]
  )

  return (
    <ProcessRow>
      <DnDList
        onChangePosition={changeProcessListPosition}
        elementsMap={list}
      />

      <ProcessConfig/>

      {isOpenTaskFormId && (
        <Modal toggle={() => toggleEditTaskForm(null)} openTaskId={isOpenTaskFormId}>
          <Form/>
        </Modal>
      )}
    </ProcessRow>
  )
}

export default ProcessList
