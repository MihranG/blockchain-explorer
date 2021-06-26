import { IResponseResult } from '../types/Interfaces';
import { numberFromHexString } from './helpers';
// type THashNames = {
//     'hash' |
//     'parentHash'|
//     'sha3Uncles'|
//     'stateRoot'|
//     'nonce'
// }

const arrayOfHashes: string[] = [
  'hash',
  'parentHash',
  'sha3Uncles',
  'stateRoot',
  'nonce',
  'miner',
  'mixHash',
  'extraData',
];
export const setOfHashes = new Set(arrayOfHashes);

export const hexNumberObjectManipulation = (
  resultObj: IResponseResult
): IResponseResult => {
  const obj: { [key: string]: string } = {};
  Object.keys(resultObj).forEach((e, index) => {
    const elementKey = e as keyof IResponseResult;
    if (resultObj[elementKey]) {
      const element = resultObj[elementKey];
      if (
        typeof element === 'string' &&
        !setOfHashes.has(elementKey) &&
        element.includes('0x')
      ) {
        const number = numberFromHexString(element);
        if (elementKey === 'timestamp') {
          const date = new Date(number * 1000);
          obj[
            elementKey
          ] = `${date.toLocaleDateString()}  ${date.toLocaleTimeString()}`;
        } else if (true || elementKey === 'number') {
          obj[elementKey] = number.toString();
        } else {
          obj[elementKey] = number.toLocaleString();
        }
      }
    }
  });

  return { ...resultObj, ...obj };
};
