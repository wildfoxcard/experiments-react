import React, {useState} from 'react'

import './Tag.css'

function Tag({text, onActivate, onDeactivate, isActive}) {

    return (
        <div 
            onClick={isActive ? onDeactivate : onActivate}
            className={`${isActive ? "tag active" : "tag"}`}    
        >
            {text}
            {isActive && (
                <div className={`close-tag`}>
                    X
                </div>
            )}
        </div>
    )
}

export default Tag
