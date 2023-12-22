import React, { useEffect } from "react";
import "./App.css";
import CatForm from "./componaments/cat form/addcatform";
import CatCard from "./componaments/cat card/catcard";
import { useSelector } from "react-redux";
import { RootState } from "./componaments/redux/store";
import axios from "axios";
import { addCat, deleteCat, editCat, sortCatsByNameAsc, sortCatsByNameDesc } from "./componaments/redux/actionfunctions";
import { useAppDispatch } from "./componaments/redux/catReducer";
import { Cat } from "./componaments/redux/types";


const App: React.FC = () => {
  const cats = useSelector((state: RootState) => state.cats);
  const dispatch = useAppDispatch();
  useEffect(() => {
    axios.get('http://localhost:3000/cats')
      .then(response => {
        response.data.forEach((catData: Cat) => dispatch(addCat(catData)));
      })
      .catch(error => {
        console.error('There was an error fetching the cats: ', error);
      });
  }, [dispatch]);
  const onAddCat = async (catData: Omit<Cat, 'id'>) => {
    try {
      const response = await axios.post('http://localhost:3000/cats', catData);
      const newCat = response.data; 
      dispatch(addCat(newCat));
    } catch (error) {
      console.error('There was an error saving the cat: ', error);
    }
  };
  const handleDelete = (id: string) => {
    dispatch(deleteCat(id));
  };
  const handleEdit = (updatedCat: Cat) => {
    dispatch(editCat(updatedCat));
  };
  const handleSortAsc = () => {
    dispatch(sortCatsByNameAsc());
  };
  const handleSortDesc = () => {
    dispatch(sortCatsByNameDesc());
  };


  return (
    <div className="app-container"> 
      <div className="form-container">
      <CatForm onAddCat={onAddCat} />
      <button className="button" onClick={handleSortAsc}>Sort Cats Ascending</button>
      <button className="button" onClick={handleSortDesc}>Sort Cats Descending</button>
      </div>
      <section className="cat-cards">
        {cats && cats.map((cat: Cat) => (
          <CatCard
            key={cat.id}
            cat={cat}
            onDelete={handleDelete}
            onEdit={handleEdit}
          />
        ))}
      </section>
    </div>
  );
}	

export default App;
