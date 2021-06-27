import ProcessList from "./ProcessList"
import {connect} from "react-redux"
import {
  addNewProcess,
  changeProcessListPosition,
  editProcess,
  processListSelector,
  removeProcess,
} from "../../modules/processes"

import {toggleEditTaskForm, isOpenTaskFormIdSelector,} from "../../modules/tasks"

export default connect(
  (state) => ({
    processList: processListSelector(state),
    isOpenTaskFormId: isOpenTaskFormIdSelector(state),
  }),
  {addNewProcess, editProcess, removeProcess, changeProcessListPosition, toggleEditTaskForm}
)(ProcessList)
