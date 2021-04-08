import React from "react"
import {connect} from "react-redux"
import {timeFieldArraySelector} from "../../models/timeline"
import {
  addNewTask,
  taskListSelector,
  intervalSelector,
  addStartIntervalTask,
  addEndIntervalTask,
  isOpenTaskFormIdSelector
} from "../../models/tasks"
import {FieldContainerElement} from "./styles"
import Modal from "../Modal"
import Form from "../Form"

const TimeContainer = ({children, timeFieldArray, isOpenTaskFormId, taskList, ...rest}) => {
  return <FieldContainerElement>
    {timeFieldArray.map((item, key) => React.cloneElement(children, {
      isOpenTaskFormId: isOpenTaskFormId,
      taskList: taskList,
      timeField: item,
      key: key,
      odd: (key % 2 === 0),
      ...rest
    }))}
    {isOpenTaskFormId && <Modal defaultOpen={isOpenTaskFormId}>
      <Form task={taskList.find(f => f.id === isOpenTaskFormId)}/>
    </Modal>}
  </FieldContainerElement>
}

export default connect((state) => ({
  isOpenTaskFormId: isOpenTaskFormIdSelector(state),
  timeFieldArray: timeFieldArraySelector(state),
  taskList: taskListSelector(state),
  interval: intervalSelector(state)
}), {addNewTask, addStartIntervalTask, addEndIntervalTask})(TimeContainer)