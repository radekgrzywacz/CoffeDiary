import React, {
    createContext,
    useState,
    useEffect,
    ReactNode,
    useContext,
} from "react";
import useAxios from "../utils/useAxios";
import { Brewer } from "../types/Brewer";
import { API_URL, useAuth } from "../context/AuthContext";

// Define the type of the context state
interface BrewerContextType {
    brewers: Brewer[];
    addBrewer: (brewer: Brewer) => Promise<void>;
}

// Create the BrewerContext with an empty default value
const BrewerContext = createContext<BrewerContextType | undefined>(undefined);

// BrewerProvider component to provide the context to child components
export const BrewerProvider = ({ children }: { children: ReactNode }) => {
    const [brewers, setBrewers] = useState<Brewer[]>([]);
    const api = useAxios();
    const [refreshBrewers, setRefreshBrewers] = useState(0);
    const { authState } = useAuth();
    const isAuthenticated = authState?.authenticated;

    useEffect(() => {
        if (!isAuthenticated) return;
        console.log("fetching brewers");
        const fetchBrewers = async () => {
            try {
                const result = await api.get(`${API_URL}/brewers`);
                setBrewers(result.data);
            } catch (e) {
                console.error("Failed to fetch brewers", e);
            }
        };

        fetchBrewers();
    }, [refreshBrewers, isAuthenticated]);

    const addBrewer = async (brewer: Brewer) => {
        try {
            await api.post(`${API_URL}/brewers`, brewer);
            setRefreshBrewers(refreshBrewers + 1);
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <BrewerContext.Provider value={{ brewers, addBrewer }}>
            {children}
        </BrewerContext.Provider>
    );
};

// Custom hook to use the BrewerContext
export const useBrewers = (): BrewerContextType => {
    const context = useContext(BrewerContext);
    if (!context) {
        throw new Error("useBrewers must be used within a BrewerProvider");
    }
    return context;
};
