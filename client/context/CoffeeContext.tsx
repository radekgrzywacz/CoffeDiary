import { View, Text } from "react-native";
import React, {
    createContext,
    ReactNode,
    useContext,
    useEffect,
    useState,
} from "react";
import { Coffee } from "../types/Coffee";
import { API_URL, useAuth } from "./AuthContext";
import useAxios from "../utils/useAxios";

interface CoffeeContextType {
    addCoffee: (coffee: Coffee) => Promise<void>;
    refreshCoffees: number;
    coffees: Coffee[];
}

const CoffeeContext = createContext<CoffeeContextType | undefined>(undefined);

export const CoffeeProvider = ({ children }: { children: ReactNode }) => {
    const api = useAxios();
    const [coffees, setCoffees] = useState<Coffee[]>([]);
    const [refreshCoffees, setRefreshCoffees] = useState(0);
    const { authState } = useAuth();
    const isAuthenticated = authState?.authenticated;

    useEffect(() => {
        if (!isAuthenticated) return;

        const getCoffees = async () => {
            try {
                const result = await api.get(`${API_URL}/coffees`);
                setCoffees(result.data);
                return result;
            } catch (e: any) {
                const errorMessage =
                    e.response.data.error || "An error occurred";
                console.log(e);
                return { error: true, msg: errorMessage };
            }
        };
        getCoffees();
    }, [refreshCoffees, isAuthenticated]);

    const addCoffee = async (coffee: Coffee) => {
        try {
            await api.post(`${API_URL}/coffees`, coffee);
            setRefreshCoffees(refreshCoffees + 1);
        } catch (e: any) {
            console.error(e);
        }
    };

    return (
        <CoffeeContext.Provider value={{ addCoffee, refreshCoffees, coffees }}>
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
