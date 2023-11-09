// Define reducers for managing the game state
const initialState = {
  score: 0,
  gamesWon: localStorage.getItem("gamesWon")
    ? parseInt(localStorage.getItem("gamesWon"), 10)
    : 0,
  gamesLost: localStorage.getItem("gamesLost")
    ? parseInt(localStorage.getItem("gamesLost"), 10)
    : 0,
};

const gameReducer = (state = initialState, action) => {
  switch (action.type) {
    case "INCREMENT_SCORE":
      return {
        ...state,
        score: state.score + action.payload, // Increment score by burstCount
      };
    case "INCREMENT_GAMES_WON":
      const updatedGamesWon = state.gamesWon + 1;
      localStorage.setItem("gamesWon", updatedGamesWon);
      return {
        ...state,
        gamesWon: updatedGamesWon,
      };
    case "INCREMENT_GAMES_LOST":
      const updatedGamesLost = state.gamesLost + 1;
      localStorage.setItem("gamesLost", updatedGamesLost);
      return {
        ...state,
        gamesLost: updatedGamesLost,
      };
    default:
      return state;
  }
};

export default gameReducer;
