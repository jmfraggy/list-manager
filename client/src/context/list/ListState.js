import React, { useReducer } from 'react';

import { v4 as uuidv4 } from 'uuid';
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
            },
            {
                id: 5,
                name: 'Numbers',
                subList: [
                  1,
                  2,
                  3,
                  4,
                  5,
                  6,
                  'perro'
                ]
            },
        ]
    };

    const [state, dispatch] = useReducer(listReducer, initialState);

    // Add List
    const addList = list => {
        list.id = uuidv4(); // Generate random ID
        dispatch({ type: ADD_LIST, payload: list});
    }
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
                lists: state.lists,
                addList
            }}
        >
            {props.children}
        </ListContext.Provider>
    );
};

export default ListState;