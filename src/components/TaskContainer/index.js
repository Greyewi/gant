import {connect} from "react-redux"
import {taskListSelector, addNewTask, editTask, deleteTask} from "../../models/tasks"
import Task from "../Task";

const TaskContainer = () => {
    return <TaskContainerElement>
        {}
    </TaskContainerElement>
}

export default connect((state) => ({
    taskList: taskListSelector(state)
}), {addNewTask, editTask, deleteTask})(Task)