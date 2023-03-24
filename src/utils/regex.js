export const hasOnlySpaces = (str) => {
  return /^$|^\s*$/.test(str);
}

export const hasOnlyLettersWithDashComma = (str) => {
  return /^$|^[a-zA-Z\s,-]+$/.test(str);
}