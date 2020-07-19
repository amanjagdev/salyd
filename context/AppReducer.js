const Actions = {
    UPDATE_USER: "UPDATE_USER",
    UPDATE_TOKEN: "UPDATE_TOKEN",
    UPDATE_TABLE_ID: "UPDATE_TABLE_ID",
    UPDATE_ROOM_ID: "UPDATE_ROOM_ID"
}

export default (state, action) => {
    switch (action.type) {
        case Actions.UPDATE_USER:
            return {
                token: state.token,
                tableId: state.tableId,
                roomId: state.roomId,
                user: action.payload
            };
        case Actions.UPDATE_TOKEN:
            return {
                tableId: state.tableId,
                roomId: state.roomId,
                user: state.user,
                token: action.payload
            };
        case Actions.UPDATE_ROOM_ID:
            return {
                token: state.token,
                roomId: action.payload,
                user: state.user,
                tableId: state.tableId
            };
        case Actions.UPDATE_TABLE_ID:
            return {
                token: state.token,
                roomId: state.roomId,
                user: state.user,
                tableId: action.payload
            };
        default:
            return state;
    }
};