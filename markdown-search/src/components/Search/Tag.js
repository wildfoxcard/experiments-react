import React, {useState} from 'react'

import './Tag.css'

function Tag({text, onActivate, onDeactivate, isActive, shouldLookActive}) {

    return (
        <div 
            onClick={isActive ? onDeactivate : onActivate}
            className={`${isActive || shouldLookActive ? "tag active" : "tag"}`}    
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
