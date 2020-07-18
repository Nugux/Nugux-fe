export const getCongestionColor = congestion => {
  if (congestion < 2.0) {
    return "#75D701";   // GREEN
  } else if (congestion < 3.5) {
    return "rgba(239, 220, 5, 0.75)";   // YELLOW
  }
  return "#ff7473";   // RED
};

export const getDayColor = day => {
  if (day === "일") {
    return "red";
  } else if (day === "토") {
    return "#2b90d9";   // BLUE
  }
  return "black";
};