import {AddNewProcess, ManageScaleContainer, ProcessConfigContainer, ScaleBtn, ScaleCombineBtn} from "./styles"
import greater from '../../shared/images/greater.svg'
import less from '../../shared/images/less.svg'
import minus from '../../shared/images/minus.svg'
import plus from '../../shared/images/plus.svg'
import {connect} from "react-redux"
import {useCallback} from 'react'

import {addNewProcess,} from "../../modules/processes"

import {activeScalesSelector, onChangeActiveScaleCount,} from "../../modules/timeline"


const ProcessConfig = ({addNewProcess, onChangeActiveScaleCount, activeScales}) => {

  const handleBackScale = useCallback(() => {
    onChangeActiveScaleCount({from: activeScales.from - 1, to: activeScales.to - 1})
  }, [activeScales, ])

  const handleNextScale = useCallback(() => {
    onChangeActiveScaleCount({from: activeScales.from + 1, to: activeScales.to + 1})
  }, [activeScales])

  const handleAddScaleBefore = useCallback(() => {
    onChangeActiveScaleCount({from: activeScales.from - 1, to: activeScales.to})
  }, [activeScales])

  const handleAddScaleAfter = useCallback(() => {
    onChangeActiveScaleCount({from: activeScales.from, to: activeScales.to + 1})
  }, [activeScales])

  const handleRemoveScaleBefore = useCallback(() => {
    onChangeActiveScaleCount({from: activeScales.from + 1, to: activeScales.to})
  }, [activeScales])

  const handleRemoveScaleAfter = useCallback(() => {
    onChangeActiveScaleCount({from: activeScales.from, to: activeScales.to - 1})
  }, [activeScales])

  return <ProcessConfigContainer>
    <AddNewProcess onClick={addNewProcess}/>
    <ManageScaleContainer>
      <ScaleBtn onClick={handleBackScale}><img src={less} alt="less"/> </ScaleBtn>
      <ScaleCombineBtn>
        <ScaleBtn onClick={handleAddScaleBefore}> <img src={less} alt="less"/> <img src={plus} alt="plus"/> </ScaleBtn>
        <ScaleBtn onClick={handleRemoveScaleBefore}> <img src={less} alt="less"/><img src={minus} alt="minus"/>
        </ScaleBtn>
      </ScaleCombineBtn>
      <ScaleCombineBtn>
        <ScaleBtn onClick={handleAddScaleAfter}> <img src={plus} alt="plus"/> <img src={greater} alt="greater"/>
        </ScaleBtn>
        <ScaleBtn onClick={handleRemoveScaleAfter}> <img src={minus} alt="minus"/> <img src={greater} alt="greater"/>
        </ScaleBtn>
      </ScaleCombineBtn>
      <ScaleBtn onClick={handleNextScale}> <img src={greater} alt="greater"/> </ScaleBtn>
    </ManageScaleContainer>
  </ProcessConfigContainer>
}

export default connect(state => ({
  activeScales: activeScalesSelector(state)
}), {
  addNewProcess,
  onChangeActiveScaleCount
})(ProcessConfig)