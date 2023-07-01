import { useContext, useState } from "react";
import { GrAddCircle } from "react-icons/gr";
import { DataContext } from "../../context/DataContext";
import "./styles/Home.scss";
import AddEditItem from "./components/AddEditItem";
import RecipeItem from "./components/RecipeItem";
const Home = () => {
  const [filterState, setFilterState] = useState({
    searchData: "",
    searchType: "name",
  });
  const [modalState, setModalState] = useState({
    visibility: false,
    mode: "add",
    data: {},
  });
  const { state } = useContext(DataContext);

  const filterHandler = ({ target }) => {
    if (target.matches("input[type='text']"))
      return setFilterState((prevState) => ({
        ...prevState,
        searchData: target.value,
      }));
    setFilterState((prevState) => ({
      ...prevState,
      searchType: target.name,
    }));
  };

  return (
    <div className="home">
      <div className="search">
        <input
          type="text"
          value={filterState.searchData}
          onChange={filterHandler}
          placeholder="Search for recipe"
        />
        <div className="filter">
          Filters:
          <label htmlFor="name">
            <input
              type="radio"
              name="name"
              id="name"
              checked={filterState.searchType === "name"}
              onChange={filterHandler}
            />
            Name
          </label>
          <label htmlFor="ingredients">
            <input
              type="radio"
              name="ingredients"
              id="ingredients"
              checked={filterState.searchType === "ingredients"}
              onChange={filterHandler}
            />
            Ingredients
          </label>
          <label htmlFor="cuisine">
            <input
              type="radio"
              name="cuisine"
              id="cuisine"
              checked={filterState.searchType === "cuisine"}
              onChange={filterHandler}
            />
            Cuisine
          </label>
        </div>
      </div>
      <h2>Recipes:</h2>
      <div className="recipe-wrapper">
        {state.map((item) => {
          return (
            <RecipeItem {...item} key={item.id} setModalState={setModalState} />
          );
        })}
        <GrAddCircle
          onClick={() =>
            setModalState((prevState) => ({
              ...prevState,
              visibility: !prevState.visibility,
            }))
          }
        />
      </div>
      {modalState.visibility && <AddEditItem {...modalState} />}
    </div>
  );
};
export default Home;
