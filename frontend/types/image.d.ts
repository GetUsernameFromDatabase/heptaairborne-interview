export interface Image {
  /**
   * ID in the database
   */
  id: number;
  /**
   * Url of the image
   * @example "https://picsum.photos/id/488/1772/1181"
   */
  imageUrl: string;
  /**
   * The original image width -- **MAX** image width
   */
  width: number;
  /**
   * The original image height -- **MAX** image height
   */
  height: number;
  description: string;
}
