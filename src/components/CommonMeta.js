import Head from 'next/head'
import React from 'react'

const CommonMeta = ({ title, imgUrl, type, description, url }) => {
    return (
        <Head>
            <title>{title}</title>
            <meta name="description" content={description} />
            <meta property="og:title" content={title} />
            <meta property="og:url" content={url} />
            <meta property="og:site_name" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:type" content={type} />
            <meta property="og:image" content={imgUrl} />
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:site" content="@blackcat_0506" />
        </Head>
    )
}

export default CommonMeta