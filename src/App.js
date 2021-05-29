import "./App.css";
import { useEffect } from "react";
import { connect, batch } from "react-redux";
import ProcessList from "./components/Process";
import { loadTimeLine, onChangeFormat, onChangeScale, onChangeUnitName, onChangeCountUnits } from "./modules/timeline";
import moment from 'moment'

function App({loadTimeLine, onChangeFormat, onChangeScale, onChangeUnitName, onChangeCountUnits}) {

  useEffect(() => {
    batch(() => {
      onChangeFormat('YYYY-MM-DD')
      onChangeScale('months')
      onChangeUnitName('days')
      onChangeCountUnits((data, format) => moment(data, format).daysInMonth()) // number of function with callback(data, format)

      loadTimeLine('2021-06-01', 4) // startDate, count
    })
  }, [loadTimeLine, onChangeFormat, onChangeScale, onChangeCountUnits, onChangeUnitName])

  return (
    <div className="App">
      <ProcessList />
    </div>
  );
}

export default connect(null, {loadTimeLine, onChangeFormat, onChangeScale, onChangeUnitName, onChangeCountUnits})(App);
