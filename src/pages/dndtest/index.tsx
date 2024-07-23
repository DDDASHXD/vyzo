import React from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};

const initialItems = [
  {
    id: "1",
    content: "Item 1",
    nestedItems: [
      { id: "1-1", content: "Nested Item 1-1" },
      { id: "1-2", content: "Nested Item 1-2" },
    ],
  },
  {
    id: "2",
    content: "Item 2",
    nestedItems: [{ id: "2-1", content: "Nested Item 2-1" }],
  },
];

export default function App() {
  const [items, setItems] = React.useState(initialItems);

  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    const { source, destination } = result;

    if (source.droppableId === destination.droppableId) {
      if (source.droppableId.includes("nested-")) {
        // Reorder within nested items
        const parentItemId = source.droppableId.split("-")[1];
        const parentItemIndex = items.findIndex(
          (item) => item.id === parentItemId
        );
        const reorderedNestedItems = reorder(
          items[parentItemIndex].nestedItems,
          source.index,
          destination.index
        );
        const newItems = Array.from(items);
        newItems[parentItemIndex].nestedItems = reorderedNestedItems;
        setItems(newItems);
      } else {
        // Reorder top-level items
        const reorderedItems = reorder(items, source.index, destination.index);
        setItems(reorderedItems);
      }
    } else {
      // Moving between different droppables
      const sourceParentItemIndex = items.findIndex(
        (item) => item.id === source.droppableId.split("-")[1]
      );
      const destParentItemIndex = items.findIndex(
        (item) => item.id === destination.droppableId.split("-")[1]
      );
      const sourceClone = Array.from(items[sourceParentItemIndex].nestedItems);
      const destClone = Array.from(items[destParentItemIndex].nestedItems);
      const [movedItem] = sourceClone.splice(source.index, 1);
      destClone.splice(destination.index, 0, movedItem);

      const newItems = Array.from(items);
      newItems[sourceParentItemIndex].nestedItems = sourceClone;
      newItems[destParentItemIndex].nestedItems = destClone;

      setItems(newItems);
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="top-level" type="TOP_LEVEL">
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {items.map((item, index) => (
              <Draggable key={item.id} draggableId={item.id} index={index}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <div
                      style={{
                        margin: "8px",
                        padding: "8px",
                        border: "1px solid grey",
                      }}
                    >
                      {item.content}
                      <Droppable
                        droppableId={`nested-${item.id}`}
                        type="NESTED"
                      >
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                            style={{
                              padding: "8px",
                              margin: "8px",
                              border: "1px solid lightgrey",
                            }}
                          >
                            {item.nestedItems.map((nestedItem, nestedIndex) => (
                              <Draggable
                                key={nestedItem.id}
                                draggableId={nestedItem.id}
                                index={nestedIndex}
                              >
                                {(provided) => (
                                  <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    style={{
                                      margin: "4px",
                                      padding: "4px",
                                      border: "1px solid grey",
                                    }}
                                  >
                                    {nestedItem.content}
                                  </div>
                                )}
                              </Draggable>
                            ))}
                            {provided.placeholder}
                          </div>
                        )}
                      </Droppable>
                    </div>
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}
