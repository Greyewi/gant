import {connect} from "react-redux"
import {
    addStartIntervalTempTask,
    addEndIntervalTempTask,
    addFirstDate,
    processIdTempSelector,
    startIntervalSelector,
    endIntervalSelector,
    addProcessIdTemp,
    firstDateSelector
} from "../../models/tasks";
import Day from "./Day";

export default connect((state) => ({
    startInterval: startIntervalSelector(state),
    endInterval: endIntervalSelector(state),
    processIdTemp: processIdTempSelector(state),
    firstDate: firstDateSelector(state)
}), {addStartIntervalTempTask, addEndIntervalTempTask, addProcessIdTemp, addFirstDate})(Day)