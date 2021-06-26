import { connect } from "react-redux";
import Form from "./Form";
import {
  editTask,
  activeTaskEditSelector,
  taskListSelector,
  isOpenTaskFormIdSelector
} from "../../modules/tasks"

export default connect(
  (state) => ({
    activeTaskEditSelector: activeTaskEditSelector(state),
    isOpenTaskFormId: isOpenTaskFormIdSelector(state),
    taskList: taskListSelector(state),
  }),
  {editTask}
  )(Form)