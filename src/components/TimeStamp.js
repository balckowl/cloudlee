import React, { useState } from 'react'
import dayjs from 'dayjs'

const TimeStamp = ({ timeStamp, retimeStamp }) => {
    const [publishedAt, setPublishedAt] = useState(dayjs(timeStamp));
    const [republishedAt, setRepublishedAt] = useState(dayjs(retimeStamp));

    return (
        <div className="blog-posttime-box">
            <ul className="d-flex gap-2">
                <li>
                    <time dateTime={dayjs(timeStamp).format('YYYY-MM-DD')}>
                        <i className="bi bi-clock"></i>
                        <span>{publishedAt.format('YYYY.MM.DD')}</span>
                    </time>
                </li>
                <li>
                    <time dateTime={dayjs(retimeStamp).format('YYYY-MM-DD')}>
                        <i className="bi bi-arrow-clockwise"></i>
                        <span>{republishedAt.format('YYYY.MM.DD')}</span>
                    </time>
                </li>
            </ul>
        </div>
    )
}

export default TimeStamp