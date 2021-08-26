import "./App.css"
import {useEffect} from "react"
import {batch, connect} from "react-redux"
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

function App({loadTimeLine, onChangeFormat, onChangeScale, onChangeUnitName, onChangeCountUnits, onChangeActiveScaleCount}) {

  useEffect(() => {
    batch(() => {
      onChangeFormat('YYYY-MM-DD HH')
      onChangeScale('days')
      onChangeUnitName('hours')
      onChangeCountUnits(24) // number of function with callback(data, format) //(data, format) => moment(data, format).daysInMonth()
      loadTimeLine('2021-06-01 00', 28) // startDate, count
      onChangeActiveScaleCount({from: 1, to: 4})
    })
  }, [onChangeFormat, onChangeScale, onChangeUnitName, onChangeCountUnits, loadTimeLine, onChangeActiveScaleCount])

  return (
    <div className="App">
      <ProcessList/>
    </div>
  )
}

export default connect(null, {
  loadTimeLine,
  onChangeFormat,
  onChangeScale,
  onChangeUnitName,
  onChangeCountUnits,
  onChangeActiveScaleCount
})(App)
