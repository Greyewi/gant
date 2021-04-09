import React from "react"
import {connect} from "react-redux"
import {timeFieldArraySelector} from "../../models/timeline"
import {
  editTask,
  addNewTask,
  taskListSelector,
  intervalSelector,
  addStartIntervalTask,
  addEndIntervalTask,
  activeTaskEditSelector,
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
    {isOpenTaskFormId && <Modal defaultOpen={isOpenTaskFormId} isOpen={isOpenTaskFormId}>
      <Form task={taskList.find(f => f.id === isOpenTaskFormId)} {...rest}/>
    </Modal>}
  </FieldContainerElement>
}

export default connect((state) => ({
  isOpenTaskFormId: isOpenTaskFormIdSelector(state),
  timeFieldArray: timeFieldArraySelector(state),
  activeTaskEdit: activeTaskEditSelector(state),
  taskList: taskListSelector(state),
  interval: intervalSelector(state)
}), {editTask, addNewTask, addStartIntervalTask, addEndIntervalTask})(TimeContainer)