import React from "react";
import { connect } from "react-redux";
import { activeScalesSelector, scaleSelector, formatSelector, timeFieldArrayFilteredSelector } from "../../modules/timeline";
import {
  addNewTask,
  editTask,
} from "../../modules/tasks";
import { FieldContainerElement } from "./styles";
import Scale from '../Scale'

const TimeContainer = (props) => {
  const {
    processId,
    scaleName,
    format,
    processKey,
    timeFieldArrayFiltered
  } = props;

  return (
    <FieldContainerElement>
      {timeFieldArrayFiltered.map((item, key) => {
          return <Scale processId={processId} timeField={item} key={key} odd={key % 2 === 0} scaleNumber={key} processKey={processKey} format={format} scaleName={scaleName} />
        }
      )}
    </FieldContainerElement>
  );
};

export default connect(
  (state) => ({
    scaleName: scaleSelector(state),
    format: formatSelector(state),
    activeScales: activeScalesSelector(state),
    timeFieldArrayFiltered: timeFieldArrayFilteredSelector(state),
  }),
  { editTask, addNewTask }
)(TimeContainer);
