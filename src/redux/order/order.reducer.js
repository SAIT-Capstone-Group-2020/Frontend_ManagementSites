// inmport action types
import { OrderActionTypes } from './order.type';

// initiate store for orders
const INITIAL_STATE = {
    orders: []
}

/**
 * Manage states in store by actions
 * @param {*} state initial state
 * @param {*} action action object
 * @returns updated state
 */
 const orderReducer = ( state = INITIAL_STATE, action ) => {
    switch ( action.type ) {
        case OrderActionTypes.GET_ORDERS:
            return {
                ...state,
                orders: action.payload
            };
        case OrderActionTypes.UPDATE_ORDER_STATUS:
            return {
                ...state,
                orders: state.orders.map( order => ( order.id === action.payload.id ) ? action.payload : order )
            };
        case OrderActionTypes.DELETE_ORDER:
            return {
                ...state,
                orders: state.orders.filter( order => order.id !== action.payload.id )
            };
        default:
            return state;
    }
}

export default orderReducer;