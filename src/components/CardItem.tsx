import React from "react";
import { Draggable } from "react-beautiful-dnd";

interface CardItemProps {
  id: string;
  name: string;
  dragIndex: number;
}

const CardItem: React.FC<CardItemProps> = (props) => {
  const { id, name, dragIndex } = props;

  return (
    <Draggable draggableId={id} index={dragIndex}>
      {(provided) => (
        <div
          className="card-item py-2 hover:text-white font-semibold hover:bg-blue-500 text-center border text-blue-500 bg-white border-blue-500 my-2 h-max"
          ref={provided.innerRef}
          {...provided.dragHandleProps}
          {...provided.draggableProps}
        >
          {name}
        </div>
      )}
    </Draggable>
  );
};

export default CardItem;
