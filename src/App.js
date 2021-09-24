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
import moment from "moment"

// const scaleMap = [{format: 'YYYY-MM', scale: 'years', unit: 'months', countUnits: 12}, ]

function App({loadTimeLine, onChangeFormat, onChangeScale, onChangeUnitName, onChangeCountUnits, onChangeActiveScaleCount}) {

  useEffect(() => {
    batch(() => {
      onChangeFormat('YYYY-MM-DD')
      onChangeScale('months')
      onChangeUnitName('days')
      onChangeCountUnits((data, format) => moment(data, format).daysInMonth()) // number of function with callback(data, format) //(data, format) => moment(data, format).daysInMonth()
      loadTimeLine('2021-08-01', 28) // startDate, count
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
