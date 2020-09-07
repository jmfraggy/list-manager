import React, { useReducer } from 'react';
import axios from 'axios';

import ListContext from './listContext';
import listReducer from './listReducer';
import {
    GET_LISTS,
    ADD_LIST,
    DELETE_LIST,
    DELETE_SUBLIST,
    SET_CURRENT,
    CLEAR_CURRENT,
    CLEAR_LISTS,
    UPDATE_LIST,
    LIST_ERROR
} from '../types';

const ListState = props => {
    const initialState = {
        lists: null,
        current: null,
        error: null
    };

    const [state, dispatch] = useReducer(listReducer, initialState);

    // Get Lists
    const getLists = async () => {
        try {
            const res = await axios.get('/api/lists');
            dispatch({
                type: GET_LISTS,
                payload: res.data
            });
        } catch (error) {
            dispatch({
                type: LIST_ERROR,
                payload: error.response.msg
            });
        }
    }

    // Add List
    const addList = async list => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        try {
            const res = await axios.post('/api/lists', list, config);
            dispatch({
                type: ADD_LIST,
                payload: res.data
            });
        } catch (error) {
            dispatch({
                type: LIST_ERROR,
                payload: error.response.msg
            });
        }
    }

    // Delete List
    const deleteList = async id => {
        try {
            await axios.delete(`/api/lists/${id}`);
            dispatch({
                type: DELETE_LIST,
                payload: id
            });
        } catch (error) {
            dispatch({
                type: LIST_ERROR,
                payload: error.response.msg
            });
        }
    }

    // Update List
    const updateList = async list => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        try {
            const res = await axios.put(`/api/lists/${list._id}`, list, config);
            dispatch({ 
                type: UPDATE_LIST, 
                payload: res.data 
            });

        } catch (error) {
            dispatch({
                type: LIST_ERROR,
                payload: error.response.msg
            });
        }
    }

    // Clear Lists
    const clearLists = () => {
        dispatch({ type: CLEAR_LISTS });
    }

    // Delete Child List
    // Set Current List
    const setCurrent = list => {
        dispatch({ type: SET_CURRENT, payload: list });
    }

    // Clear Current List
    const clearCurrent = () => {
        dispatch({ type: CLEAR_CURRENT });
    }

    // TODO: Filter Lists & Clear Filter

    return (
        <ListContext.Provider
            value={{
                lists: state.lists,
                current: state.current,
                error: state.error,
                getLists,
                addList,
                deleteList,
                setCurrent,
                clearCurrent,
                clearLists,
                updateList
            }}
        >
            {props.children}
        </ListContext.Provider>
    );
};

export default ListState;