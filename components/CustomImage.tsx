import Image, {ImageProps} from 'next/image'

const CustomImage = ({src, ...props}: ImageProps) => {
  const image = require(`../public${src}`)

  return (
    <div className="relative overflow-hidden flex">
      {image.preSrc && (
        <img
          src={image.preSrc}
          alt=""
          className="absolute inset-0 w-full h-full img-placeholder"
          aria-hidden="true"
        />
      )}
      <Image src={image?.src || image.default} {...props} />
    </div>
  )
}

export {CustomImage}
