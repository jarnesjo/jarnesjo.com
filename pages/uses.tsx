import {CustomImage} from '@/components/CustomImage'
import {DefaultLayout} from '@/components/layouts/DefaultLayout'
import {PageHeading} from '@/components/PageHeading'
import Image from 'next/image'

export default function UsesPage() {
  return (
    <DefaultLayout>
      <PageHeading>What do I use?</PageHeading>

      <div className="prose md:prose-lg mx-auto">
        <p>
          Because I'm interested in what other uses on daily basis I also want to share my things.
          Most of the things have been accumilated over years and
        </p>

        <CustomImage
          src="/static/images/home-office.jpeg"
          alt="My computer desk at home"
          width="4032"
          height="3024"
        />

        <h3>Computer / Office</h3>
        <ul>
          <li>15" Macbook Pro (2018)</li>
          <li>37.5" Curved UltraWide LG 38WK95C-W</li>
          <li>Magic Mouse 2</li>
          <li>Magic Keyboard with numeric</li>
          <li>IKEA Bekant with adjustable height</li>
          <li>HÅG Capisco 8107 (saddle chair)</li>
        </ul>

        <h3>Coding</h3>
        <ul>
          <li>Editor: VSCode</li>
          <li>Theme: Night Owl (On trail)</li>
          <li>Terminal: iTerm2</li>
        </ul>

        <h3>Audio</h3>
        <ul>
          <li>Bose NC 700</li>
          <li>Airpods Pro</li>
        </ul>

        <h3>Other tech</h3>
        <ul>
          <li>iPhone X</li>
          <li>Kobo Libra H20</li>
        </ul>
      </div>
    </DefaultLayout>
  )
}