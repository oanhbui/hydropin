import React, {useEffect, useState} from "react";
import * as API from "../api";

const NewsApi = () => {
    const [newsData, setNewsData] = useState(null);

    useEffect(() => {
        (async () => {
            const data = await API.newsApi();
            const cleanData = [...data.articles].filter((data) => data.title !== "[Removed]");
            setNewsData(cleanData);
        })()
    },[]);

    const chooseCardSize = () => {
        const sizes = ["medium", "large"];
        return sizes[Math.floor(Math.random()*2)]
    };

    return (
        <>
        <h3 id="news">Hydrogen news</h3>
        {newsData ? 
            <div className="pin_container">
                {newsData.map((article) => <div className={`card card_${chooseCardSize()}`}>
                    <a href={article.url} target="_blank">                    
                        <img className="article-image" src={article.urlToImage} />
                        <div className="article-info">
                            <p style={{textTransform: "uppercase", fontSize: "small"}}>{article.source.name}</p>
                            <h5>{article.title}</h5>
                            <p style={{fontSize: "small", color: "#E8AC2A", fontWeight: "bold"}}>{article.author}</p>
                            <p style={{fontSize: "small"}}>{article.publishedAt}</p>
                        </div>
                    </a>
                </div>)}
            
            </div>
        : null
        }
         </>
    )
};

export default NewsApi;