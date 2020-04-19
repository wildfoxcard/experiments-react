import React, { useContext } from "react"
import Tag from "./Tag"
import SearchWrapper from "./SearchWrapper"
import { navigate } from "gatsby"

function SmallSearchDisplay({ tags }) {
  return (
    <div>
      <SearchWrapper />
      {tags && (
        <div>
          {tags.map(tag => (
            <Tag
              key={tag}
              text={tag}
              shouldLookActive={true}
              onActivate={() => {
                navigate(`/?tag=${tag}`)
              }}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default SmallSearchDisplay
