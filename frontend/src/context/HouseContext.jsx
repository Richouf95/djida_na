import { useReducer } from "react";
import { createContext } from "react";

export const HousesContext = createContext()

export const housesReducer = (state, action) => {
    switch(action.type) {
        case 'SET_HOUSES':
            return {
                houses: action.payload
            }
        case 'CREATE_HOUSE':
            return {
                houses: [action.payload, ...state.houses]
            }
        case 'UPDATE_HOUSE':
            return {
                houses: [action.payload, ...state.houses]
            }
        case 'DELETE_HOUSE':
            return {
                houses: state.houses.fiter((h) => h._id !== action.payload._id)
            }
        default: 
            return state
    }
}

export const HousesContextProvider = ({children}) => {

    const [state, dispatch] = useReducer(housesReducer, {
        houses: null
    })

    return (
        <HousesContext.Provider value={{...state, dispatch}}>
            {children}
        </HousesContext.Provider>
    )
}