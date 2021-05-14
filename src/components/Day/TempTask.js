import React from "react";
import { TaskElement } from "../Task/style";

const TempTask = ({ startDate, endDate, currentDate, activeTaskEdit = {} }) => {
  const { fill = "transparent", border = "dashed" } = activeTaskEdit;

  return (
    <TaskElement
      tempTask
      color={fill}
      border={border}
      isStart={currentDate === startDate}
      isEnd={currentDate === endDate}
    />
  );
};

export default TempTask;
