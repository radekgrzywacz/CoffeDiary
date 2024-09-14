import React, { createContext, useState, useEffect, ReactNode, useContext } from 'react';
import useAxios from '../utils/useAxios';
import { Brewer } from '../types/Brewer';
import { API_URL } from '../context/AuthContext';

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

    useEffect(() => {
        const fetchBrewers = async () => {
            try {
                const result = await api.get(`${API_URL}/brewers`);
                setBrewers(result.data);
            } catch (e) {
                console.error(e);
            }
        };

        fetchBrewers();
    }, [api]);

    const addBrewer = async (brewer: Brewer) => {
        try {
            await api.post(`${API_URL}/brewers`, brewer);
            // Reload the brewers list after adding a new brewer
            const result = await api.get(`${API_URL}/brewers`);
            setBrewers(result.data);
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
        throw new Error('useBrewers must be used within a BrewerProvider');
    }
    return context;
};
