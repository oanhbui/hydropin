import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

const RatingBar = ({value, editable=false, max=5, size='sm', handleChange=null}) => {
    const handleStarClick = (value) => {
        if (editable && typeof handleChange === 'function') {
            handleChange(value);
        }
    };

    return (
        <div  title={`${value} / ${max}`} >
            {new Array(max).fill(null).map((_, index) => {
                if (index + 1 <= value) {
                    return <FontAwesomeIcon key={`rate-${index}`} icon={faStar} size={size} style={{color: "#ffc107"}} onClick={() => handleStarClick(index + 1)} />
                } else {
                    return <FontAwesomeIcon key={`rate-${index}`} icon={faStar} size={size}  onClick={() => handleStarClick(index + 1)} />
                }
            })}
        </div>
    )
};

export default RatingBar;