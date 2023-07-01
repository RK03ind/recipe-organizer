import { createContext, useReducer } from "react";
import { nanoid } from "nanoid";
export const DataContext = createContext();
const intialValue = [
  {
    cuisineType: "Italian",
    id: 1,
    name: "Spaghetti Bolognese",
    ingredients: [
      "300g spaghetti",
      "250g ground beef",
      "1 onion, diced",
      "2 cloves of garlic, minced",
      "400g canned tomatoes",
      "2 tablespoons tomato paste",
      "1 teaspoon dried oregano",
      "1 teaspoon dried basil",
      "Salt and pepper to taste",
      "Grated Parmesan cheese for serving",
    ],
    instructions: [
      "Cook spaghetti according to package instructions. Drain and set aside.",
      "In a large skillet, brown the ground beef over medium heat. Add the diced onion and minced garlic, and cook until the onion is translucent.",
      "Add the canned tomatoes, tomato paste, dried oregano, and dried basil to the skillet. Stir well to combine.",
      "Simmer the sauce over low heat for about 15 minutes, stirring occasionally. Season with salt and pepper to taste.",
      "Serve the spaghetti topped with the Bolognese sauce and sprinkle with grated Parmesan cheese.",
    ],
  },
];
const reducer = (state, action) => {
  switch (action.type) {
    case "ADD": {
      return [
        ...state,
        {
          ...action.payload,
          id: nanoid(),
        },
      ];
    }
    case "UPDATE": {
      return state.map((item) => {
        console.log(action.payload);
        // if (item.id === action.payload.id) {
        //   return action.payload;
        // } else item;
        return item;
      });
    }
    default:
      return state;
  }
};

export const DataProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, intialValue);

  const getById = (postId) => {
    return state.posts.find((item) => item.postId === postId);
  };
  return (
    <DataContext.Provider value={{ state, dispatch, getById }}>
      {children}
    </DataContext.Provider>
  );
};
