import React, { useState, useReducer } from "react"
import { Index } from "elasticlunr"
import Autosuggest from "react-autosuggest"
import { navigate } from "gatsby"
import "./Search.css"

//The search engine
const search = ({ index, value }) => {
  return (
    index
      .search(value, { expand: true })
      // Map over each ID and return the full document
      .map(({ ref }) => index.documentStore.getDoc(ref))
  )
}

//The Component - capitalize S
function Search({ searchIndex }) {
  const [value, setValue] = useState("")
  const [index] = useState(Index.load(searchIndex))

  const keywordsReducer = (state, action) => {
    return search({ index, value })
  }
  const [suggestions, dispatchSuggestions] = useReducer(keywordsReducer, [])

  const onChange = (event, { newValue, method }) => {
    switch (method) {
      case "down":
        break
      case "up":
        break
      case "escape":
        break
      case "enter":
        break
      case "click":
        break
      case "type":
        setValue(newValue)
        break
    }
    // console.log("method", "newValue")
  }

  const getSuggestionValue = suggestion => suggestion.name

  const onSuggestionSelected = (
    event,
    { suggestion, suggestionValue, suggestionIndex, sectionIndex, method }
  ) => {
    navigate(suggestion.slug)

    // console.log({ suggestion, suggestionValue, suggestionIndex, sectionIndex, method })
  }

  const renderSuggestion = suggestion => {
    return (
      <div>
        {suggestion.title}
        {suggestion.tags && (
          <div>
            {suggestion.tags.map((tag, i) => (
              <div className={`small-tag`}>{tag}</div>
            ))}
          </div>
        )}
      </div>
    )
  }

  const onSuggestionsFetchRequested = ({ value }) => dispatchSuggestions()

  // Autosuggest will call this function every time you need to clear suggestions.
  const onSuggestionsClearRequested = () => {
    dispatchSuggestions([])
  }

  // Autosuggest will pass through all these props to the input.
  const onKeyDown = e => {
    if (e.keyCode === 13) {
      // Enter
      // Stop it here
      e.preventDefault()
      e.stopPropagation()
      // Do something else...
    }
  }

  const inputProps = {
    onKeyDown,
    placeholder: "search",
    value,
    name: "searchValue",
    textBoxValue: value,
    onChange: onChange,
  }

  // Finally, render it!
  return (
    <Autosuggest
      suggestions={suggestions}
      onSuggestionsFetchRequested={onSuggestionsFetchRequested}
      onSuggestionsClearRequested={onSuggestionsClearRequested}
      onSuggestionSelected={onSuggestionSelected}
      getSuggestionValue={getSuggestionValue}
      renderSuggestion={renderSuggestion}
      inputProps={inputProps}
    />
  )
}

export default Search
