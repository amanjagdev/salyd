const Actions = {
    UPDATE_USER: "UPDATE_USER",
    UPDATE_TOKEN: "UPDATE_TOKEN",
    UPDATE_TABLE_ID: "UPDATE_TABLE_ID",
    UPDATE_ROOM_ID: "UPDATE_ROOM_ID",
    UPDATE_LOCAL_ROOM_ID : "UPDATE_LOCAL_ROOM_ID",
    UPDATE_ORDER: "UPDATE_ORDER",
    UPDATE_RESTRO : "UPDATE_RESTRO"
}

export default (state, action) => {
    switch (action.type) {
        case Actions.UPDATE_USER:
            return {
                token: state.token,
                order: state.order,
                tableId: state.tableId,
                roomId: state.roomId,
                user: action.payload,
                restro : state.restro
            };
        case Actions.UPDATE_TOKEN:
            return {
                order: state.order,
                tableId: state.tableId,
                roomId: state.roomId,
                user: state.user,
                token: action.payload,
                restro : state.restro
            };
        case Actions.UPDATE_ROOM_ID:
            return {
                order: state.order,
                token: state.token,
                roomId: action.payload,
                user: state.user,
                tableId: state.tableId,
                restro : state.restro,
            };
        case Actions.UPDATE_TABLE_ID:
            return {
                order: state.order,
                token: state.token,
                roomId: state.roomId,
                user: state.user,
                tableId: action.payload,
                restro : state.restro,
            };
        case Actions.UPDATE_ORDER:
            return {
                order: action.payload,
                token: state.token,
                roomId: state.roomId,
                user: state.user,
                tableId: state.tableId,
                restro : state.restro
            };
        case Actions.UPDATE_RESTRO : 
            return {
                restro : action.payload,
                order: state.order,
                token: state.token,
                roomId: state.roomId,
                user: state.user,
                tableId: state.tableId        
            }
        default:
            return state;
    }
};