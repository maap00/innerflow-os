export const HABIT_CATEGORIES = {
  physical: {
    id: "physical",
    label: "Physical",
    icon: "💪",
    color: "#EF4444",
  },

  mental: {
    id: "mental",
    label: "Mental",
    icon: "🧠",
    color: "#3B82F6",
  },

  spiritual: {
    id: "spiritual",
    label: "Spiritual",
    icon: "🧘",
    color: "#A855F7",
  },
};

export function getCategory(category) {
  return (
    HABIT_CATEGORIES[category] ??
    HABIT_CATEGORIES.mental
  );
}

export function getAllCategories() {
  return Object.values(
    HABIT_CATEGORIES
  );
}