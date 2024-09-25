import { View, Text } from "react-native";
import React, { createContext, ReactNode, useContext, useState } from "react";
import { Coffee } from "../types/Coffee";
import { API_URL } from "./AuthContext";
import useAxios from "../utils/useAxios";

interface CoffeeContextType {
    addCoffee: (coffee: Coffee) => Promise<void>;
    refreshCoffees: number;
}

const CoffeeContext = createContext<CoffeeContextType | undefined>(undefined);

export const CoffeeProvider = ({ children }: { children: ReactNode }) => {
    const api = useAxios();
    const [refreshCoffees, setRefreshCoffees] = useState(0);

    const addCoffee = async (coffee: Coffee) => {
        try {
            await api.post(`${API_URL}/coffees`, coffee);
            setRefreshCoffees(refreshCoffees + 1);
        } catch (e: any) {
            console.error(e);
        }
    };

    return (
        <CoffeeContext.Provider value={{ addCoffee, refreshCoffees }}>
            {children}
        </CoffeeContext.Provider>
    );
};

export const useCoffees = (): CoffeeContextType => {
    const context = useContext(CoffeeContext);
    if (!context) {
        throw new Error("useCoffees must be used within a CoffeeProvider");
    }
    return context;
};
