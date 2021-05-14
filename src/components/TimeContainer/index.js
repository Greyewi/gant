import React from "react";
import { connect } from "react-redux";
import { timeFieldArraySelector } from "../../modules/timeline";
import {
  addNewTask,
  editTask,
  isOpenTaskFormIdSelector,
  setActiveTask,
} from "../../modules/tasks";
import { FieldContainerElement } from "./styles";
import Modal from "../../ui/Modal";
import Form from "../Form";

const TimeContainer = (props) => {
  const {
    children,
    timeFieldArray,
    setActiveTask,
    isOpenTaskFormId,
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
      {isOpenTaskFormId && (
        <Modal toggle={() => setActiveTask(null)} isOpen={isOpenTaskFormId}>
          <Form />
        </Modal>
      )}
    </FieldContainerElement>
  );
};

export default connect(
  (state) => ({
    isOpenTaskFormId: isOpenTaskFormIdSelector(state),
    timeFieldArray: timeFieldArraySelector(state),
  }),
  { editTask, addNewTask, setActiveTask }
)(TimeContainer);
