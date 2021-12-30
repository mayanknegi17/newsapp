import React, {useEffect, useState  } from 'react'
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";

import Spinner from './Spinner';
import NewsItem from './NewsItem'


const News = (props) => {
    const [articles, setArticles] = useState([])
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(1)
    const [totalResults, setTotalResults] = useState(0)

    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    const updateNews = async () => {
        props.setProgress(10);
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
        // setLoading(true);
        let data = await fetch(url);
        let parsedData = await data.json();
        setArticles(parsedData.articles);
        setTotalResults(parsedData.totalResults);
        setLoading(false);
        props.setProgress(100);
    }

    useEffect(() => {
        document.title = `NewsMonkey -  ${capitalizeFirstLetter(props.category)}`
        updateNews();
        // eslint-disable-next-line
    }, [])

    // const handlePrevClick = async () => {
    //     setPage(page - 1);
    //     updateNews();
    // }
    // const handleNextClick = async () =>{
    //     setPage(page + 1);
    //     updateNews();
    // }

    const fetchMoreData = async () => {
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page+1}&pageSize=${props.pageSize}`;
        setPage(page + 1);
        setLoading(true);
        let data = await fetch(url);
        let parsedData = await data.json();
        setArticles(articles.concat(parsedData.articles));
        setTotalResults(parsedData.totalResults);
        setLoading(false);
    };
 
    return (
        <div className="container my-3">
            <h1 className="text-center" style={{marginTop: 90,}}>NewsMonkey - Top {capitalizeFirstLetter(props.category)} Headlines</h1>
            {loading && <Spinner />}
            <InfiniteScroll
                dataLength={articles.length}
                next={fetchMoreData}
                hasMore={articles.length !== totalResults}
                loader={<Spinner />}
                >
                <div className="row">
                    {articles.map((element) => {
                        return <div className="col-md-3" key={element.url}>
                        <NewsItem
                            title={element.title ? element.title.slice(0, 45) : ""}
                            description={element.description ? element.description.slice(0, 88) : ""}
                            imgUrl={element.urlToImage}
                            newsUrl={element.url}
                            author={element.author}
                            date={element.publishedAt}
                            source={element.source.name}
                        />
                    </div>
                    })}
                </div>
            </InfiniteScroll>
            {/* <div className="row">
                <div className="container d-flex justify-content-between">
                    <button disabled={page<=1} type="button" className="btn btn-dark btn-sm" onClick={handlePrevClick}>&larr; Priview</button>
                    <button disabled={page + 1 > Math.ceil(totalResults/props.pageSize)} type="button" className="btn btn-dark btn-sm" onClick={handleNextClick}>Next &rarr;</button>
                </div>
            </div> */}
        </div>
    )
}

News.defaulProps = {
    country: "in",
    pageSize: 8,
    category: "general",
}
    
News.propsTypes = {
    country: PropTypes.string, 
    pageSize: PropTypes.number,
    category: PropTypes.string,
}

export default News
