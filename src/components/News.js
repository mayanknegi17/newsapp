import React, { Component } from 'react'
import NewsItem from './NewsItem'

export class News extends Component {
    constructor () {
        super();
        this.state = {
            articles: [],
            loading: false,
            page: 1
        }
    }

    async componentDidMount () {
        let url = "https://newsapi.org/v2/top-headlines?country=in&apiKey=a3e92f0af9894fcaa10ad5e7b5c28f4e&page=1&pageSize=12";
        let data = await fetch(url);
        let parsedData = await data.json()
        this.setState ({articles: parsedData.articles, totalResults: parsedData.totalResults})

        // console.log(parsedData);
    }

    handlePrevClick = async () => {
        console.log("Prev");
        let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=a3e92f0af9894fcaa10ad5e7b5c28f4e&page=${this.state.page - 1}&pageSize=12`;
        let data = await fetch(url);
        let parsedData = await data.json()

        this.setState({
            page: this.state.page - 1,
            articles: parsedData.articles
        })
    }
    handleNextClick = async () =>{
        console.log("Next");
        if (this.state.page + 1 > Math.ceil(this.state.totalResults/20)) {

        }
        else {
            let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=a3e92f0af9894fcaa10ad5e7b5c28f4e&page=${this.state.page + 1}&pageSize=12`;
            let data = await fetch(url);
            let parsedData = await data.json()

            this.setState({
                page: this.state.page + 1,
                articles: parsedData.articles
            })
        }
    }
    render() {
        return (
            <div className="container my-3">
                <h2>NewsMonkey Top Headlines</h2>
                <div className="row">
                    {this.state.articles.map((element) => {
                        return <div className="col-md-3" key={element.url}>
                        <NewsItem
                        title={element.title ? element.title.slice(0, 45) : ""}
                        description={element.description ? element.description.slice(0, 88) : ""}
                        imgUrl={element.urlToImage}
                        newsUrl={element.url}
                        />
                    </div>
                    })}
                </div>
                <div className="row">
                    <div className="container d-flex justify-content-between">
                        <button disabled={this.state.page<=1} type="button" className="btn btn-dark btn-sm" onClick={this.handlePrevClick}>&larr; Priview</button>
                        <button type="button" className="btn btn-dark btn-sm" onClick={this.handleNextClick}>Next &rarr;</button>
                    </div>
                    </div>
            </div>
        )
    }
}

export default News
