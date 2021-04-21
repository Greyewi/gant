import React from "react"
import {connect} from "react-redux";
import Process from './process'
import {addNewProcess, changeProcess, removeProcess, processListSelector} from '../../models/processes'

export default connect((state) => (
    {processList: processListSelector(state)}), {addNewProcess, removeProcess, changeProcess})(Process)