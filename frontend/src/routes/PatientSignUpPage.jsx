import styles from './PatientSignUpPage.module.css';
import { useState, useEffect } from 'react';
import { Button } from '../components/Button';
import { BackButton } from '../components/BackButton';
import { Input } from '../components/Input';
import { SegmentedControl } from '../components/SegmentedControl';
import { Dialog } from '@capacitor/dialog';
import { useAPI } from '../contexts/APIContext';
import { useToken } from '../contexts/TokenContext';
import { Select } from '../components/Select';

export const PatientSignUpPage = () => {
    const { fetchApi } = useAPI();
    const { setToken } = useToken();
    const sexOptions = ['Macho', 'Hembra'];
    const [page, setPage] = useState(0);
    const [species, setSpecies] = useState();
    const [formData, setFormData] = useState({
        name: '',
        lastname: '',
        // curp: '',
        // sex: undefined,
        // age: '',
        // height: '',
        // weight: '',
        telephone: '',
        email: '',
        password: '',
        petName: '',
        species: '',
        petSex: undefined,
        petAge: '',
        petRace: '',
        notes: ''
    });

    useEffect(() => {
        fetchApi('species')
            .then(res => {
                setSpecies(res.species);
            })
            .catch(async error => {
                await Dialog.alert({
                    title: 'Error',
                    message: 'No se ha podido obtener la lista de especies, intenta de nuevo'
                });
                navigate('/');
                throw new Error(`Unable to fetch species: ${error.message}`);
            })
    }, []);

    const isFormDataValid = (formData) => {
        return (
            formData.name &&
            formData.lastname &&
            // formData.curp &&
            // formData.sex &&
            // formData.age &&
            // formData.height &&
            // formData.weight &&
            formData.telephone &&
            formData.email &&
            formData.password && 
            formData.petName &&
            formData.species &&
            formData.petSex &&
            formData.petAge &&
            formData.petRace
        );
    }

    const onConfirm = () => {
        if (page === 0) {
            setPage(1);
            return;
        }

        if (!isFormDataValid(formData)) {
            Dialog.alert({
                title: 'Datos incorrectos',
                message: 'Verifica los datos y vuelve a intentarlo'
            });
            return;
        }

        const requestBody = { ...formData }
        requestBody.petSex = formData.petSex.toLowerCase();
        // requestBody.age = Number(formData.age);
        // requestBody.weight = Number(formData.weight);
        // requestBody.height = Number(formData.height);
        requestBody.speciesId = species.find(s => s.name === requestBody.species).id;

        fetchApi('pets', 'POST', requestBody)
            .then(async res => {
                await Dialog.alert({
                    title: '¡Bienvenido!',
                    message: 'Registro exitoso.'
                });
                setToken(res.token);
            })
            .catch(error => {
                console.log(error.message);
                Dialog.alert({
                    title: 'No ha sido posible hacer el registro',
                    message: 'Por favor, vuelve a intentarlo'
                });
            });
    };

    return (
        <main className={styles.patientSignUpPage}>
            <div className={styles.titleContainer}>
                <div className={styles.backButtonContainer}>
                    <BackButton />
                </div>
                <h1 className={styles.title}>{page === 0 ? "Datos personales" : 'Datos de la Mascota'}</h1>
            </div>

            { page === 0 ? (
                <>
                    <Input
                        color='var(--secondary)'
                        label='Nombre(s)'
                        name='name'
                        type='text'
                        value={formData.name}
                        setterFunction={setFormData}
                    />
                    <Input
                        color='var(--secondary)'
                        label='Apellido(s)'
                        name='lastname'
                        type='text'
                        value={formData.lastname}
                        setterFunction={setFormData}
                    />
                    {/* <Input
                        color='var(--secondary)'
                        label='CURP'
                        name='curp'
                        type='text'
                        value={formData.curp}
                        setterFunction={setFormData}
                    /> */}
                    {/* <SegmentedControl
                        color='var(--secondary)'
                        label='Sexo'
                        name='sex'
                        value={formData.sex}
                        setterFunction={setFormData}
                        options={sexOptions}
                    /> */}
                    {/* <Input
                        color='var(--secondary)'
                        label='Edad'
                        name='age'
                        type='number'
                        value={formData.age}
                        setterFunction={setFormData}
                    /> */}
                    {/* <Input
                        color='var(--secondary)'
                        label='Estatura (metros)'
                        name='height'
                        type='number'
                        value={formData.height}
                        setterFunction={setFormData}
                    /> */}
                    {/* <Input
                        color='var(--secondary)'
                        label='Peso (kg)'
                        name='weight'
                        type='number'
                        value={formData.weight}
                        setterFunction={setFormData}
                    /> */}
                    <Input
                        color='var(--secondary)'
                        label='Teléfono de contacto'
                        name='telephone'
                        type='text'
                        value={formData.telephone}
                        setterFunction={setFormData}
                    />
                    <Input
                        color='var(--secondary)'
                        label='Correo electrónico'
                        name='email'
                        type='email'
                        value={formData.email}
                        setterFunction={setFormData}
                    />
                    <Input
                        color='var(--secondary)'
                        label='Contraseña'
                        name='password'
                        type='password'
                        value={formData.password}
                        setterFunction={setFormData}
                    />
                </>
            ) : (
                <>
                    <Input
                        color='var(--secondary)'
                        label='Nombre de la mascota'
                        name='petName'
                        type='text'
                        value={formData.petName}
                        setterFunction={setFormData}
                    />
                    { species ? (
                        <Select
                            color='var(--secondary)'
                            label='Especie'
                            name='species'
                            value={formData.species}
                            setterFunction={setFormData}
                            options={species.map(s => s.name)}
                        />) : (
                            <InfoItem label={'Especie'} textColor={'#555'}>
                                Cargando especies...
                            </InfoItem>
                        )
                    }

                     <SegmentedControl
                        color='var(--secondary)'
                        label='Sexo'
                        name='petSex'
                        value={formData.petSex}
                        setterFunction={setFormData}
                        options={sexOptions}
                    />
                    <Input
                        color='var(--secondary)'
                        label='Edad'
                        name='petAge'
                        type='number'
                        value={formData.petAge}
                        setterFunction={setFormData}
                    />
                    <Input
                        color='var(--secondary)'
                        label='Raza de la mascota'
                        name='petRace'
                        type='text'
                        value={formData.petRace}
                        setterFunction={setFormData}
                    />
                    <Input
                        color='var(--secondary)'
                        label='Notas o información extra (opcional)'
                        name='notes'
                        type='text'
                        value={formData.notes}
                        setterFunction={setFormData}
                    />
                </>
            )}

            <Button onClick={onConfirm}>
                Confirmar
            </Button>
        </main>
    );
}