export interface IImageRecipe {
  className?: string
  src: File | string | null
  onChangeImage?: (image: File) => void
}
