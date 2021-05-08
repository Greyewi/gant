import {memo} from "react"

export const dontRenderOtherProcess = (component) => memo(component, (prevProps, nextProps) => {
    if(nextProps.processId !== nextProps.processIdTemp && prevProps.processId !== prevProps.processIdTemp){
        return true //true не вызывает перерендер
    } else {
        return false
    }})