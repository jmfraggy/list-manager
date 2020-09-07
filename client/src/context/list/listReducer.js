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

export default (state, action) => {
    switch (action.type) {
        case ADD_LIST:
            return {
                ...state,
                lists: [...state.lists, action.payload]
            };
        case UPDATE_LIST:
            return {
                ...state,
                lists: state.lists.map(list => list.id === action.payload.id ? 
                action.payload : list)
            };
        case DELETE_LIST:
            return {
                ...state,
                lists: state.lists.filter(list => list.id !== action.payload)
            };
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
        default:
            return state;
    }
}