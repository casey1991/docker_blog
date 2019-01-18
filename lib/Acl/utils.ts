export const allowsBucket = role => {
  return 'allows_' + role;
};
export const removeUnsupportedChar = (text: string) => {
  text = decodeURIComponent(text);
  text = text.replace(/[/\s]/g, '_'); // replaces slashes and spaces
  return text;
};
