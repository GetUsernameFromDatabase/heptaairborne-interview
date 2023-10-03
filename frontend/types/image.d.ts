export interface Image {
  id: number;
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
