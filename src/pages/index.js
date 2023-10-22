import Image from 'next/image'
import { Inter } from 'next/font/google'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Link from 'next/link'
import TimeStamp from '@/components/TimeStamp'
import { client } from '@/libs/client'
import { useState } from 'react'
import CommonMeta from '@/components/CommonMeta'

const inter = Inter({ subsets: ['latin'] })

export default function Home({ blog, work }) {

  const [isActive, setIsActive] = useState(false);

  return (
    <div className={`top-page ${isActive ? 'is-active' : ''}`}>
      <CommonMeta
        title='cloudee'
        type='website'
        imgUrl='https://cloudlee.vercel.app/images/cloudlee.png'
        description='@y_taのブログ「cloudee」です。'
      />
      <Header isActive={isActive} setIsActive={setIsActive} />

      <main>
        <div className='hero'>
          <div className='container'>
            <div className='row d-flex justify-content-center'>
              <div className='col-10'>
                <div className='row d-flex align-items-center g-lg-5'>
                  <div className='col-lg-6'>
                    <div className='hero-img-box'>
                      <Image src='/images/whitecat6.png' fill sizes="100%" className="image" alt="" />
                      {/* <img src='images/whitecat6.png' alt='' /> */}
                    </div>
                  </div>
                  <div className='col-lg-6'>
                    <div className='hero-content-box'>
                      <h2>@y_ta</h2>
                      <div className='hero-text-box'>
                        <p>大学生webフロントエンドエンジニアとして活動しています。</p>
                        <p>ReactやVueといったモダンな技術を使ったフロント知識から、私の日常まで発信できるブログになればと思ってます。</p>
                      </div>
                    </div>

                    <div className='hero-sns-box'>
                      <ul className='d-flex gap-3'>
                        <li>
                          <Link target="_blank" href="https://twitter.com/blackcat_0506">
                            <div className='d-flex align-items-center'>
                              <div className='hero-sns-icon-box'>
                                <i className="bi bi-twitter-x"></i>
                              </div>
                              <div className='hero-sns-text-box'>
                                <p>Twitter</p>
                              </div>
                            </div>
                          </Link>
                        </li>
                        <li>
                          <Link target="_blank" href="">
                            <div className='d-flex align-items-center'>
                              <div className='hero-sns-icon-box'>
                                <i className="bi bi-threads"></i>
                              </div>
                              <div className='hero-sns-text-box'>
                                <p>Theads</p>
                              </div>
                            </div>
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

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
                            <Image src={blog.thumbnail.url} fill size="100%" className="image" alt="" />
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

            <div className="more-btn-box">
              <Link href="/blog/page/1" className="bg-dark text-light">more</Link>
            </div>
          </div>

        </section>

        <section className='work'>
          <div className='container'>

            <div className='d-flex align-items-center justify-content-center page-title'>
              <div className='page-title-icon-box'>
                <Image src="/images/whitecat2.png" width={60} height={60} alt="" />
              </div>
              <h2>作ったもの</h2>
            </div>

            <div className='blog-main row d-flex justify-content-center g-0'>
              <div className='col-lg-10 col-sm-12 col-11'>
                <div className='row g-4'>
                  {work.map((work) => (
                    <div className='col-lg-4 col-sm-6' key={work.id}>
                      <div className='bg-white blog-card'>
                        <Link href={`/work/${work.id}`}>
                          <div className="blog-img-box">
                            <Image src={work.thumbnail.url} fill size="100%" className="image" alt="" />
                          </div>
                          <div className='blog-text-box'>
                            <TimeStamp timeStamp={work.timestamp} retimeStamp={work?.retimestamp} />
                            <h3>{work.title}</h3>
                          </div>
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="more-btn-box">
              <Link href="/work/page/1" className="bg-dark text-light">more</Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}


// データをテンプレートに受け渡す部分の処理を記述します
export const getStaticProps = async () => {
  const data = await client.get({ endpoint: "blog", queries: { limit: 3 } });
  const data2 = await client.get({ endpoint: "work", queries: { limit: 3 } });

  return {
    props: {
      blog: data.contents,
      work: data2.contents,
    },
  };
};
