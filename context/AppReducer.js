import { Actions } from './GlobalState'

export default (state, action) => {
    switch (action.type) {
        case Actions.UPDATE_USER:
            return {
                ...state,
                user: action.payload
            };
        case Actions.UPDATE_TOKEN:
            return {
                ...state,
                token: action.payload
            };
        default:
            return state;
    }
};