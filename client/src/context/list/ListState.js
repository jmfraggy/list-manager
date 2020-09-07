import React, { useReducer } from 'react';

import uuid from 'uuid';
import ListContext from './listContext';
import listReducer from './listReducer';
import {
    ADD_LIST,
    DELETE_LIST,
    DELETE_SUBLIST,
    SET_CURRENT,
    CLEAR_CURRENT,
    UPDATE_LIST,
    FILTER_LISTS,
    CLEAR_FILTER
} from '../types';

const ListState = props => {
    const initialState = {
        lists: [
            {
                id: 1,
                name: 'Numbers',
                subList: [
                    1,
                    2,
                    3
                ]
            },
            {
                id: 2,
                name: 'Colors',
                subList: [
                    'green',
                    'black',
                    'red'
                ]
            },
            {
                id: 3,
                name: 'Numbers',
                subList: [
                    1,
                    2,
                    3,
                    1,
                    2,
                    3,
                    1,
                    2,
                    3
                ]
            },
            {
                id: 4,
                name: 'Colors',
                subList: [
                    'green',
                    'black',
                    'red'
                ]
            }
        ]
    };

    const [state, dispatch] = useReducer(listReducer, initialState);

    // Add List
    // Delete List
    // Delete Child List
    // Set Current List
    // Clear Current List
    // Update List
    // Filter Lists
    // Clear Filter

    return (
        <ListContext.Provider
            value = {{
                lists: state.lists
            }}
        >
            {props.children}
        </ListContext.Provider>
    );
};

export default ListState;