const calculatePinOffset = (keyPosition, unlocks, idx) => {
  if (keyPosition <= 10 + idx * 18) return 0;
  if (keyPosition <= 20 + idx * 18) return 15;
  if (keyPosition <= 36 + idx * 18) return 15 + unlocks[4];
  if (keyPosition <= 38 + idx * 18) return 15;
  if (keyPosition <= 54 + idx * 18) return 15 + unlocks[3];
  if (keyPosition <= 56 + idx * 18) return 15;
  if (keyPosition <= 72 + idx * 18) return 15 + unlocks[2];
  if (keyPosition <= 74 + idx * 18) return 15;
  if (keyPosition <= 90 + idx * 18) return 15 + unlocks[1];
  if (keyPosition <= 92 + idx * 18) return 15;
  if (keyPosition <= 108 + idx * 18) return 15 + unlocks[0];
  return 0;
};

const getPinsOffsets = (keyPosition, unlocks) =>
  new Array(5)
    .fill(0)
    .map((_, idx) => calculatePinOffset(keyPosition, unlocks, idx));

export default getPinsOffsets;
