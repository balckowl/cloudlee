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
                        {/* <ul className="d-flex header-nav">
                            <li><Link href="">おうち</Link></li>
                            <li><Link href="">どんなサイト</Link></li>
                            <li><Link href="/blog/page">まいにち通信</Link></li>
                            <li><Link href="/contact">とい合わせ</Link></li>
                        </ul> */}
                        <div className={`burger ${isActive ? 'is-active' : ''}`} onClick={() => setIsActive(!isActive)}></div>
                        <div className={`menu ${isActive ? 'is-active' : ''}`}>
                            <ul>
                                <li><Link href="/"><Image src="/images/home.png" width={50} height={50} alt=""/>おうち</Link></li>
                                <li><Link href="/blog/page/1"><Image src="/images/kamihikouki.png" width={50} height={50} alt=""/>まいにち通信</Link></li>
                                <li><Link href="/work/page/1"><Image src="/images/keybord.png" width={50} height={50} alt=""/>作ったもの</Link></li>
                                <li><Link href="/contact"><Image src="/images/posto.png" width={50} height={50} alt=""/>とい合わせ</Link></li>
                            </ul>
                        </div>
                    </nav>
                </div>
            </div>
            {/* <svg width="100%" height="100%" id="svg" viewBox="0 0 1440 210" xmlns="http://www.w3.org/2000/svg"
                class="transition duration-300 ease-in-out delay-150">
                <path
                    d="M 0,400 C 0,400 0,200 0,200 C 109.71428571428572,201.75 219.42857142857144,203.5 346,212 C 472.57142857142856,220.5 616.0000000000001,235.75000000000003 734,232 C 851.9999999999999,228.24999999999997 944.5714285714284,205.5 1058,197 C 1171.4285714285716,188.5 1305.7142857142858,194.25 1440,200 C 1440,200 1440,400 1440,400 Z"
                    stroke="none" stroke-width="0" fill="#ffffff" fill-opacity="1"
                    class="transition-all duration-300 ease-in-out delay-150 path-0" transform="rotate(-180 720 200)">
                </path>
            </svg> */}
        </header>
    )
}

export default Header