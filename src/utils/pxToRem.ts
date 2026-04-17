export const HTML_FONT_SIZE = 16;

export function pxToRem(px: number) {
  return `${px / HTML_FONT_SIZE}rem`;
}
