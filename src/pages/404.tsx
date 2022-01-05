import {DefaultLayout} from '@/components/layouts/DefaultLayout'
import {PageHeading} from '@/components/PageHeading'

export default function Page404() {
  return (
    <DefaultLayout>
      <PageHeading>404</PageHeading>
      <div className="text-center">
        <p>Page not found...</p>
      </div>
    </DefaultLayout>
  )
}
