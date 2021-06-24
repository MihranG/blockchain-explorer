export const hexFromDecimalString = (digitString: string): string => {
  return `0x${parseInt(digitString).toString(16)}`;
};

export const numberFromHexString = (hexString: string): number => {
  return parseInt(hexString, 16);
};
