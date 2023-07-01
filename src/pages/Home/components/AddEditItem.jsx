import { useContext, useState } from "react";
import { DataContext } from "../../../context/DataContext";
import { trimArray } from "../../../utils/trimArray";
const AddEditItem = ({ mode, data = null }) => {
  const [formState, setFormState] = useState(
    mode === "edit"
      ? data
      : {
          name: "",
          cuisineType: "",
          ingredients: [""],
          instructions: [""],
        }
  );

  const dataCtx = useContext(DataContext);
  const addNewItem = (elemName) => {
    setFormState((prevState) => {
      if (elemName === "ingr") {
        return {
          ...prevState,
          ingredients: [...prevState.ingredients, ""],
        };
      }
      return {
        ...prevState,
        instructions: [...prevState.instructions, ""],
      };
    });
  };

  const arrayInputHandler = (name, updateIndex, value) => {
    setFormState((prevState) => {
      return {
        ...prevState,
        [name]: prevState[name].map((item, index) =>
          index === updateIndex ? value : item
        ),
      };
    });
  };

  const addToRecipeData = () => {
    const trimmedData = {
      ...formState,
      ingredients: trimArray(formState.ingredients),
      instructions: trimArray(formState.instructions),
    };
    dataCtx.dispatch({
      type: mode === "add" ? "ADD" : "UPDATE",
      payload: trimmedData,
    });
  };

  return (
    <div className="recipe-modal">
      <h2>New Recipe</h2>
      <label>
        Name:
        <input
          type="text"
          placeholder="Enter name"
          value={formState.name}
          onChange={({ target: { value } }) =>
            setFormState((prevState) => ({ ...prevState, name: value }))
          }
        />
      </label>
      <label>
        Cuisine:
        <input
          type="text"
          placeholder="Enter Cuisine"
          value={formState.cuisineType}
          onChange={({ target: { value } }) =>
            setFormState((prevState) => ({ ...prevState, cuisineType: value }))
          }
        />
      </label>
      <label>
        Ingredients:
        {formState.ingredients.map((item, index) => {
          return (
            <input
              type="text"
              value={item}
              key={index}
              placeholder="Enter the ingredient"
              onChange={({ target: { value } }) =>
                arrayInputHandler("ingredients", index, value)
              }
            />
          );
        })}
        <button onClick={() => addNewItem("ingr")}>Add new ingredient</button>
      </label>
      <label>
        Instructions:
        {formState.instructions.map((item, index) => {
          return (
            <input
              type="text"
              value={item}
              key={index}
              placeholder="Enter the instruction"
              onChange={({ target: { value } }) =>
                arrayInputHandler("instructions", index, value)
              }
            />
          );
        })}
        <button onClick={() => addNewItem()}>Add new instruction</button>
      </label>
      <button onClick={addToRecipeData}>
        {mode === "add" ? "Add " : "Update "}
      </button>
    </div>
  );
};

export default AddEditItem;
