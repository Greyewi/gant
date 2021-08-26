import Unit from "./Unit";
import { connect } from "react-redux";
import {
  taskListSelector,
  activeMonthsListSelector,
  activeProcessIdSelector,
  activeTaskEditSelector,
  firstDateIntervalSelector,
  addEndIntervalTask,
  addFirstDateIntervalTask,
  addNewTask,
  editTask,
  addStartIntervalTask,
  editableTaskIdSelector,
  editableTaskSideSelector,
  endTempIntervalSelector,
  isCreatableSelector,
  startTempIntervalSelector,
  isOpenTaskFormIdSelector,
} from "../../modules/tasks";

import {
  formatSelector,
  unitNameSelector,
  activeScalesSelector,
  scaleSelector
} from '../../modules/timeline'

export default connect(
  (state) => ({
    format: formatSelector(state),
    unitName: unitNameSelector(state),
    scale: scaleSelector(state),
    taskList: taskListSelector(state),
    firstDateInterval: firstDateIntervalSelector(state),
    editableTaskSide: editableTaskSideSelector(state),
    activeProcessId: activeProcessIdSelector(state),
    isCreatable: isCreatableSelector(state),
    editableTaskId: editableTaskIdSelector(state),
    activeTaskEdit: activeTaskEditSelector(state),
    startTempInterval: startTempIntervalSelector(state),
    endTempInterval: endTempIntervalSelector(state),
    activeMonthsList: activeMonthsListSelector(state),
    activeScales: activeScalesSelector(state),
    isOpenTaskFormId: isOpenTaskFormIdSelector(state), // for memos
  }),
  {
    editTask,
    addNewTask,
    addStartIntervalTask,
    addFirstDateIntervalTask,
    addEndIntervalTask,
  }
)(Unit);
