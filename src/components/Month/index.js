import { MonthElement } from "./styles";
import DayList from "../DayList";

const Month = ({ processId, timeField, odd, taskList }) => {
  return (
    <MonthElement odd={odd}>
      <DayList
        processId={processId}
        taskList={taskList}
        timeField={timeField}
      />
    </MonthElement>
  );
};

export default Month;
