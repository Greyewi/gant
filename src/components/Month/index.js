import {MonthElement} from "./styles"
import Day from '../Day'

const Month = ({
                 processId,
                 timeField,
                 odd,
                 taskList
               }) => {
  return <MonthElement odd={odd}>
    <Day processId={processId} taskList={taskList} timeField={timeField}/>
  </MonthElement>
}

export default Month