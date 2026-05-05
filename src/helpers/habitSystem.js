export const getStageLabel = (stage) => {
  if (stage === 1) return "Destrucción";
  if (stage === 2) return "Implementación";
  return "Integración";
};