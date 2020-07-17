const Actions = {
    UPDATE_USER: "UPDATE_USER",
    UPDATE_TOKEN: "UPDATE_TOKEN"
}

export default (state, action) => {
    switch (action.type) {
        case Actions.UPDATE_USER:
            return {
                token: state.token,
                user: action.payload
            };
        case Actions.UPDATE_TOKEN:
            return {
                user: state.user,
                token: action.payload
            };
        default:
            return state;
    }
};