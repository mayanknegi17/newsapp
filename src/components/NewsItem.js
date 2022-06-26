import React from 'react'

const NewsItem = (props) => {
    let {title, description, imgUrl, newsUrl, author, date, source} = props
    return (
        <div className='my-3'>
            <div className="card" style={{width: "100%"}}>
                <img src={imgUrl} className="card-img-top" alt="..." />
                <div className="card-body">
                    <h5 className="card-title">{title}</h5>
                    <span className="position-absolute top-0 badge rounded-pill bg-danger" style={{right: "0",zIndex: "1",}}>{source}</span>
                    <p className="card-text">{description}</p>
                    <p className="card-text"><small className="text-muted">By {!author? "Unknown": author} on {new Date(date).toGMTString()}</small></p>
                    <a href={newsUrl} className="btn btn-sm btn-primary" target="_blank">Read More</a>
                </div>
            </div>
        </div>
    )
}

export default NewsItem
