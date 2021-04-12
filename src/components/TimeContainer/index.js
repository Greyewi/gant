import React from "react"
import {connect} from "react-redux"
import {timeFieldArraySelector} from "../../modules/timeline"
import {
  activeTaskEditSelector,
  addEndIntervalTask,
  addNewTask,
  addStartIntervalTask,
  editTask,
  intervalSelector,
  isOpenTaskFormIdSelector,
  setActiveTask,
  taskListSelector
} from "../../modules/tasks"

import {FieldContainerElement} from "./styles"
import Modal from "../../ui/Modal"
import Form from "../Form"

const TimeContainer = ({children, timeFieldArray, setActiveTask, isOpenTaskFormId, taskList, interval, ...rest}) => {
  return <FieldContainerElement>
    {timeFieldArray.map((item, key) => React.cloneElement(children, {
      interval: interval,
      timeField: item,
      key: key,
      odd: (key % 2 === 0)
    }))}
    {isOpenTaskFormId && <Modal toggle={() => setActiveTask(null)} isOpen={isOpenTaskFormId}>
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
}), {editTask, addNewTask, setActiveTask, addStartIntervalTask, addEndIntervalTask})(TimeContainer)