import ReactDOM from 'react-dom'
import Stand from "./stand";

const config = {
  storeConfig: {
    isLogger: true
  },
  backgroundColor: "#fff",
  navigation: {
    addProcess: (event) => {
      console.log(event)
      return event
    },
    scaleMoveForward: (event) => {
      console.log(event)
      return event
    },
    scaleMoveBackward: (event) => {
      console.log(event)
      return event
    },
    scaleAddForward: (event) => {
      console.log(event)
      return event
    },
    scaleRemoveForward: (event) => {
      console.log(event)
      return event
    },
    scaleAddBackward: (event) => {
      console.log(event)
      return event
    },
    scaleRemoveBackward: (event) => {
      console.log(event)
      return event
    }
  }
}

const domContainer = document.querySelector('#root');
ReactDOM.render(
  <div>
    <Stand {...config}/>
  </div>, domContainer);