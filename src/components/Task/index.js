import {connect} from "react-redux"


import {
    processIdTempSelector,
    startIntervalSelector,
    endIntervalSelector,
    firstDateSelector,
    unionTask,
    editTask
} from "../../models/tasks";
import Task from "./Task";

export default connect((state) => ({
    startInterval: startIntervalSelector(state),
    endInterval: endIntervalSelector(state),
    processIdTemp: processIdTempSelector(state),
    firstDate: firstDateSelector(state)
}), {unionTask, editTask})(Task)