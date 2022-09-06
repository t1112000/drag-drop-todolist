import React, { useState } from "react";
import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";

import CardList, { ICard } from "./components/CardList";
import { DataCardList } from "./data";

import "./App.css";

const App: React.FC = () => {
  const [cardList, setCardList] = useState([...DataCardList]);

  const onDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;
    if (!destination) {
      return;
    }
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const subList = JSON.parse(JSON.stringify(cardList));

    if (destination.droppableId === source.droppableId) {
      const indexItemRemove = subList.findIndex(
        (subItem: ICard) => subItem.id === source.droppableId
      );

      subList[indexItemRemove].items.splice(source.index, 1);
      subList[indexItemRemove].items.splice(
        destination.index,
        0,
        cardList[indexItemRemove].items.find(
          (item: ICard) => item.id === draggableId
        )
      );
    } else {
      const indexItemRemove = subList.findIndex(
        (subItem: ICard) => subItem.id === source.droppableId
      );
      const indexItemAdd = subList.findIndex(
        (subItem: ICard) => subItem.id === destination.droppableId
      );

      subList[indexItemRemove].items.splice(source.index, 1);
      subList[indexItemAdd].items.splice(
        destination.index,
        0,
        cardList[indexItemRemove].items.find(
          (item: ICard) => item.id === draggableId
        )
      );
    }

    setCardList(subList);
  };

  const handleAddItem = (id: string) => {
    const subList = JSON.parse(JSON.stringify(cardList));
    const text = prompt("Please enter your name column", "Todo");

    if (text) {
      setCardList(
        subList.map((subItem: any) => {
          if (subItem.id === id) {
            return {
              ...subItem,
              items: [
                ...subItem.items,
                {
                  id: new Date().getTime().toString(),
                  name: text,
                },
              ],
            };
          }

          return subItem;
        })
      );
    }
  };

  const handleAddColumn = () => {
    const text = prompt("Please enter your name column", "Todo");

    if (text) {
      setCardList([
        ...cardList,
        {
          id: new Date().getTime().toString(),
          name: text,
          items: [],
        },
      ]);
    }
  };

  const handleUpdateCardItem = (
    cardId: string,
    cardItemId: string,
    name: string
  ) => {
    const subList = JSON.parse(JSON.stringify(cardList));
    const text = prompt("Please enter your name column", name);

    if (text) {
      setCardList(
        subList.map((subItem: any) => {
          if (subItem.id === cardId) {
            return {
              ...subItem,
              items: subItem.items.map((item: ICard) => {
                if (item.id === cardItemId) {
                  return { ...item, name: text };
                }

                return item;
              }),
            };
          }

          return subItem;
        })
      );
    }
  };

  return (
    <div className="App">
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="card-list" direction="horizontal" type="TASK">
          {(provided) => (
            <div
              className="card-list flex h-full w-full"
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {cardList.map((card, index) => (
                <CardList
                  id={card.id}
                  key={card.id}
                  name={card.name}
                  items={card.items}
                  dragIndex={index}
                  isLastItem={cardList.length - 1 === index}
                  handleAddItem={handleAddItem}
                  handleAddColumn={handleAddColumn}
                  handleUpdateCardItem={handleUpdateCardItem}
                />
              ))}

              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default App;
