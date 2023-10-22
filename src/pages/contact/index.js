import React, { useState } from 'react'
import { init, send } from '@emailjs/browser'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import CommonMeta from '@/components/CommonMeta'
import Image from 'next/image'

const Contact = () => {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [content, setContent] = useState('')

    const [isActive, setIsActive] = useState(false);

    const onSubmit = async (e) => {
        // フォームのデフォルトの動作をキャンセル
        e.preventDefault()

        // 必要なIDをそれぞれ環境変数から取得
        const userID = process.env.NEXT_PUBLIC_EMAILJS_USER_ID
        const serviceID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID
        const templateID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID

        if (userID && serviceID && templateID && email.match(/.+@.+\..+/)) {
            // emailJS初期化
            init(userID)

            // emailJS送信データを定義
            const params = {
                from_name: name,
                email: email,
                phone: phone,
                content: content,
            }

            // emailJS送信
            try {
                await send(serviceID, templateID, params)
                alert('送信成功')
            } catch (error) {
                // 送信失敗したらalertで表示
                alert(error)
            }
        } else {
            alert('もう一度内容をご確認ください')
        }
    }

    return (
        <div className={`contact-page ${isActive ? 'is-active' : ''}`}>
            <CommonMeta
                title='お問い合わせ | cloudee'
                type='article'
                imgUrl='/images/contact.png'
                description='@y_taのブログ「cloudee」のお問い合わせページです。'
            />
            <Header isActive={isActive} setIsActive={setIsActive} />

            <main>
                <section>
                    <div className='container'>
                        <div className='d-flex align-items-center justify-content-center page-title'>
                            <div className='page-title-icon-box'>
                                <Image src="/images/posto.png" width={60} height={60} alt="" />
                            </div>
                            <h2>おといあわせ</h2>
                        </div>

                        <div className='row d-flex justify-content-center g-0'>
                            <div className='col-lg-7'>
                                <div className='bg-white contact-outer'>
                                    <div className='container'>
                                        <div className='contact'>
                                            <div className='row d-flex justify-content-center g-0'>
                                                <div className='col-11'>
                                                    <form onSubmit={(e) => onSubmit(e)}>
                                                        <div className='name-form-box'>
                                                            <label className='required'>お名前</label>
                                                            <input
                                                                type="text"
                                                                placeholder='まつかわゆうた'
                                                                value={name}
                                                                onChange={(e) => setName(e.target.value)}
                                                                required
                                                            />
                                                        </div>
                                                        <div className='email-form-box'>
                                                            <label className='required'>メールアドレス</label>
                                                            <input
                                                                type="text"
                                                                placeholder='XXXX@gmail.com'
                                                                value={email}
                                                                onChange={(e) => setEmail(e.target.value)}
                                                                required
                                                            />
                                                        </div>
                                                        <div className='phone-form-box'>
                                                            <label>電話番号</label>
                                                            <input
                                                                type="text"
                                                                placeholder='XXX-XXXX-XXXX'
                                                                value={phone}
                                                                onChange={(e) => setPhone(e.target.value)}
                                                            />
                                                        </div>
                                                        <div className='context-form-box'>
                                                            <label className='required'>お問い合わせ内容</label>
                                                            <textarea
                                                                type="text"
                                                                value={content}
                                                                onChange={(e) => setContent(e.target.value)}
                                                                required
                                                            ></textarea>
                                                        </div>
                                                        <div>
                                                            <button>送信</button>
                                                        </div>
                                                    </form>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

            </main>

            <Footer />
        </div>
    )
}

export default Contact