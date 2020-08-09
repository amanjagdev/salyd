import { Actions } from './ActionsOverview';

export default (state, action) => {
    switch (action.type) {
        case Actions.UPDATE_USER:
            return {
                token: state.token,
                order: state.order,
                tableId: state.tableId,
                roomId: state.roomId,
                user: action.payload,
                restro: state.restro,
                currentTheme: state.currentTheme
            };
        case Actions.UPDATE_TOKEN:
            return {
                order: state.order,
                tableId: state.tableId,
                roomId: state.roomId,
                user: state.user,
                token: action.payload,
                restro: state.restro,
                currentTheme: state.currentTheme
            };
        case Actions.UPDATE_ROOM_ID:
            return {
                order: state.order,
                token: state.token,
                roomId: action.payload,
                user: state.user,
                tableId: state.tableId,
                restro: state.restro,
                currentTheme: state.currentTheme
            };
        case Actions.UPDATE_TABLE_ID:
            return {
                order: state.order,
                token: state.token,
                roomId: state.roomId,
                user: state.user,
                tableId: action.payload,
                restro: state.restro,
                currentTheme: state.currentTheme
            };
        case Actions.UPDATE_ORDER:
            return {
                order: action.payload,
                token: state.token,
                roomId: state.roomId,
                user: state.user,
                tableId: state.tableId,
                restro: state.restro,
                currentTheme: state.currentTheme
            };
        case Actions.UPDATE_RESTRO:
            return {
                restro: action.payload,
                order: state.order,
                token: state.token,
                roomId: state.roomId,
                user: state.user,
                tableId: state.tableId,
                currentTheme: state.currentTheme
            }
        case Actions.CHANGE_THEME:
            return {
                restro: state.restro,
                order: state.order,
                token: state.token,
                roomId: state.roomId,
                user: state.user,
                tableId: state.tableId,
                currentTheme: 'light' ? 'dark' : 'light'
            }
        default:
            return state;
    }
};