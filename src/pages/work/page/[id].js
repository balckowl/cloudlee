import CommonMeta from '@/components/CommonMeta';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import Pagination from '@/components/Pagination';
import TimeStamp from '@/components/TimeStamp';
import { client } from '@/libs/client';
import Link from 'next/link';
import React, { useState } from 'react'

const PER_PAGE = 6;

const WorkPage = ({ work, totalCount }) => {

    const [isActive, setIsActive] = useState(false);
    
    return (
        <div className={`blog-page ${isActive ? 'is-active' : ''}`}>
            <CommonMeta
                title='作ったもの | cloudlee'
                type='article'
                imgUrl='/images/work.png'
                description='@y_taのブログ「cloudee」の作品ページです。'
            />
            <Header isActive={isActive} setIsActive={setIsActive}/>

            <main>
                <section className='blog'>
                    <div className='container'>

                        <div className='d-flex align-items-center justify-content-center page-title'>
                            <div className='page-title-icon-box'>
                                <img src="/images/keybord.png" />
                            </div>
                            <h2>つくった作品</h2>
                        </div>

                        <div className='blog-main row d-flex justify-content-center g-0'>
                            <div className='col-lg-10 col-sm-12 col-11'>
                                <div className='row g-4'>
                                    {work.map((work) => (
                                        <div className='col-lg-4 col-sm-6' key={work.id}>
                                            <div className='bg-white blog-card'>
                                                <Link href={`/work/${work.id}`}>
                                                    <div className="blog-img-box">
                                                        <img src={work.thumbnail.url} />
                                                    </div>
                                                    <div className='blog-text-box'>
                                                        <TimeStamp timeStamp={work.timestamp} retimeStamp={work.retimestamp} />
                                                        <h3>{work.title}</h3>
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

export const getStaticPaths = async () => {

    const repos = await client.get({ endpoint: "work" });

    const range = (start, end) => [...Array(end - start + 1)].map((_, i) => start + i);

    const paths = range(1, Math.ceil(repos.totalCount / PER_PAGE)).map((repo) => `/work/page/${repo}`);

    return { paths, fallback: false };
};

// データを取得
export const getStaticProps = async (context) => {
    const id = context.params.id;

    const data = await client.get({ endpoint: "work", queries: { offset: (id - 1) * 6, limit: 6 } });

    return {
        props: {
            work: data.contents,
            totalCount: data.totalCount,
        },
    };
};

export default WorkPage
