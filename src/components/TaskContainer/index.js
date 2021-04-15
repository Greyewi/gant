import {connect} from "react-redux"
import {taskListSelector, addNewTask, editTask, deleteTask} from "../../models/tasks"
import Task from "../Task";

const TaskContainer = () => {
    console.log('test1')
    return <TaskContainerElement>
        {}
    </TaskContainerElement>
}

export default connect((state) => ({
    taskList: taskListSelector(state)
}), {addNewTask, editTask, deleteTask})(Task)