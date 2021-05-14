import ProcessList from "./ProcessList";
import { connect } from "react-redux";
import {
  addNewProcess,
  changeProcessListPosition,
  editProcess,
  processListSelector,
  removeProcess,
} from "../../modules/processes";

export default connect(
  (state) => ({
    processList: processListSelector(state),
  }),
  { addNewProcess, editProcess, removeProcess, changeProcessListPosition }
)(ProcessList);
