import {connect} from "react-redux"
import {addStartIntervalTempTask, addEndIntervalTempTask, processIdTempSelector, startIntervalSelector, endIntervalSelector, addProcessIdTemp} from "../../models/tasks";
import Day from "./Day";

export default connect((state) => ({
    startInterval: startIntervalSelector(state),
    endInterval: endIntervalSelector(state),
    processIdTemp: processIdTempSelector(state)
}), {addStartIntervalTempTask, addEndIntervalTempTask, addProcessIdTemp})(Day)