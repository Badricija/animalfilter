import { ADD_CAT, DELETE_CAT, EDIT_CAT, SORT_CATS_BY_NAME_ASC, SORT_CATS_BY_NAME_DESC } from "./actiontypes";
import { AddCatAction, Cat, DeleteCatAction, EditCatAction, SortCatsByNameAscAction, SortCatsByNameDescAction, UnknownAction } from "./types";

export type RootAction = AddCatAction | DeleteCatAction | EditCatAction | SortCatsByNameAscAction | SortCatsByNameDescAction | UnknownAction;

export const addCat = (cat: Cat): AddCatAction => ({
  type: ADD_CAT,
  payload: cat,
});

export const deleteCat = (id: string): DeleteCatAction => ({
  type: DELETE_CAT,
  payload: id,
});

export const editCat = (cat: Cat): EditCatAction => ({
  type: EDIT_CAT,
  payload: cat,
});

export const sortCatsByNameAsc = (): SortCatsByNameAscAction => ({
  type: SORT_CATS_BY_NAME_ASC,
});

export const sortCatsByNameDesc = (): SortCatsByNameDescAction => ({
  type: SORT_CATS_BY_NAME_DESC,
});

export const isAddCatAction = (action: RootAction): action is AddCatAction =>
  action.type === ADD_CAT;

export const isDeleteCatAction = (action: RootAction): action is DeleteCatAction =>
  action.type === DELETE_CAT;

export const isEditCatAction = (action: RootAction): action is EditCatAction =>
  action.type === EDIT_CAT;