export const getPercent = (val, max) => (val / max) * 100;
export const getValueFromPercent = (percent, max) => (percent * max) / 100;
export const rangedValue = (val, min, max) => Math.min(Math.max(val, min), max);
