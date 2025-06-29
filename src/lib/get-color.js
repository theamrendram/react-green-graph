import { colors as defaultColors } from "./constants";

const getColor = (contributionCount, colors = defaultColors) => {
  if (contributionCount === 0) {
    return colors[0]; // No contributions
  } else if (contributionCount >= 1 && contributionCount <= 3) {
    return colors[1]; // Light green for 1-3 contributions
  } else if (contributionCount >= 4 && contributionCount <= 6) {
    return colors[2]; // Medium green for 4-6 contributions
  } else if (contributionCount >= 7 && contributionCount <= 9) {
    return colors[5]; // Dark green for 7-9 contributions
  } else if (contributionCount >= 10) {
    return colors[10]; // Darkest green for 10+ contributions
  } else {
    return colors[0]; // Default fallback
  }
};

export default getColor;
