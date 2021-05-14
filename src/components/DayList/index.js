import DayList from "./DayList";
import { connect } from "react-redux";
import {
  taskListSelector,
  activeProcessIdSelector,
  activeMonthsListSelector,
} from "../../modules/tasks";
import { timeFieldArraySelector } from "../../modules/timeline";

export default connect((state) => ({
  activeProcessId: activeProcessIdSelector(state),
  activeMonthsList: activeMonthsListSelector(state),
  timeFieldArray: timeFieldArraySelector(state),
  taskList: taskListSelector(state),
}))(DayList);
