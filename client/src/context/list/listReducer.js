import {
    GET_LISTS,
    ADD_LIST,
    DELETE_LIST,
    SET_CURRENT,
    CLEAR_CURRENT,
    UPDATE_LIST,
    LIST_ERROR,
    CLEAR_LISTS
} from '../types';

export default (state, action) => {
    switch (action.type) {
        case GET_LISTS:
            return {
                ...state,
                lists: action.payload,
                loading: false
            };
        case ADD_LIST:
            return {
                ...state,
                lists: [ action.payload, ...state.lists ],
                loading: false
            };
        case UPDATE_LIST:
            return {
                ...state,
                lists: state.lists.map(list => list._id === action.payload._id ? 
                action.payload : list),
                loading: false
            };
        case DELETE_LIST:
            return {
                ...state,
                lists: state.lists.filter(list => list._id !== action.payload),
                loading: false
            };
        case CLEAR_LISTS:
            return {
                ...state,
                lists: null,
                current: null,
                error: null
            }
        case SET_CURRENT:
            return {
                ...state,
                current: action.payload
            };
        case CLEAR_CURRENT:
            return {
                ...state,
                current: null
            };
        case LIST_ERROR:
            return {
                ...state,
                error: action.payload
            };
        default:
            return state;
    }
};