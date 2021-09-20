import {useRouter} from 'next/dist/client/router'
import {MetaCard} from '@/components/meta-card/MetaCard'

export default function OgImagePage() {
  const {
    query: {slug}
  } = useRouter()

  return <MetaCard slug={slug} />
}
