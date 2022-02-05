import {NameOfScale, ScaleElement} from "./styles"
import DayList from "../DayList"
import moment from 'moment'
import {useMemo} from 'react'
import {parseDateMap} from '../../constants'


const Scale = ({odd, processKey, timeField, scaleName, format, ...rest}) => {

  const viewDate = useMemo(() => moment(timeField, format).format(parseDateMap[scaleName]), [timeField, format, scaleName])

  return (
    <ScaleElement odd={odd} className={"scale"}>
      {processKey === 0 && <NameOfScale>{viewDate}</NameOfScale>}
      <DayList timeField={timeField} {...rest}/>
    </ScaleElement>
  )
}

export default Scale
