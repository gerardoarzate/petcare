import { createContext, useContext, useState } from 'react';
import { useToken } from './TokenContext';
import { useAPI } from './APIContext';
import { Dialog } from '@capacitor/dialog';

const SpeciesContext = createContext(
    [ {
        id: 0,
        name: '',
        // description: ''
    } ]
);

export const SpeciesProvider = ({ children }) => {
    const { token } = useToken();
    const { fetchApi } = useAPI();
    const [types, setTypes] = useState([]);
    const areTypesLoaded = types.length > 0;
    
    if (token && !areTypesLoaded) {
        fetchApi('species')
            .then(res => {
                const { species } = res;
                setTypes(species);
            })
            .catch(async error => {
                console.error(`Unable to load species: ${error.message}`);
                await Dialog.alert({
                    title: 'Error',
                    message: 'No ha sido posible cargar las especies, por favor, vuelve a cargar la pantalla'
                });
            });
    }

    return (
        <SpeciesContext.Provider value={types}>
            {children}
        </SpeciesContext.Provider>
    );
}

export const useSpecies = () => {
    const types = useContext(SpeciesContext);
    if (!types) {
        throw new Error('useSpecies must be used within a SpeciesProvider');
    }
    return types;
}