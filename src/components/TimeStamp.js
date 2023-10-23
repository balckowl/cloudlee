import React from 'react'
import dayjs from 'dayjs'

const TimeStamp = ({ timeStamp, retimeStamp }) => {
    const publishedAt = dayjs(timeStamp).format('YYYY.MM.DD');
    const rePublishedAt = dayjs(retimeStamp).format('YYYY.MM.DD');

    return (
        <div className="blog-posttime-box">
            <ul className="d-flex gap-2">
                <li>
                    <time datetime={dayjs(timeStamp).format('YYYY-MM-DD')}>
                        <i className="bi bi-clock"></i>
                        <span>{publishedAt}</span>
                    </time>
                </li>
                <li>
                    <time datetime={dayjs(retimeStamp).format('YYYY-MM-DD')}>
                        <i className="bi bi-arrow-clockwise"></i>
                        <span>{rePublishedAt}</span>
                    </time>
                </li>
            </ul>
        </div>
    )
}

export default TimeStamp