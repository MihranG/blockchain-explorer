export const hexFromDecimalString = (digitString: string): string => {
    return `0x${parseInt(digitString).toString(16)}`;
}
