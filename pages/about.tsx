import {CustomImage} from '@/components/CustomImage'
import {DefaultLayout} from '@/components/layouts/DefaultLayout'
import {PageHeading} from '@/components/PageHeading'

export default function AboutPage() {
  return (
    <DefaultLayout pageMeta={{title: 'About Nicklas Jarnesjö'}}>
      <PageHeading>Who's Jarnesjö?</PageHeading>
      <div className="prose prose-lg md:prose-2xl mb-12">
        <div className="md:grid md:grid-cols-3 md:gap-4">
          <div className="-mx-4 md:-ml-12 lg:-ml-24 md:mr-0 text-center overflow-hidden">
            <CustomImage
              src="/static/images/jarnesjo-beach.jpg"
              alt="Nicklas Jarnesjö posing"
              width="3024"
              height="3185"
            />
          </div>
          <div className="col-span-2 font-medium">
            <p>Hi! I'm Nicklas Jarnesjö and I have worked as web developer since 2010.</p>
            <p>
              I'm curious by nature and love to learn new things both in the real world and sniffing
              around in others source code.
            </p>
          </div>
        </div>
      </div>
      <div className="prose md:prose-lg">
        <h2>Work</h2>
        <div className="md:grid md:grid-cols-4 md:gap-4">
          <div className="col-span-3">
            <p style={{marginTop: 0}}>
              Most of the time I work at <a href="https://webready.se">Webready</a>, a small
              development agency in Kalmar, Sweden, which I'm also founded in 2008 during my
              development eduction.
              <br />
              We were specializing in PHP and worked mainly with Laravel and WordPress. Since then
              we have shift focus and working more with the JS-stack both with clients and as
              consultants.
            </p>
            <p>
              I'm also working part time at Naviga Content Lab as senior front-end web developer.
              We're developing software for the media and publishing industry.
            </p>
          </div>
          <div className="md:-mr-12 lg:-mr-24 flex justify-center items-center">
            <div className="h-40 w-40">
              <CustomImage
                src="/static/images/webready.png"
                width={500}
                height={500}
                noPlaceholder
              />
            </div>
          </div>
        </div>

        <div className="md:grid md:grid-cols-3 md:gap-4">
          <div className="col-span-2 overflow-hidden md:order-2">
            <h2>Offline</h2>
            <p>
              Beside development I like to doing CrossFit especially olympic weightlifting. I'm
              fortune enough to have a small family with two children which I like to spend time and
              laugh together with. Also loves the woods and nature.
            </p>
            <p>
              One of my biggest dreams are to move to a small farm and getting back to roots with
              animals and farming.
            </p>
          </div>
          <div className="-mx-4 md:-ml-12 lg:-ml-24 md:mr-0 text-center overflow-hidden flex items-center md:mt-10 md:order-1">
            <CustomImage
              src="/static/images/climbing.jpg"
              alt="Nicklas doing rope climbs"
              width="1000"
              height="1000"
            />
          </div>
        </div>
      </div>
    </DefaultLayout>
  )
}
