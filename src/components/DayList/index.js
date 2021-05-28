import DayList from "./DayList";
import { connect } from "react-redux";
import {
  taskListSelector,
  activeProcessIdSelector,
  activeMonthsListSelector,
} from "../../modules/tasks";

import {
  unitsPerScaleSelector,
  timeFieldArraySelector,
  unitNameSelector,
  formatSelector
} from "../../modules/timeline";

export default connect((state) => ({
  unitName: unitNameSelector(state),
  unitsPerScale: unitsPerScaleSelector(state),
  activeProcessId: activeProcessIdSelector(state),
  activeMonthsList: activeMonthsListSelector(state),
  timeFieldArray: timeFieldArraySelector(state),
  taskList: taskListSelector(state),
  format: formatSelector(state),
}))(DayList);
