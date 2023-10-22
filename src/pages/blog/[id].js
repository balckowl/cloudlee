import Footer from '@/components/Footer'
import Header from '@/components/Header'
import { client } from "../../libs/client";
import TimeStamp from '@/components/TimeStamp';
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import CommonMeta from '@/components/CommonMeta';
import Image from 'next/image';
import Prism from 'prismjs'
import 'prism-themes/themes/prism-vsc-dark-plus.min.css'

const BlogId = ({ blog }) => {

    const [isActive, setIsActive] = useState(false);

    useEffect(() => {
        Prism.highlightAll()
    })

    return (
        <div className={`blog-id ${isActive ? 'is-active' : ''}`}>
            <CommonMeta
                title={`${blog.title} | cloudlee`}
                type='article'
                imgUrl={blog.thumbnail.url}
                description={blog.description}
            />
            <Header isActive={isActive} setIsActive={setIsActive} />

            <main>
                <section className="blog">
                    <div className="container">

                        <div className='d-flex align-items-center justify-content-center page-title'>
                            <div className='page-title-icon-box'>
                                <Image src={blog.category?.image.url} width={60} height={60} alt="" />
                            </div>
                            <h2>{blog.category?.title}</h2>
                        </div>

                        <div className='row d-flex justify-content-center g-0'>
                            <div className='col-xl-8 col-lg-9'>
                                <div className='bg-white article-outer'>
                                    <div className='container'>
                                        <div className="row d-flex justify-content-center">
                                            <div className="col-11">
                                                <article>
                                                    <div className='article-inner'>
                                                        <h2>{blog.title}</h2>
                                                        <div className="article-posttime-box">
                                                            <TimeStamp timeStamp={blog.timestamp} retimestamp={blog.retimestamp} />
                                                        </div>
                                                        <div className='thumbnail-box'>
                                                            <Image src={blog.thumbnail.url} fill size="100%" className="image" alt="" />
                                                        </div>

                                                        <div className="article-share-btn-box">
                                                            <ul className="d-flex justify-content-center gap-3">
                                                                <li><Link href={`http://twitter.com/share?url=https://cloudlee.vercel.app/blog/${blog.id}`}><Image src="/images/x2.png" width={60} height={60} alt="" /></Link></li>
                                                                <li><Link href={`http://www.facebook.com/share.php?u=https://cloudlee.vercel.app/blog/${blog.id}`}><Image src="/images/fb.png" width={60} height={60} alt="" /></Link></li>
                                                                <li><Link href={`https://social-plugins.line.me/lineit/share?url=https://cloudlee.vercel.app/blog/${blog.id}`}><Image src="/images/line.png" width={60} height={60} alt="" /></Link></li>
                                                            </ul>
                                                        </div>

                                                        <div className='article-content' dangerouslySetInnerHTML={{
                                                            __html: `${blog.body}`
                                                        }}></div>

                                                    </div>

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
                                                                            <div className='article-sns-box'>
                                                                                <ul className='d-flex'>
                                                                                    <li><Link href=""><i className="bi bi-twitter-x"></i></Link></li>
                                                                                    <li><Link href=""><i className="bi bi-threads"></i></Link></li>
                                                                                </ul>
                                                                            </div>
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
                            <Link href="/blog/page/1" className="bg-dark text-light">他の記事も読む</Link>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div >
    )
}

export const getStaticPaths = async () => {
    const data = await client.get({ endpoint: "blog" });

    const paths = data.contents.map((content) => `/blog/${content.id}`);
    return { paths, fallback: false };
};

// データをテンプレートに受け渡す部分の処理を記述します
export const getStaticProps = async (context) => {
    const id = context.params.id;
    const data = await client.get({ endpoint: "blog", contentId: id });

    return {
        props: {
            blog: data,
        },
    };
}

export default BlogId