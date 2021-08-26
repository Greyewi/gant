import {ScaleElement, NameOfScale} from "./styles"
import DayList from "../DayList"

const Scale = ({odd, processKey, timeField, ...rest}) => {

  return (
    <ScaleElement odd={odd} className={"scale"}>
      {processKey === 0 && <NameOfScale>{timeField}</NameOfScale>}
      <DayList timeField={timeField} {...rest}/>
    </ScaleElement>
  )
}

export default Scale
