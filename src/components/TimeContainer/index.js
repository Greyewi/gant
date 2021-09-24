import React from "react";
import { connect } from "react-redux";
import { timeFieldArraySelector, activeScalesSelector, scaleSelector, formatSelector } from "../../modules/timeline";
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
    scaleName,
    format,
    processKey
  } = props;

  return (
    <FieldContainerElement>
      {timeFieldArray.filter((f, index) => index >= activeScales.from && index <= activeScales.to).map((item, key) => {
          return React.cloneElement(children, {
            processId,
            timeField: item,
            key: key,
            odd: key % 2 === 0,
            scaleNumber: key,
            processKey,
            format,
            scaleName
          })
        }
      )}
    </FieldContainerElement>
  );
};

export default connect(
  (state) => ({
    scaleName: scaleSelector(state),
    format: formatSelector(state),
    timeFieldArray: timeFieldArraySelector(state),
    activeScales: activeScalesSelector(state),
  }),
  { editTask, addNewTask }
)(TimeContainer);
