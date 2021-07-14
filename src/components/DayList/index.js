import DayList from "./DayList"
import {connect} from "react-redux"
import {
  activeMonthsListSelector,
  activeProcessIdSelector,
  editableTaskIdSelector,
  firstDateIntervalSelector,
  taskListSelector,
} from "../../modules/tasks"

import {formatSelector, timeFieldArraySelector, unitNameSelector, unitsPerScaleSelector} from "../../modules/timeline"

export default connect((state) => ({
  unitName: unitNameSelector(state),
  editableTaskId: editableTaskIdSelector(state),
  unitsPerScale: unitsPerScaleSelector(state),
  activeProcessId: activeProcessIdSelector(state),
  activeMonthsList: activeMonthsListSelector(state),
  timeFieldArray: timeFieldArraySelector(state),
  taskList: taskListSelector(state),
  firstDateInterval: firstDateIntervalSelector(state), // for memos
  format: formatSelector(state),
}))(DayList)
