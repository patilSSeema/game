// Define actions for managing the game state
export const incrementScore = (burstCount) => ({
  type: "INCREMENT_SCORE",
  payload: burstCount,
});
export const incrementGamesWon = () => ({
  type: "INCREMENT_GAMES_WON",
});

export const incrementGamesLost = () => ({
  type: "INCREMENT_GAMES_LOST",
});
