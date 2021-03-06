// inmport action types
import { WeightTypeActionTypes } from './weightType.type';

// initiate store for weight types
const INITIAL_STATE = {
    weightTypes: []
};

/**
 * Manage states in store by actions
 * @param {*} state initial state
 * @param {*} action action object
 * @returns updated state
 */
const weightTypeReducer = ( state = INITIAL_STATE, action ) => {
    switch( action.type ) {
        case WeightTypeActionTypes.FETCH_ALL_WEIGHT_TYPES:
            return {
                ...state,
                weightTypes: action.payload
            };
        case WeightTypeActionTypes.ADD_NEW_WEIGHT_TYPE:
            return {
                ...state,
                weightTypes: state.weightTypes.concat(action.payload)
            };
        case WeightTypeActionTypes.EDIT_WEIGHT_TYPE:
            return {
                ...state,
                weightTypes: state.weightTypes.map( weightType => ( weightType.id === action.payload.id) ? action.payload : weightType )
            };
        case WeightTypeActionTypes.DELETE_WEIGHT_TYPE:
            return {
                ...state,
                weightTypes: state.weightTypes.filter( weightType => weightType.id !== action.payload.id)
            };
        default:
            return state;
    }
}

export default weightTypeReducer;