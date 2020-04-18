import React, { useState, useReducer } from "react"
import { Index } from "elasticlunr"
import Autosuggest from 'react-autosuggest';
import { Link } from "gatsby"
import "./Search.css"

const featuredKeywords = [
    {
        name: 'C',
        year: 1972
    },
    {
        name: 'Elm',
        year: 2012
    },
    {
        name: "JavaScript",
        year: "1990"
    }
]


function Search({ searchIndex }) {
    const [value, setValue] = useState("");
    //final
    const [index, setIndex] = useState(Index.load(searchIndex))

    const keywordsReducer = (state, action) => {
        console.log('state', state)
        const newItems = index
            .search(value, { expand: true })
            // Map over each ID and return the full document
            .map(({ ref }) => index.documentStore.getDoc(ref))

        console.log('newItem', newItems)

        switch (action) {
            case "featured":
                console.log('featured set')
                return featuredKeywords
            case "clear":
                return []
            case "results":
                return newItems
            default:
                return newItems ? newItems : []

        }
    }
    const [suggestions, dispatchSuggestions] = useReducer(keywordsReducer, featuredKeywords);


    const onChange = (event, { newValue }) => {
        setValue(newValue)

        console.log('newvalue', newValue, newValue.length)

        // if (newValue.length === 1) {
        //     dispatchSuggestions('clear')
        // }
        // this.setState({
        //     value: newValue
        // });
    };

    // Teach Autosuggest how to calculate suggestions for any given input value.
    const getSuggestions = value => {
        const inputValue = value.trim().toLowerCase();
        const inputLength = inputValue.length;

        return inputLength === 0 ? [] : suggestions.filter(word =>
            word.name.toLowerCase().slice(0, inputLength) === suggestions
        );
    };

    // When suggestion is clicked, Autosuggest needs to populate the input
    // based on the clicked suggestion. Teach Autosuggest how to calculate the
    // input value for every given suggestion.
    const getSuggestionValue = suggestion => suggestion.name;

    // Use your imagination to render suggestions.
    const renderSuggestion = suggestion => (
        <div>
            {suggestion.name}
        </div>
    );


    // Autosuggest will call this function every time you need to update suggestions.
    // You already implemented this logic above, so just use it.
    const onSuggestionsFetchRequested = ({ value }) => {
        console.log('value', value)
        dispatchSuggestions({ type: "results", value })
        // this.setState({
        //     suggestions: getSuggestions(value)
        // });
    };

    // Autosuggest will call this function every time you need to clear suggestions.
    const onSuggestionsClearRequested = () => {
        if (value.length > 0) {
            dispatchSuggestions({ type: "clear" })
        } else {
            dispatchSuggestions("featured", "")
        }
        // dispatchSuggestions({ type: "clear" })
        // this.setState({
        //     suggestions: []
        // });
    };

    // Autosuggest will pass through all these props to the input.
    const inputProps = {
        placeholder: 'Type a programming language',
        value,
        onChange: onChange
    };

    // Finally, render it!
    return (
        <Autosuggest
            suggestions={suggestions}
            onSuggestionsFetchRequested={onSuggestionsFetchRequested}
            onSuggestionsClearRequested={onSuggestionsClearRequested}
            getSuggestionValue={getSuggestionValue}
            renderSuggestion={renderSuggestion}
            inputProps={inputProps}
        />
    );

}

export default Search



//========================================================

// // Imagine you have a list of languages that you'd like to autosuggest.
// const languages = [
//     {
//         name: 'C',
//         year: 1972
//     },
//     {
//         name: 'Elm',
//         year: 2012
//     },
//     {
//         name: "JavaScript",
//         year: "1990"
//     }
// ]

// // Teach Autosuggest how to calculate suggestions for any given input value.
// const getSuggestions = value => {
//     const inputValue = value.trim().toLowerCase();
//     const inputLength = inputValue.length;

//     return inputLength === 0 ? [] : languages.filter(lang =>
//         lang.name.toLowerCase().slice(0, inputLength) === inputValue
//     );
// };

// // When suggestion is clicked, Autosuggest needs to populate the input
// // based on the clicked suggestion. Teach Autosuggest how to calculate the
// // input value for every given suggestion.
// const getSuggestionValue = suggestion => suggestion.name;

// // Use your imagination to render suggestions.
// const renderSuggestion = suggestion => (
//     <div>
//         {suggestion.name}
//     </div>
// );

// export default class Example extends React.Component {
//     constructor() {
//         super();

//         // Autosuggest is a controlled component.
//         // This means that you need to provide an input value
//         // and an onChange handler that updates this value (see below).
//         // Suggestions also need to be provided to the Autosuggest,
//         // and they are initially empty because the Autosuggest is closed.
//         this.state = {
//             value: '',
//             suggestions: []
//         };
//     }

//     onChange = (event, { newValue }) => {
//         this.setState({
//             value: newValue
//         });
//     };

//     // Autosuggest will call this function every time you need to update suggestions.
//     // You already implemented this logic above, so just use it.
//     onSuggestionsFetchRequested = ({ value }) => {
//         this.setState({
//             suggestions: getSuggestions(value)
//         });
//     };

//     // Autosuggest will call this function every time you need to clear suggestions.
//     onSuggestionsClearRequested = () => {
//         this.setState({
//             suggestions: []
//         });
//     };

//     render() {
//         const { value, suggestions } = this.state;

//         // Autosuggest will pass through all these props to the input.
//         const inputProps = {
//             placeholder: 'Type a programming language',
//             value,
//             onChange: this.onChange
//         };

//         // Finally, render it!
//         return (
//             <Autosuggest
//                 suggestions={suggestions}
//                 onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
//                 onSuggestionsClearRequested={this.onSuggestionsClearRequested}
//                 getSuggestionValue={getSuggestionValue}
//                 renderSuggestion={renderSuggestion}
//                 inputProps={inputProps}
//             />
//         );
//     }
// }

// // ======================================================================================


// import React, { useState, useReducer } from "react"
// import { Index } from "elasticlunr"
// import Autocomplete from "react-autocomplete";
// import { Link } from "gatsby"


// const itemsOnEmptyQuery = [
//     {
//         id: 1,
//         label: "React"
//     },
//     {
//         id: 2,
//         label: "JavaScript"
//     },
//     {
//         id: 3,
//         label: "Gatsby"
//     },
//     {
//         id: 4,
//         label: "Node"
//     },
//     {
//         id: 5,
//         label: "Azure"
//     },
//     {
//         id: 6,
//         label: "Aws"
//     }
// ]

// function Search({ searchIndex }) {
//     const [query, setQuery] = useState("")
//     const [items, setItems] = useState(itemsOnEmptyQuery)
//     //final
//     const [index, setIndex] = useState(Index.load(searchIndex))

//     const search = evt => {
//         const newQuery = evt.target.value
//         setQuery(newQuery)

//         const newItems = index
//             .search(query, { expand: true })
//             // Map over each ID and return the full document
//             .map(({ ref }) => index.documentStore.getDoc(ref))

//         console.log('newItems', newItems, newQuery)
//         setItems(prevItems => {

//             if (newQuery.length === 0) {
//                 return [...prevItems.splice(), items];
//             } else if (newQuery.length === 1) {
//                 return [...prevItems.splice(), newItems];
//             } else {
//                 return [...prevItems, newItems];
//             }

//             // console.log('prevItems', prevItems)

//             // return newQuery.length === 0
//             //     ? [...prevItems, newItems] : itemsOnEmptyQuery
//         });
//     }

//     return (
//         <div>
//             <Autocomplete
//                 getItemValue={(item) => item.label}
//                 items={items}
//                 renderItem={(item, isHighlighted) =>
//                     <div style={{ background: isHighlighted ? 'lightgray' : 'white' }} key={item.id}>
//                         {item.label ? item.label : item.title}
//                     </div>
//                 }
//                 value={query}
//                 onChange={search}
//                 onSelect={(val) => setQuery(val)}
//             />
//         </div>
//     )
// }

// export default Search


// // ======================================================================================


// import React, { useState, useReducer } from "react"
// import { Index } from "elasticlunr"
// import { Link } from "gatsby"

// import "./Search.css"


// const featuredKeywords = [
//     {
//         id: 1,
//         label: "React"
//     },
//     {
//         id: 2,
//         label: "JavaScript"
//     },
//     {
//         id: 3,
//         label: "Gatsby"
//     },
//     {
//         id: 4,
//         label: "Node"
//     },
//     {
//         id: 5,
//         label: "Azure"
//     },
//     {
//         id: 6,
//         label: "Aws"
//     }
// ]

// function Search({ searchIndex }) {
//     const [query, setQuery] = useState("")

//     const keywordsReducer = (query, action) => {
//         const newItems = index
//             .search(query, { expand: true })
//             // Map over each ID and return the full document
//             .map(({ ref }) => index.documentStore.getDoc(ref))

//         console.log('newItem', newItems)

//         switch (query.length) {
//             case 0:
//                 return featuredKeywords
//             default:
//                 return newItems
//         }
//     }
//     const [suggestions, dispatchSuggestions] = useReducer(keywordsReducer, featuredKeywords);

//     // const [items, setItems] = useState(itemsOnEmptyQuery)
//     //final
//     const [index, setIndex] = useState(Index.load(searchIndex))

//     const search = evt => {
//         const newQuery = evt.target.value
//         setQuery(newQuery)


//         dispatchSuggestions(newQuery)
//         // const newItems = index
//         //     .search(query, { expand: true })
//         //     // Map over each ID and return the full document
//         //     .map(({ ref }) => index.documentStore.getDoc(ref))

//         // setItems(prevItems => {

//         //     if (newQuery.length === 0) {
//         //         return [...prevItems.splice(), items];
//         //     } else if (newQuery.length === 1) {
//         //         return [...prevItems.splice(), newItems];
//         //     } else {
//         //         return [...prevItems, newItems];
//         //     }

//         //     // console.log('prevItems', prevItems)

//         //     // return newQuery.length === 0
//         //     //     ? [...prevItems, newItems] : itemsOnEmptyQuery
//         // });
//     }

//     return (
//         <div>

//             <input type="text" value={query} onChange={search} />
//             <ul>
//                 {suggestions.map(page => (
//                     <li key={page.id}>
//                         <Link to={`/${page.path}`}>{page.title}</Link>
//                         {/* {": " + page.tags.join(`,`)} */}
//                     </li>
//                 ))}
//             </ul>
//         </div>
//     )
// }

// export default Search