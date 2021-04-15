import './App.css';
import React from "react";
import Month from "./components/Month";
import TimeContainer from "./components/TimeContainer";
import Button from "./components/Buttons";
import {addNextMonth, addPreviousMonth} from "./utils";
import ProcessContainer from "./components/ProcessContainer";


function App() {

    return (
        <div className="App">

            <TimeContainer>
                <Month />
            </TimeContainer>
            <div>
                <Button onClick={addPreviousMonth} hotKey="left">Prev</Button>
                <Button onClick={addNextMonth} hotKey='right'>Next</Button>
            </div>

        </div>
    );
}

export default App;
