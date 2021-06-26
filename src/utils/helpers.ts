export const hexFromDecimalString = (digitString: string): string => {
  return `0x${parseInt(digitString).toString(16)}`;
};

export const numberFromHexString = (hexString: string): number => {
  return parseInt(hexString, 16);
};

export const hexToAsciiString = (hexString: string): string => {
  console.log('hexS', hexString);
  const hexStringChanged = hexString.split('x')[1];
  let strOut = '';
  for (let x = 0; x < hexStringChanged.length; x += 2) {
    strOut += String.fromCharCode(parseInt(hexStringChanged.substr(x, 2), 16));
  }
  return strOut;
};
