import React from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";

import CardItem from "./CardItem";

export interface ICard {
  id: string;
  name: string;
}

export interface CardListProps {
  id: string;
  name: string;
  items: ICard[];
  dragIndex: number;
  isLastItem: boolean;
  handleAddItem: (id: string) => void;
  handleAddColumn: () => void;
  handleUpdateCardItem: (
    cardId: string,
    cardItemId: string,
    name: string
  ) => void;
}

const CardList: React.FC<CardListProps> = (props) => {
  const {
    id,
    name,
    items,
    dragIndex,
    handleAddItem,
    isLastItem,
    handleAddColumn,
    handleUpdateCardItem,
  } = props;

  return (
    <Draggable draggableId={id} index={dragIndex}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="card-list px-10 shadow-lg py-4 flex flex-col min-w-[300px] cursor-pointer"
        >
          <div className="relative flex items-center justify-center">
            <h2 className="font-bold text-red-500 text-lg text-center h-10">
              {name}
            </h2>

            {isLastItem && (
              <button
                className="bg-red-500 font-bold text-white px-3 h-max absolute right-0 hover:bg-white border border-red-500 hover:text-red-500"
                onClick={handleAddColumn}
              >
                +
              </button>
            )}
          </div>

          <Droppable droppableId={id} direction="vertical" type="ITEM">
            {(_provided) => (
              <div
                className="card-items flex-1 border border-blue-500 px-2 mb-2 overflow-y-auto"
                ref={_provided.innerRef}
                {..._provided.droppableProps}
              >
                {items.map((item, index) => (
                  <CardItem
                    id={item.id}
                    name={item.name}
                    dragIndex={index}
                    key={item.id}
                    handleUpdateCardItem={() =>
                      handleUpdateCardItem(id, item.id, item.name)
                    }
                  />
                ))}

                {_provided.placeholder}
              </div>
            )}
          </Droppable>

          <button
            className="bg-red-500 font-bold text-white w-full h-10 hover:bg-white hover:text-red-500 border border-red-500"
            onClick={() => handleAddItem(id)}
          >
            Thêm
          </button>
        </div>
      )}
    </Draggable>
  );
};

export default CardList;
