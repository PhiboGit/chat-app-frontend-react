export const initialState = {
  profession: 'toolsmith',
  limit: false,
  iterations: 1,
  recipeName: '',
  selectedIngredients: [],
}

export function craftingActionReducer(state, action) {
  const gameData = state.gameData

  switch (action.type) {
    case 'changed_profession': {
      return {
        ...initialState,
        gameData: state.gameData,
        profession: action.profession,
      };
    }
    case 'changed_recipeName': {
      return {
        ...state,
        recipeName: action.recipeName,
        selectedIngredients: gameData.recipesData[action.recipeName].ingredients
          .map((ingredientSlot) => ingredientSlot.required ? ingredientSlot.slot[0].resource : "")
      };
    }

    case 'changed_selectedIngredients': {
      const newSelectedIngredients = [...state.selectedIngredients];
      newSelectedIngredients[action.ingredientSlotIndex] = action.ingredientName
      return {
        ...state,
        selectedIngredients: newSelectedIngredients
      }
    }

    case 'changed_limit': {
      return {
        ...state,
        limit: action.limit
      }
    }

    case 'changed_iterations': {
      return {
        ...state,
        iterations: action.iterations
      }
    }
    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
}
