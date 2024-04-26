import Image, {ImageProps} from 'next/image'

export type CustomImageType = ImageProps & {
  noPlaceholder?: boolean
}

const CustomImage = ({src, noPlaceholder, ...props}: CustomImageType) => {
  return (
    <div className="relative overflow-hidden flex rounded-none sm:rounded-md">
      <Image src={src} {...props} />
    </div>
  )
}

export {CustomImage}
