import {connect} from "react-redux"
import {
    addStartIntervalTempTask,
    addEndIntervalTempTask,
    addFirstDate,
    processIdTempSelector,
    startIntervalSelector,
    endIntervalSelector,
    addProcessIdTemp,
    firstDateSelector,
    addNewTask,
    taskListSelector
} from "../../models/tasks";
import Day from "./Day";

export default connect((state) => ({
    startInterval: startIntervalSelector(state),
    endInterval: endIntervalSelector(state),
    processIdTemp: processIdTempSelector(state),
    firstDate: firstDateSelector(state),
    taskList: taskListSelector(state)
}), {addStartIntervalTempTask, addEndIntervalTempTask, addProcessIdTemp, addFirstDate, addNewTask})(Day)