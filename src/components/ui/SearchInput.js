import React, { useState } from 'react';

import { Button } from "react-bootstrap";
import Autosuggest from 'react-autosuggest';
import "./Autosuggest.css";

const SearchInput = ({ query, setQuery, suggestions, submitSearch }) => {
    const [ filteredSuggestions, setFilteredSuggestions ] = useState(suggestions);

    const getSuggestions = value => {
        const inputValue = value.trim().toLowerCase();
        const inputLength = inputValue.length;

        return inputLength === 0 ? suggestions : suggestions.filter(s =>
            s.toLowerCase().slice(0, inputLength) === inputValue
        );
    };

    const getSuggestionValue = suggestion => suggestion;

    const renderSuggestion = suggestion => <div>{suggestion}</div>

    const onSuggestionsFetchRequested = ({ value }) => setFilteredSuggestions(getSuggestions(value));

    const onSuggestionsClearRequested = () => setFilteredSuggestions([]);

    const shouldRenderSuggestions = () => true;

    const handleKeyUp = e => {
        if (e.charCode === 13) submitSearch();
    }

    const inputProps = {
        placeholder: "Type something...",
        value: query,
        className: "form-control",
        onChange: (e, {newValue }) => setQuery(newValue),
        onKeyPress: handleKeyUp
    };


    return (
        <>              
            <Autosuggest
                suggestions={filteredSuggestions}
                onSuggestionsFetchRequested={onSuggestionsFetchRequested}
                onSuggestionsClearRequested={onSuggestionsClearRequested}
                getSuggestionValue={getSuggestionValue}
                renderSuggestion={renderSuggestion}
                shouldRenderSuggestions={shouldRenderSuggestions}
                inputProps={inputProps}
            />
            <div className="text-center mt-3">
                <Button onClick={submitSearch}>Search</Button>
            </div>
        </>
    );
};

export default SearchInput;