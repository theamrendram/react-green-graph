import { colors as defaultColors } from "./constants";

const getColor = (contributionCount, colors = defaultColors) => {
  console.log("getColor called with:", {
    contributionCount,
    colors,
    isArray: Array.isArray(colors),
  });

  // Handle array format (5 colors)
  if (Array.isArray(colors)) {
    if (contributionCount === 0) {
      return colors[0] || "#ebedf0"; // No contributions
    } else if (contributionCount >= 1 && contributionCount <= 3) {
      return colors[1] || "#c6e48b"; // Light for 1-3 contributions
    } else if (contributionCount >= 4 && contributionCount <= 6) {
      return colors[2] || "#7bc96f"; // Medium for 4-6 contributions
    } else if (contributionCount >= 7 && contributionCount <= 9) {
      return colors[3] || "#239a3b"; // Dark for 7-9 contributions
    } else if (contributionCount >= 10) {
      return colors[4] || "#196127"; // Darkest for 10+ contributions
    } else {
      return colors[0] || "#ebedf0"; // Default fallback
    }
  }

  // Handle object format (matching the colorMap structure from component)
  if (contributionCount === 0) {
    return colors[0]; // No contributions
  } else if (contributionCount >= 1 && contributionCount <= 3) {
    return colors[1]; // Light green for 1-3 contributions
  } else if (contributionCount >= 4 && contributionCount <= 6) {
    return colors[2]; // Medium green for 4-6 contributions
  } else if (contributionCount >= 7 && contributionCount <= 9) {
    return colors[3]; // Dark green for 7-9 contributions
  } else if (contributionCount >= 10) {
    return colors[4]; // Darkest green for 10+ contributions
  } else {
    return colors[0]; // Default fallback
  }
};

export default getColor;
