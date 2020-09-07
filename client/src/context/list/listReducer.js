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
    switch(action.type) {
        case ADD_LIST:
            return {
                ...state,
                lists: [...state.lists, action.payload]
            }
        default:
            return state;
    }
}