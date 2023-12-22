//
import { Action } from "@reduxjs/toolkit";
import {
	ADD_CAT,
	DELETE_CAT,
	EDIT_CAT,
	SORT_CATS_BY_NAME_ASC,
	SORT_CATS_BY_NAME_DESC,
} from "./actiontypes";

export interface Cat {
	id: string;
	name: string;
	breed: string;
	description: string;
	imageUrl: string;
	age: number;
}

export interface CatFormState {
	age: string;
	name: string;
	breed: string;
	description: string;
	imageUrl: string;
}
export type CatState = Cat[];

export interface CatFormProps {
	onAddCat: (catData: Omit<Cat, "id">) => void;
}

export interface UnknownAction extends Action {
	type: string;
}

export interface AddCatAction {
	type: typeof ADD_CAT;
	payload: Cat;
}

export interface DeleteCatAction {
	type: typeof DELETE_CAT;
	payload: string;
}

export interface EditCatAction {
	type: typeof EDIT_CAT;
	payload: Cat;
}

export interface SortCatsByNameAscAction {
	type: typeof SORT_CATS_BY_NAME_ASC;
}

export interface SortCatsByNameDescAction {
	type: typeof SORT_CATS_BY_NAME_DESC;
}
export type Props = {
	cat: Cat;
	onDelete: (id: string) => void;
	onEdit: (cat: Cat) => void;
};
export interface EditState {
	isEditing: boolean;
	editCat: Cat;
}
export type EditAction =
	| { type: "TOGGLE_EDIT" }
	| { type: "UPDATE_CAT"; payload: Cat }
	| { type: "SET_EDIT_CAT"; payload: Cat };

export type FormAction =
	| { type: "SET_FIELD"; payload: { fieldName: string; value: string } }
	| { type: "RESET_FORM" };
