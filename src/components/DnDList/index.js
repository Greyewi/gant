import {memo, useCallback} from "react"
import {DnDElement, DnDElementContainer} from './styles'
import {DragDropContext, Draggable, Droppable} from "react-beautiful-dnd"
import {reorder} from '../../utils'

export const DnDItem = ({element, index}) => {
  return (
    <Draggable draggableId={element.id} index={index}>
      {(provided) => (
        <DnDElementContainer
          ref={provided.innerRef}
          {...provided.draggableProps}
        >
          <DnDElement
            {...provided.dragHandleProps}
          />
          {element.component}
        </DnDElementContainer>

      )}
    </Draggable>
  )
}

export const DnDItemList = memo(function List({elements}) {
  return elements && elements.map((element, index) => (
    <DnDItem element={element} index={index} key={element.id}>
      {element.component}
    </DnDItem>
  ))
})

const DnDList = ({elementsMap, onChangePosition}) => {

  const onDragEnd = useCallback((result) => {
    if (!result.destination) {
      return
    }

    if (result.destination.index === result.source.index) {
      return
    }

    const elements = reorder(
      elementsMap,
      result.source.index,
      result.destination.index
    )

    onChangePosition(elements)
  }, [elementsMap, onChangePosition])

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="list">
        {(provided) => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            <DnDItemList elements={elementsMap}/>
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  )
}

export default DnDList