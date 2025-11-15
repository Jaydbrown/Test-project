// Contribution tiers players can choose from.
// Each tier increases both the required amount and the reward.
export const TIERS = [
  { id: 1, name: 'Tier 1', amount: 10000, interest: 5 },   // Entry level — small start, steady return
  { id: 2, name: 'Tier 2', amount: 20000, interest: 10 },  // Middle tier — balanced risk and reward
  { id: 3, name: 'Tier 3', amount: 30000, interest: 20 },  // Premium tier — higher stake, higher gain
];

// Percentage of profit a player can expect from each game round.
export const GAME_RETURN_RATE = 0.2; // 20% return rate

// Maximum number of players allowed in a single game session.
export const MAX_STUDENTS = 12; // Keeps the experience manageable and fair
