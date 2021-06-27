import DayList from "./DayList";
import { connect } from "react-redux";
import {
  taskListSelector,
  activeProcessIdSelector,
  activeMonthsListSelector,
  editableTaskIdSelector,
  firstDateIntervalSelector,
} from "../../modules/tasks";

import {
  unitsPerScaleSelector,
  timeFieldArraySelector,
  unitNameSelector,
  formatSelector
} from "../../modules/timeline";

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
}))(DayList);
