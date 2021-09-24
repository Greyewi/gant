import Task from "./Task"
import {connect} from "react-redux"
import {
  activeTaskEditSelector,
  addEndIntervalTask,
  addStartIntervalTask,
  editableTaskIdSelector,
  editableTaskSideSelector,
  editTask,
  endTempIntervalSelector,
  firstDateIntervalSelector,
  isOpenTaskFormIdSelector,
  hoverTaskIdSelector,
  setActiveTask,
  startTempIntervalSelector,
  unionTwoTask,
  hoverTask,
  toggleEditTaskForm
} from "../../modules/tasks"

import {
  formatSelector,
  unitNameSelector
} from '../../modules/timeline'


export default connect(
  (state) => ({
    unitName: unitNameSelector(state),
    format: formatSelector(state),
    editableTaskSide: editableTaskSideSelector(state),
    firstDateInterval: firstDateIntervalSelector(state),
    editableTaskId: editableTaskIdSelector(state),
    isOpenTaskFormId: isOpenTaskFormIdSelector(state),
    startTempInterval: startTempIntervalSelector(state),
    endTempInterval: endTempIntervalSelector(state),
    hoverTaskId: hoverTaskIdSelector(state),
    activeTaskEdit: activeTaskEditSelector(state),
  }),
  {
    hoverTask,
    unionTwoTask,
    editTask,
    setActiveTask,
    addStartIntervalTask,
    addEndIntervalTask,
    toggleEditTaskForm
  }
)(Task)
