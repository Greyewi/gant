import {MonthElement} from "./styles"
import DayList from "../DayList"

const Month = ({odd, ...rest}) => {
  return (
    <MonthElement odd={odd}>
      <DayList {...rest}/>
    </MonthElement>
  )
}

export default Month
