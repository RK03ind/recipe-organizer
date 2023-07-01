import { GrEdit } from "react-icons/gr";
import { MdDelete } from "react-icons/md";
const RecipeItem = (props) => {
  const { name, cuisineType, ingredients, instructions, setModalState } = props;
  return (
    <div className="recipe">
      <img src="https://picsum.photos/200" alt="randome" />
      <h3>{name}</h3>
      <div className="data">
        Cuisine Type: <span>{cuisineType}</span>
      </div>
      <div className="data">
        Ingredients: <span>See the Ingredients {`>`}</span>
      </div>
      <div className="data">
        Instructions: <span>See the Instructions {`>`}</span>
      </div>
      <div className="edit-del data">
        <GrEdit
          onClick={() =>
            setModalState({
              visibility: true,
              mode: "edit",
              data: { ingredients, instructions, name, cuisineType },
            })
          }
        />
        <MdDelete />
      </div>
    </div>
  );
};
export default RecipeItem;
