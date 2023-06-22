import React from 'react';

import { Input } from './search-box.styles';

export const SearchBox = ({ placeholder, handleChange }) => (
    <div>
        <Input 
            type="search" 
            className="search" 
            placeholder={placeholder} 
            onChange={handleChange} />
    </div>
);
export const Input = styled.input`
    -webkit-appearance: none;
    border: none;
    outline: none;
    padding: 10px;
    width: 350px;
    line-height: 20px;
    margin-bottom: 30px;
    border-radius: 16px;
    -webkit-border-radius: 16px;
    -moz-border-radius: 16px;
    text-align: center;
    font-size: 20px;
`;