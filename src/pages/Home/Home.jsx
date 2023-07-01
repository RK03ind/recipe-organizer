import { useState } from "react";
import "./styles/Home.scss";
const Home = () => {
  const [filterState, setFilterState] = useState({
    searchData: "",
    searchType: "name",
  });

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
        />
        <div className="filter">
          Filter:
          <input
            type="checkbox"
            name="name"
            id="name"
            value={filterState.searchType === "name"}
            onChange={filterHandler}
          />
          <input
            type="checkbox"
            name="ingredients"
            id="ingredients"
            value={filterState.searchType === "ingredients"}
            onChange={filterHandler}
          />
          <input
            type="checkbox"
            name="cuisine"
            id="cuisine"
            value={filterState.searchType === "cuisine"}
            onChange={filterHandler}
          />
        </div>
      </div>
    </div>
  );
};
export default Home;
