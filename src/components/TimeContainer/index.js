import React from "react";
import { connect } from "react-redux";
import { timeFieldArraySelector } from "../../modules/timeline";
import {
  addNewTask,
  editTask,
  isOpenTaskFormIdSelector,
  closeEditTaskForm,
} from "../../modules/tasks";
import { FieldContainerElement } from "./styles";


const TimeContainer = (props) => {
  const {
    children,
    timeFieldArray,
    processId,
  } = props;

  return (
    <FieldContainerElement>
      {timeFieldArray.map((item, key) =>
        React.cloneElement(children, {
          processId,
          timeField: item,
          key: key,
          odd: key % 2 === 0,
        })
      )}
    </FieldContainerElement>
  );
};

export default connect(
  (state) => ({
    isOpenTaskFormId: isOpenTaskFormIdSelector(state),
    timeFieldArray: timeFieldArraySelector(state),
  }),
  { editTask, addNewTask, closeEditTaskForm }
)(TimeContainer);
