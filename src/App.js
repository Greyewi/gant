import "./App.css";
import {useEffect} from "react";
import { connect, batch } from "react-redux";
import ProcessList from "./components/Process";
import { loadTimeLine, onChangeFormat, onChangeScale, onChangeUnitName, onChangeCountUnits } from "./modules/timeline";

function App({loadTimeLine, onChangeFormat, onChangeScale, onChangeUnitName, onChangeCountUnits}) {

  useEffect(() => {
    batch(() => {
      onChangeFormat('YYYY-MM-DD HH:mm')
      onChangeScale('days')
      onChangeUnitName('hours')
      onChangeCountUnits(8)

      loadTimeLine('2021-06-01 00:00', 7) // startDate, count
    })
  }, [loadTimeLine, onChangeFormat, onChangeScale])

  return (
    <div className="App">
      <ProcessList />
    </div>
  );
}

export default connect(null, {loadTimeLine, onChangeFormat, onChangeScale, onChangeUnitName, onChangeCountUnits})(App);
