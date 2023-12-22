import React, { useReducer } from "react";
import { Cat, EditAction, EditState, Props } from "../redux/types";

const initialState: EditState = {
	isEditing: false,
	editCat: {} as Cat,
};
const editReducer = (state: EditState, action: EditAction): EditState => {
	switch (action.type) {
		case "TOGGLE_EDIT":
			return {
				...state,
				isEditing: !state.isEditing,
			};
		case "UPDATE_CAT":
			return {
				...state,
				editCat: action.payload,
			};
		case "SET_EDIT_CAT":
			return {
				...state,
				editCat: action.payload,
			};
		default:
			return state;
	}
};
const CatCard: React.FC<Props> = ({ cat, onDelete, onEdit }) => {
	const [state, dispatch] = useReducer(editReducer, {
		...initialState,
		editCat: cat,
	});
	const handleEditToggle = () => dispatch({ type: "TOGGLE_EDIT" });
	const handleDelete = () => onDelete(cat.id);
	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const value =
			event.target.name === "age" ? +event.target.value : event.target.value;
		dispatch({
			type: "UPDATE_CAT",
			payload: { ...state.editCat, [event.target.name]: value },
		});
	};
	const handleSave = () => {
		onEdit(state.editCat);
		dispatch({ type: "TOGGLE_EDIT" });
	};

	return (
		<div>
			{state.isEditing ? (
				<div className="edit-form">
					<input
						type="text"
						className="placeholder"
						name="name"
						value={state.editCat.name}
						onChange={handleChange}
					/>
					<input
						type="text"
						className="placeholder"
						name="breed"
						value={state.editCat.breed}
						onChange={handleChange}
					/>
					<input
						type="number"
						className="placeholder"
						name="age"
						value={state.editCat.age}
						onChange={handleChange}
					/>
					<input
						type="text"
						className="placeholder"
						name="description"
						value={state.editCat.description}
						onChange={handleChange}
					/>
					<button className="button" onClick={handleSave}>
						Save
					</button>
					<button className="button" onClick={handleEditToggle}>
						Cancel
					</button>
				</div>
			) : (
				<div>
					<h3>Name: {cat.name}</h3>
					<p>Age: {cat.age}</p>
					{cat.imageUrl && (
						<img
							src={cat.imageUrl}
							className="picture"
							alt={`Picture of ${cat.name}`}
						/>
					)}
					<p>Breed: {cat.breed}</p>
					<p>Description: {cat.description}</p>
					<button className="button" onClick={handleEditToggle}>
						Edit
					</button>
					<button className="button" onClick={handleDelete}>
						Delete
					</button>
				</div>
			)}
		</div>
	);
};

export default CatCard;
