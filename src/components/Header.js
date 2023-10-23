import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Header = ({ isActive, setIsActive }) => {

    return (
        <header>
            <div className='header-inner'>
                <div className="container d-flex align-items-center justify-content-between">
                    <div className='d-flex align-items-center header-title-box'>
                        <div className='header-icon-box'>
                            <Link href="/"><Image src="/images/cloud.png" fill size="100%" className="image" alt=""/></Link>
                        </div>
                        <h1><Link href="/">cloudlee</Link></h1>
                    </div>
                    <nav>
                        <div className={`burger ${isActive ? 'is-active' : ''}`} onClick={() => setIsActive(!isActive)}></div>
                        <div className={`menu ${isActive ? 'is-active' : ''}`}>
                            <ul>
                                <li><Link href="/"><Image src="/images/home.png" width={50} height={50} alt=""/>おうち</Link></li>
                                <li><Link href="/blog/page/1"><Image src="/images/kamihikouki.png" width={50} height={50} alt=""/>まいにち通信</Link></li>
                                <li><Link href="/work/page/1"><Image src="/images/whitecat2.png" width={50} height={50} alt=""/>作ったもの</Link></li>
                                <li><Link href="/contact"><Image src="/images/posto.png" width={50} height={50} alt=""/>お問い合わせ</Link></li>
                            </ul>
                        </div>
                    </nav>
                </div>
            </div>
        </header>
    )
}

export default Header