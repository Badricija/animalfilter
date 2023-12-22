import { useDispatch } from 'react-redux';
import { Dispatch } from 'redux';
import { CatState } from './types';
import { ADD_CAT, DELETE_CAT, EDIT_CAT, SORT_CATS_BY_NAME_ASC, SORT_CATS_BY_NAME_DESC } from './actiontypes';
import { RootAction, isAddCatAction, isDeleteCatAction, isEditCatAction } from './actionfunctions';



export const useAppDispatch = () => {
  return useDispatch<Dispatch<RootAction>>();
};

export const initialState: CatState = [];



const sortByName = (state: CatState, ascending: boolean) => {
  return [...state].sort((a, b) => {
    const nameA = a.name.toUpperCase(); 
    const nameB = b.name.toUpperCase(); 
    if (nameA < nameB) {
      return ascending ? -1 : 1;
    } else if (nameA > nameB) {
      return ascending ? 1 : -1;
    }
    return 0;
  });
};

export const catReducer = (state: CatState = initialState, action: RootAction): CatState => {
  switch (action.type) {
    case ADD_CAT:
      if (isAddCatAction(action)) {
        if (state.find(cat => cat.id === action.payload.id)) {
          return state;
        }
        return [...state, action.payload];
      }
      return state;
    case DELETE_CAT:
      if (isDeleteCatAction(action)) {
        return state.filter((cat) => cat.id !== action.payload);
      }
      return state;
    case EDIT_CAT:
      if (isEditCatAction(action)) {
        return state.map((cat) => (cat.id === action.payload.id ? action.payload : cat));
      }
      return state;
    case SORT_CATS_BY_NAME_ASC:
      return sortByName(state, true);
    case SORT_CATS_BY_NAME_DESC:
      return sortByName(state, false);
    default:
      return state;
  }
};
