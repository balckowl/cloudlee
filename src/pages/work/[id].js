import CommonMeta from '@/components/CommonMeta'
import Footer from '@/components/Footer'
import Header from '@/components/Header'
import TimeStamp from '@/components/TimeStamp'
import { client } from '@/libs/client'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState, useEffect } from 'react'
import Prism from 'prismjs'
import 'prism-themes/themes/prism-vsc-dark-plus.min.css'

const WorkId = ({ work }) => {

    const [isActive, setIsActive] = useState(false);

    useEffect(() => {
        Prism.highlightAll()
    })

    return (
        <div className={`blog-id ${isActive ? 'is-active' : ''}`}>
            <CommonMeta
                title={`${work.title} | cloudlee`}
                type='article'
                imgUrl={work.thumbnail.url}
                description={work.description}
            />
            <Header isActive={isActive} setIsActive={setIsActive} />

            <main>
                <section className="blog">
                    <div className="container">

                        <div className='d-flex align-items-center justify-content-center page-title'>
                            <div className='page-title-icon-box'>
                                <Image src={work.category?.image.url} width={60} height={60} alt="" />˝
                            </div>
                            <h2>{work.category?.title}</h2>
                        </div>

                        <div className='row d-flex justify-content-center g-0'>
                            <div className='col-xl-8 col-lg-9'>
                                <div className='bg-white article-outer'>
                                    <div className='container'>
                                        <div className="row d-flex justify-content-center">
                                            <div className="col-11">
                                                <article>
                                                    <h2>{work.title}</h2>
                                                    <div class="article-posttime-box">
                                                        <TimeStamp timeStamp={work.timestamp} retimestamp={work.retimestamp} />
                                                    </div>
                                                    <div className='thumbnail-box'>
                                                        <Image src={work.thumbnail.url} fill size="100%" className="image" alt="" />
                                                    </div>

                                                    <div className="article-share-btn-box">
                                                        <ul className="d-flex justify-content-center gap-3">
                                                            <li><Link href={`https://twiter.com/share?url=http://localhost:3000/work/${work.id}`}><Image src="/images/x2.png" width={60} height={60} alt="" /></Link></li>
                                                            <li><Image src="/images/fb.png" width={60} height={60} alt="" /></li>
                                                            <li><Image src="/images/line.png" width={60} height={60} alt="" /></li>
                                                        </ul>
                                                    </div>

                                                    <div className='article-content' dangerouslySetInnerHTML={{
                                                        __html: `${work.body}`
                                                    }}></div>

                                                    <div className="writer-box">
                                                        <div className="row d-flex justify-content-center g-0">
                                                            <div className="col-9">
                                                                <div className="row d-flex align-items-center justify-content-center g-0">
                                                                    <div className="col-sm-5">
                                                                        <div className="writer-icon-box">
                                                                            <Image src="/images/icon-me.png" width={100} height={100} alt="" />
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-sm-7">
                                                                        <div className="writer-text-box">
                                                                            <h4>@y_ta</h4>
                                                                            <p>Next.jsやSvelteを中心に触ってます。</p>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </article>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="more-btn-box">
                            <Link href="/work/page/1" className="bg-dark text-light">他の記事も読む</Link>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div >
    )
}

export default WorkId

export const getStaticPaths = async () => {
    const data = await client.get({ endpoint: "work" });

    const paths = data.contents.map((content) => `/work/${content.id}`);
    return { paths, fallback: false };
};

// データをテンプレートに受け渡す部分の処理を記述します
export const getStaticProps = async (context) => {
    const id = context.params.id;
    const data = await client.get({ endpoint: "work", contentId: id });

    return {
        props: {
            work: data,
        },
    };
}