import Footer from '@/components/Footer'
import Header from '@/components/Header'
import Link from 'next/link'
import { client } from '@/libs/client'
import React, { useState } from 'react'
import TimeStamp from '@/components/TimeStamp'
import Pagination from '@/components/Pagination'
import CommonMeta from '@/components/CommonMeta'
import Image from 'next/image'

const PER_PAGE = 6;

const BlogPage = ({ blog, totalCount }) => {

    const [isActive, setIsActive] = useState(false);

    return (
        <div className={`blog-page ${isActive ? 'is-active' : ''}`}>
            <CommonMeta
                title='まいにち通信 | cloudee'
                type='article'
                imgUrl='/images/blog.png'
                description='@y_taのブログ「cloudee」のブログページです。'
            />
            <Header isActive={isActive} setIsActive={setIsActive} />

            <main>
                <section className='blog'>
                    <div className='container'>

                        <div className='d-flex align-items-center justify-content-center page-title'>
                            <div className='page-title-icon-box'>
                                <Image src="/images/kamihikouki.png" width={60} height={60} alt="" />
                            </div>
                            <h2>まいにち通信</h2>
                        </div>

                        <div className='blog-main row d-flex justify-content-center g-0'>
                            <div className='col-lg-10 col-sm-12 col-11'>
                                <div className='row g-4'>
                                    {blog.map((blog) => (
                                        <div className='col-lg-4 col-sm-6' key={blog.id}>
                                            <div className='bg-white blog-card'>
                                                <Link href={`/blog/${blog.id}`}>
                                                    <div className="blog-img-box">
                                                        <Image src={blog.thumbnail.url} fill size="100%" className="image" alt=""/>
                                                    </div>
                                                    <div className='blog-text-box'>
                                                        <TimeStamp timeStamp={blog.timestamp} retimeStamp={blog.retimestamp} />
                                                        <h3>{blog.title}</h3>
                                                    </div>
                                                </Link>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <Pagination totalCount={totalCount} />
                    </div>

                </section>

            </main>

            <Footer />
        </div>
    )
}

export default BlogPage

export const getStaticPaths = async () => {

    const repos = await client.get({ endpoint: "blog" });

    const range = (start, end) => [...Array(end - start + 1)].map((_, i) => start + i);

    const paths = range(1, Math.ceil(repos.totalCount / PER_PAGE)).map((repo) => `/blog/page/${repo}`);

    return { paths, fallback: false };
};

// データを取得
export const getStaticProps = async (context) => {
    const id = context.params.id;

    const data = await client.get({ endpoint: "blog", queries: { offset: (id - 1) * 6, limit: 6 } });

    return {
        props: {
            blog: data.contents,
            totalCount: data.totalCount,
        },
    };
};



