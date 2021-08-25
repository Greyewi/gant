import DayList from "./DayList"
import {connect} from "react-redux"
import {
  activeMonthsListSelector,
  activeProcessIdSelector,
  editableTaskIdSelector,
  taskListSelector,
} from "../../modules/tasks"

import {
  formatSelector,
  timeFieldArraySelector,
  unitNameSelector,
  unitsPerScaleSelector,
  activeScalesSelector,
} from "../../modules/timeline"

export default connect((state) => ({
  unitName: unitNameSelector(state),
  activeScales: activeScalesSelector(state),
  editableTaskId: editableTaskIdSelector(state),
  unitsPerScale: unitsPerScaleSelector(state),
  activeProcessId: activeProcessIdSelector(state),
  activeMonthsList: activeMonthsListSelector(state),
  timeFieldArray: timeFieldArraySelector(state),
  taskList: taskListSelector(state),
  format: formatSelector(state),
}))(DayList)
