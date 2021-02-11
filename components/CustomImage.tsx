import Image, {ImageProps} from 'next/image'

const CustomImage = ({src, ...props}: ImageProps) => {
  const image = src.startsWith('http') ? {src} : require(`../public${src}?lqip`)

  return (
    <div className="relative overflow-hidden flex">
      {image.dataURI && (
        <img
          src={image.dataURI}
          alt=""
          className={`absolute inset-0 w-full h-full img-placeholder`}
          aria-hidden="true"
        />
      )}
      <Image src={image?.src || image.default} {...props} />
    </div>
  )
}

export {CustomImage}
