import React, { Component } from 'react'
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";

import Spinner from './Spinner';
import NewsItem from './NewsItem'


export class News extends Component {
    static defaulProps = {
        country: "in",
        pageSize: 8,
        category: "general",
    }
        
    static propsTypes = {
        country: PropTypes.string, 
        pageSize: PropTypes.number,
        category: PropTypes.string,
    }

    capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    constructor (props) {
        super(props);
        this.state = {
            articles: [],
            loading: true,
            page: 1,
            totalResults: 0
        }
        document.title = `NewsMonkey - ${this.capitalizeFirstLetter(this.props.category)}`;
    }

    async updateNews () {
        this.props.setProgress(10);
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        // this.setState({loading: true});
        let data = await fetch(url);
        let parsedData = await data.json()
        this.setState ({articles: parsedData.articles,
            totalResults: parsedData.totalResults,
            loading: false,
        })
        this.props.setProgress(100);
    }

    async componentDidMount () {
        // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=a3e92f0af9894fcaa10ad5e7b5c28f4e&page=1&pageSize=${this.props.pageSize}`;
        // this.setState({loading: true});
        // let data = await fetch(url);
        // let parsedData = await data.json()
        // this.setState ({articles: parsedData.articles,
        //     totalResults: parsedData.totalResults,
        //     loading: false,
        // })

        this.updateNews();

        // console.log(parsedData);
    }

    handlePrevClick = async () => {
        // console.log("Prev");
        // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=a3e92f0af9894fcaa10ad5e7b5c28f4e&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
        // this.setState({loading: true});
        // let data = await fetch(url);
        // let parsedData = await data.json()

        // this.setState({
        //     page: this.state.page - 1,
        //     articles: parsedData.articles,
        //     loading: false
        // })
        this.setState({page: this.state.page - 1});
        this.updateNews();
    }
    handleNextClick = async () =>{
        // console.log("Next");
        // if (!(this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize))) {
        //     let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=a3e92f0af9894fcaa10ad5e7b5c28f4e&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
        //     this.setState({loading: true});
        //     let data = await fetch(url);
        //     let parsedData = await data.json()

        //     this.setState({
        //         page: this.state.page + 1,
        //         articles: parsedData.articles,
        //         loading: false,
        //     })
        // }

        this.setState({page: this.state.page + 1});
        this.updateNews();
    }

    fetchMoreData = async () => {
        setTimeout(() => {
            this.setState({
                page: this.state.page + 1 
            });
        }, 1500);
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        this.setState({loading: true});
        let data = await fetch(url);
        let parsedData = await data.json()
        this.setState ({
            articles: this.state.articles.concat(parsedData.articles),
            totalResults: parsedData.totalResults,
            loading: false,
        })
    };

    render() {
        return (
            <div className="container my-3">
                <h1 className="text-center my-5">NewsMonkey - Top {this.capitalizeFirstLetter(this.props.category)} Headlines</h1>
                {this.state.loading && <Spinner />}
                <InfiniteScroll
                    dataLength={this.state.articles.length}
                    next={this.fetchMoreData}
                    hasMore={this.state.articles.length !== this.state.totalResults}
                    loader={<Spinner />}
                    >
                    <div className="row">
                        {this.state.articles.map((element) => {
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
                        <button disabled={this.state.page<=1} type="button" className="btn btn-dark btn-sm" onClick={this.handlePrevClick}>&larr; Priview</button>
                        <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" className="btn btn-dark btn-sm" onClick={this.handleNextClick}>Next &rarr;</button>
                    </div>
                </div> */}
            </div>
        )
    }
}

export default News
