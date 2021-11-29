import React from 'react';
import './SearchInput.css';

import { InputGroup, FormControl, Button } from "react-bootstrap";

const SearchInput = ({setSearchValue, submitSearch}) => {
    
    const handleKeyUp = e => {
        if (e.charCode === 13) submitSearch();
    }
        
    return (
        <InputGroup>
            <FormControl
                placeholder="Type something..."
                onChange={e => setSearchValue(e.target.value)}
                onKeyPress={handleKeyUp}
            />
            <Button onClick={submitSearch}>Search</Button>
        </InputGroup>
    );
};

export default SearchInput;