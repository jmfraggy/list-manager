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
        ],
        current: null
    };

    const [state, dispatch] = useReducer(listReducer, initialState);

    // Add List
    const addList = list => {
        list.id = uuidv4(); // Generate random ID
        dispatch({ type: ADD_LIST, payload: list});
    }

    // Delete List
    const deleteList = id => {
        dispatch({ type: DELETE_LIST, payload: id});
    }

    // Delete Child List
    // Set Current List
    const setCurrent = list => {
        dispatch({ type: SET_CURRENT, payload: list});
    }

    // Clear Current List
    const clearCurrent = () => {
        dispatch({ type: CLEAR_CURRENT });
    }

    // Update List
    const updateList = list => {
        dispatch({ type: UPDATE_LIST, payload: list});
    }

    // Filter Lists
    // Clear Filter

    return (
        <ListContext.Provider
            value = {{
                lists: state.lists,
                current: state.current,
                addList,
                deleteList,
                setCurrent,
                clearCurrent,
                updateList
            }}
        >
            {props.children}
        </ListContext.Provider>
    );
};

export default ListState;