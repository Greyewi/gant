import React from "react";
import { connect } from "react-redux";
import { timeFieldArraySelector, activeScalesSelector } from "../../modules/timeline";
import {
  addNewTask,
  editTask,
} from "../../modules/tasks";
import { FieldContainerElement } from "./styles";


const TimeContainer = (props) => {
  const {
    children,
    timeFieldArray,
    activeScales,
    processId,
  } = props;

  return (
    <FieldContainerElement>
      {timeFieldArray.filter((f, index) => index >= activeScales.from && index <= activeScales.to).map((item, key) =>
        React.cloneElement(children, {
          processId,
          timeField: item,
          key: key,
          odd: key % 2 === 0,
          scaleNumber: key
        })
      )}
    </FieldContainerElement>
  );
};

export default connect(
  (state) => ({
    timeFieldArray: timeFieldArraySelector(state),
    activeScales: activeScalesSelector(state),
  }),
  { editTask, addNewTask }
)(TimeContainer);
