import { HousesContext } from "../context/HouseContext";
import { useContext } from "react";

export const useHousesContext = () => {
    const contextHouses = useContext(HousesContext)

    if (!contextHouses) {
        throw Error('useHousesContext must be used in an HousesContextProvider')
    }

    return contextHouses
}