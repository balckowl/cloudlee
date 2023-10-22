import Link from 'next/link'
import React from 'react'

const Pagination = ({ totalCount }) => {

    const PER_PAGE = 6

    const range = (start, end) => 
        [...Array(end - start + 1)].map((_, i) => start + i)

    return (
        <div className='pagination-box'>
            <div className='row d-flex justify-content-center'>
                <div className='col-xl-9'>
                    <div className='container'>
                        <ul className='d-flex justify-content-center'>
                            {range(1, Math.ceil(totalCount / PER_PAGE)).map((number, index) => (
                                <li key={index}>
                                    <Link href={`/blog/page/${number}`}>{number}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Pagination