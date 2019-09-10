/* eslint-disable linebreak-style */
import shortid from 'shortid';

export const getCardsForColumn = ({cards}, columnId) =>
  cards.filter(card => card.columnId == columnId);

export const getCardsForSearch = ({cards, columns}, searchString) => {
  
  cards = cards.filter(card =>
    new RegExp(searchString, 'i').test(card.title)
  );

  return cards.map(card => {

    const foundColumn = columns.filter(column => card.columnId == column.id);
    const foundList = foundColumn[0].listId;

    return {
      ...card,
      listId: foundList,
    };
  });
};

const reducerName = 'cards';
const createActionName = name => `app/${reducerName}/${name}`;

export const ADD_CARD = createActionName('ADD_CARD');

export const createAction_addCard = payload => ({payload, type: ADD_CARD});

export default function reducer(state = [], action = {}) {
  switch (action.type) {
    case ADD_CARD:
      return [...state, {...action.payload, id: shortid.generate()}];
    default:
      return state;
  }
}
