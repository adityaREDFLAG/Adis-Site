import * as React from 'react'
import { NextSeo } from 'next-seo'

import type { NextPage } from 'next'

const ContentPage: NextPage = () => {
  return (
    <>
      <NextSeo title="Info" titleTemplate="%s"/>
      <div>
        <h1>What's adi's studio</h1> 
        <p>Adi's studio is a upcoming studio! We are currently developing a bot and this site.</p>
      </div>
    </>
  )
}

export default ContentPage
