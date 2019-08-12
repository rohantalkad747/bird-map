import { USER_LOGIN, USER_LOGOUT } from './actions';

export const defaultState = {
    userId: null
};

export default function reducer(state = defaultState, action) {
    switch (action.type) {
        case USER_LOGIN:
            return Object.assign({}, state, { userId: action.userId });
        case USER_LOGOUT:
            return Object.assign({}, state, { userId: null });
        default:
            return state;
    }
}