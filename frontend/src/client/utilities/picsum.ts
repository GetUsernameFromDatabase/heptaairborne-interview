/**
 * Parses id, width, height from picsum url
 * @example
 * input url = "https://picsum.photos/id/0/5000/3333"
 * returns { id:0, width:5000, height:3333 }
 */
export function parsePicsumUrl(url: string) {
  const urlParts = url.split('/');
  const id = Number(urlParts[urlParts.length - 3]);
  const width = Number(urlParts[urlParts.length - 2]);
  const height = Number(urlParts[urlParts.length - 1]);
  return { id, width, height };
}

/**
 * Constructs picsum url
 * @example
 * input id=0, width=5000, height=3333
 * returns "https://picsum.photos/id/0/5000/3333"
 */
export function constructPicsumUrl(id: number, width: number, height: number) {
  return `https://picsum.photos/id/${id}/${width}/${height}`;
}

/**
 * Modifies the dimensions in a Picsum image URL.
 *
 * ID is taken from the URL
 *
 * This function takes a Picsum image URL and desired dimensions as input.
 * It returns a new URL with the updated dimensions.
 * If the desired height is not provided, it is calculated using
 *  the aspect ratio from the original dimensions in the URL.
 *
 * @param url - The original Picsum image URL.
 * @example 'https://picsum.photos/id/0/5000/3333'
 *
 * @param desiredWidth - The desired width for the image. Must be a positive integer.
 *
 * @param desiredHeight  - The desired height for the image.
 * If null, the height is calculated using the aspect ratio from the original dimensions in the URL.
 * @default desiredHeight=null
 *
 * @returns The modified Picsum image URL with the updated dimensions.
 */

export function changePicsumUrlSize(
  url: string,
  desiredWidth: number,
  desiredHeight: number | null = null
) {
  // extract the width and height
  const { id, width, height } = parsePicsumUrl(url);
  let urlParts = url.split('/');

  if (desiredWidth && desiredHeight) {
    return constructPicsumUrl(id, desiredWidth, desiredHeight);
  }

  let currentWidth = parseInt(urlParts[urlParts.length - 2]);
  let currentHeight = parseInt(urlParts[urlParts.length - 1]);

  let ratio = currentHeight / currentWidth;
  let calculatedHeight = Math.round(desiredWidth * ratio);
  return constructPicsumUrl(id, desiredWidth, calculatedHeight);
}
