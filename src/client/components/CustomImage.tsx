import Image, {ImageProps} from 'next/image'

export type CustomImageType = ImageProps & {
  noPlaceholder?: boolean
}

const CustomImage = ({src, noPlaceholder, ...props}: CustomImageType) => {
  // const image = src.startsWith('http') ? {src} : require(`../../../public${src}`)

  return (
    <div className="relative overflow-hidden flex rounded-none sm:rounded-md">
      {/* {image.dataURI && !noPlaceholder && (
        <img
          src={image.dataURI}
          className="absolute inset-0 w-full h-full transform scale-110 m-0"
          style={{filter: 'blur(20px)'}}
          aria-hidden="true"
          alt=""
        />
      )} */}
      <Image src={src} {...props} />
    </div>
  )
}

export {CustomImage}
