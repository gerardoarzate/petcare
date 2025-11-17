import styles from './ProfilePage.module.css';
import { PageTitle } from '../components/PageTitle';
import { InfoItem } from '../components/InfoItem';
import { useToken } from '../contexts/TokenContext';
import { useState, useEffect, useRef } from 'react';
import { Dialog } from '@capacitor/dialog';
import { LogOutButton } from '../components/LogOutButton';
import { useProfile } from '../contexts/ProfileContext';
import { useSpecies } from '../contexts/SpeciesContext';



export const PetProfilePage = () => {
    const species = useSpecies();
    const userType = useToken().tokenData?.type;
    // const items = petItems;//userType == 'VET' ? clinicianItems : patientItems;
    const profile = useProfile();
    const petItems = [
    {
        label: 'Nombre de la mascota',
        name: 'petName'
    },
    {
        label: 'Edad',
        name: 'petAge',
        format: value => `${value} años`
    },
    {
        label: 'Sexo',
        name: 'petSex',
        format: value => value == 'macho' ? 'Macho' : 'Hembra'
    },
    {
        label: 'Especie',
        name: 'speciesId',
        format: value => species.find(specie => specie.id === value).name
    },
    {
        label: 'Notas',
        name: 'notes',
        format: value => value || 'Sin notas'
    },
];

    return (
        <main className={styles.profilePage}>
            <PageTitle>Datos de la mascota</PageTitle>
            <div className={styles.infoContainer}>
                { petItems.map(item => {
                    const { label, name, format } = item;
                    let value = profile?.[name];

                    if (value != undefined && format) {
                        value = format(value);
                    }

                    return (
                        <InfoItem key={label} label={label}>
                            {value ?? '...'}
                        </InfoItem>
                    );
                })}
            </div>
            <div className={styles.logOutContainer}>
                <LogOutButton />
            </div>
        </main>
    );
}