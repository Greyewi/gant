import "./App.css";
import { useEffect } from "react";
import { connect, batch } from "react-redux";
import ProcessList from "./components/Process";
import { loadTimeLine, onChangeFormat, onChangeScale, onChangeUnitName, onChangeCountUnits } from "./modules/timeline";
//import moment from 'moment'

// const scaleMap = [{format: 'YYYY-MM', scale: 'years', unit: 'months', countUnits: 12}, ]

function App({loadTimeLine, onChangeFormat, onChangeScale, onChangeUnitName, onChangeCountUnits}) {

  useEffect(() => {
    batch(() => {
      onChangeFormat('YYYY-MM-DD HH')
      onChangeScale('days')
      onChangeUnitName('hours')
      onChangeCountUnits(24) // number of function with callback(data, format) //(data, format) => moment(data, format).daysInMonth()

      loadTimeLine('2021-06-01 00', 6) // startDate, count
    })
  }, [onChangeFormat, onChangeScale, onChangeUnitName, onChangeCountUnits, loadTimeLine])

  return (
    <div className="App">
      <ProcessList />
    </div>
  );
}

export default connect(null, {loadTimeLine, onChangeFormat, onChangeScale, onChangeUnitName, onChangeCountUnits})(App);
