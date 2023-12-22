import React, { useReducer } from "react";
import { CatFormProps, CatFormState, FormAction } from "../redux/types";



const initialState: CatFormState = {
	name: "",
	breed: "",
	description: "",
	imageUrl: "",
	age: "",
};


const formReducer = (state: CatFormState, action: FormAction): CatFormState => {
	switch (action.type) {
		case "SET_FIELD": {
			const { fieldName, value } = action.payload;
			return {
				...state,
				[fieldName]: value,
			};
		}
		case "RESET_FORM": {
			return initialState;
		}
		default:
			return state;
	}
};
const CatForm: React.FC<CatFormProps> = ({ onAddCat }) => {
	const [formState, dispatch] = useReducer(formReducer, initialState);
	const handleSubmit = (event: React.FormEvent) => {
		event.preventDefault();
		if (
			formState.age &&
			formState.name &&
			formState.breed &&
			formState.description
		) {
			onAddCat({
				name: formState.name,
				breed: formState.breed,
				description: formState.description,
				imageUrl: formState.imageUrl,
				age: Number(formState.age),
			});
			dispatch({ type: "RESET_FORM" });
		} else {
			console.error("All fields are required, except image URL");
		}
	};
	const handleChange = (
		event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	): void => {
		const { name, value } = event.target;
		dispatch({ type: "SET_FIELD", payload: { fieldName: name, value } });
	};

	return (
		<div className="formcontainer">
			<form id="catForm" onSubmit={handleSubmit}>
				<div className="form-group">
					<label htmlFor="name">Cat's Name:</label>
					<input
						type="text"
						id="name"
						name="name"
						className="placeholder"
						value={formState.name}
						onChange={handleChange}
						required
					/>
				</div>
				<div className="form-group">
					<label htmlFor="breed">Cat's Breed:</label>
					<input
						type="text"
						id="breed"
						name="breed"
						className="placeholder"
						value={formState.breed}
						onChange={handleChange}
						required
					/>
				</div>
				<div className="form-group">
					<label htmlFor="age">Cat's Age:</label>
					<input
						type="text"
						id="age"
						name="age"
						className="placeholder"
						value={formState.age}
						onChange={handleChange}
						required
					/>
				</div>
				<div className="form-group">
					<label htmlFor="description">Description:</label>
					<textarea
						id="description"
						name="description"
						rows={4}
						className="placeholder"
						value={formState.description}
						onChange={handleChange}
						required
					/>
				</div>
				<div className="form-group">
					<label htmlFor="imageUrl">Image URL:</label>
					<input
						type="url"
						id="imageUrl"
						name="imageUrl"
						className="placeholder"
						value={formState.imageUrl}
						onChange={handleChange}
					/>
				</div>
				<div className="form-group">
					<button type="submit" className="button">
						Add Cat
					</button>
				</div>
			</form>
		</div>
	);
};

export default CatForm;
