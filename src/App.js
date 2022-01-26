import "./App.css"
import moment from "moment"
import {useEffect} from "react"
import {batch, useDispatch} from "react-redux"
import ProcessList from "./components/Process"
import {
  loadTimeLine,
  onChangeActiveScaleCount,
  onChangeCountUnits,
  onChangeFormat,
  onChangeScale,
  onChangeUnitName
} from "./modules/timeline"

// const scaleMap = [{format: 'YYYY-MM', scale: 'years', unit: 'months', countUnits: 12}, ]

const initialState = {
  format: 'YYYY-MM-DD',
  scale: 'months',
  unitName: 'days',
  countUnitsPerScale: (data, format) => moment(data, format).daysInMonth(),
  timeLine: {startDate: '2021-08-01', countScales: 28},
  visibleScales: {from: 1, to: 4},
}

function App({
               format = initialState.format,
               scale = initialState.scale,
               unitName = initialState.unitName,
               countUnitsPerScale = initialState.countUnitsPerScale,
               timeLine = initialState.timeLine,
               visibleScales = initialState.visibleScales,
               backgroundColor = "#000"
             }) {
  const dispatch = useDispatch()
  useEffect(() => {
    batch(() => {
      dispatch(onChangeFormat(format))
      dispatch(onChangeScale(scale))
      dispatch(onChangeUnitName(unitName))
      dispatch(onChangeCountUnits(countUnitsPerScale)) // number of function with callback(data, format) //(data, format) => moment(data, format).daysInMonth()
      dispatch(loadTimeLine(...Object.values(timeLine))) // startDate, count
      dispatch(onChangeActiveScaleCount(visibleScales))
    })
  }, [
    dispatch,
    format,
    scale,
    unitName,
    countUnitsPerScale,
    timeLine,
    visibleScales,
  ])

  return (
    <div className="App" style={{backgroundColor}}>
      <ProcessList/>
    </div>
  )
}

export default App