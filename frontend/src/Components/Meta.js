import React from 'react'
import Helmet from 'react-helmet'
const Meta = ({ title, description, keywords }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name='description' content={description} />
      <meta name='keyword' content={keywords} />
    </Helmet>
  )
}

Meta.defaultProps = {
  title: 'Welcome To Webstore',
  description: 'Best place to buy fashion',
  keywords: 'fashion, buy fashion, modern fashion, burberry, style',
}

export default Meta
