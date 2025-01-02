export function calculateTextStats(text) {
  return {
    length: text.length,
    lines: text ? text.split('\n').length : 0,
    numbers: (text.match(/\d/g) || []).length,
    capitalLetters: (text.match(/[A-Z]/g) || []).length,
    bytes: new Blob([text]).size
  };
}