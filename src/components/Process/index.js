import ProcessList from "./ProcessList"
import {connect} from "react-redux"
import {
  changeProcessListPosition,
  editProcess,
  processListSelector,
  removeProcess,
} from "../../modules/processes"

import {toggleEditTaskForm, isOpenTaskFormIdSelector} from "../../modules/tasks"

export default connect(
  (state) => ({
    processList: processListSelector(state),
    isOpenTaskFormId: isOpenTaskFormIdSelector(state),
  }),
  {editProcess, removeProcess, changeProcessListPosition, toggleEditTaskForm}
)(ProcessList)
