import React, { useContext } from "react"

import SearchWrapper from "./SearchWrapper"
import Tag from "./Tag"
import { BlogContext } from "../../pages/index"

import "./BigSearchDisplay.css"

function DisplayBig() {
  const { posts, tags, activeTag, setActiveTag } = useContext(BlogContext)

  return (
    <div className={`big-display-container`}>
      <SearchWrapper />
      <div>
        {tags &&
          tags.map((tag, i) => (
            <Tag
              key={i}
              isActive={activeTag === tag}
              text={tag}
              onActivate={() => setActiveTag(tag)}
              onDeactivate={() => setActiveTag(undefined)}
            />
          ))}
      </div>

      <div>
        <small>
          <em>Search Powered by - 
            Wild Fox Card

          </em>
        </small>
      </div>
    </div>
  )
}

export default DisplayBig
