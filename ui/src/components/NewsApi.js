import React, { useCallback, useEffect, useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { faCircleArrowUp } from "@fortawesome/free-solid-svg-icons";
import * as API from "../api";

const NewsApi = () => {
    const [newsData, setNewsData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const loadMoreRef = useRef();

    const handleLoadMore = useCallback((e) => {
        setCurrentPage((current) => current + 1);
    }, [])

    useEffect(() => {
        if (currentPage > 4) {
            setHasMore(false);
            return
        }
        (async () => {
            setIsLoading(true);
            const data = await API.newsApi(currentPage);
            if (!data.articles || data.articles.length === 0) {
                setHasMore(false);
                return;
            }
            const cleanData = [...data.articles].filter((data) => data.title !== "[Removed]").map((article) => {
                article.size = chooseCardSize();
                return article
            });
            setNewsData((currentData) => [...currentData, ...cleanData]);
            setIsLoading(false);
        })()
    }, [currentPage]);

    useEffect(() => {
        if (!loadMoreRef || !loadMoreRef.current) {
            return;
        }

        const scrollCallback = (event) => {
            if (!loadMoreRef.current) {
                return;
            }
            const elRect = loadMoreRef.current.getBoundingClientRect();
            const loadMorePosition = elRect.top + document.documentElement.scrollTop;
            if (document.body.scrollHeight - window.scrollY <= window.innerHeight && !isLoading) {
                handleLoadMore();
            }
        }

        document.addEventListener("scroll", scrollCallback);

        return () => {
            document.removeEventListener("scroll", scrollCallback)
        }
    }, [handleLoadMore, isLoading, loadMoreRef.current])

    const chooseCardSize = () => {
        const sizes = ["medium", "large"];
        return sizes[Math.floor(Math.random() * 2)]
    };

    return (
        <div className="news">

            {newsData ?
                <>
                    <div className="news-header" id="news">
                        <h1 style={{ fontWeight: "bold" }}>What's new?</h1>
                    </div>
                    
                    <div className="pin_container">
                        {newsData.map((article) => <div className={`card card_${article.size}`}>
                            <a href={article.url} target="_blank" style={{ color: "rgb(45, 45, 45)" }}>
                                <img className="article-image" src={article.urlToImage} />
                                <div className="article-info">
                                    <p style={{ textTransform: "uppercase", fontSize: "small", color: "#E7A923" }}>{article.source.name}</p>
                                    <h5>{article.title}</h5>
                                    <p style={{ fontSize: "small", color: "#E7A923" }}>{article.author ? article.author.split(",")[0] : ''}</p>
                                    <p style={{ fontSize: "small" }}>{article.publishedAt}</p>
                                </div>
                            </a>
                        </div>)}
                    </div>

                    {hasMore ? 
                        <div className="load-more" ref={loadMoreRef}>
                            <a onClick={handleLoadMore}>Load more...</a>
                            {isLoading ? 
                                <FontAwesomeIcon icon={faSpinner} spin size="5x" />
                            : null}
                        </div> 
                    : null}
                    <div className="back-to-top" style={{textAlign: "right", marginRight: "80px"}}>
                        <a href="#news">
                            <FontAwesomeIcon color="#1b4965" icon={faCircleArrowUp} size="2x" />
                        </a>
                    </div>
                </>
                : null
            }

        </div>
    )
};

export default NewsApi;