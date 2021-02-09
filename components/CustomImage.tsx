import Image, {ImageProps} from 'next/image'

const CustomImage = ({src, ...props}: ImageProps) => {
  const image = require(`../public${src}`)

  console.log(image)

  return (
    <div className="relative overflow-hidden flex">
      <img
        src={image.preSrc}
        alt=""
        className="absolute inset-0 w-full h-full img-placeholder"
        aria-hidden
      />
      <Image src={src} {...props} />
    </div>
  )
}

export {CustomImage}
