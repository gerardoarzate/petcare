import styles from './CounterpartPage.module.css';
import { PageTitle } from '../components/PageTitle';
import { InfoItem } from '../components/InfoItem';
import { useToken } from '../contexts/TokenContext';
import { useAssistanceService } from '../contexts/AssistanceServiceContext';
import { useSpecies } from '../contexts/SpeciesContext';

const CounterpartData = ({ title, elements = [] }) => (
    <>
        <PageTitle>{title}</PageTitle>
        <div className={styles.counterpartDataContainer}>
            { elements.map(e => (
                Array.isArray(e) ? (
                    <DataRow key={e[0]?.label} elements={e} />
                ) : (
                    <InfoItem key={e.label} labelColor='var(--secondary)' label={e.label}>
                        {e.value}
                    </InfoItem>
                )
            )) }
        </div>
    </>
)

const DataRow = ({ elements = [] }) => (
    <div className={styles.counterpartDataRow}>
        { elements.map(e => (
            <InfoItem key={e.label} labelColor='var(--secondary)' label={e.label}>
                {e.value}
            </InfoItem>
        )) }
    </div>
)

const AvailableClinicianView = () => (
    <div className={styles.availableClinicianView}>
        <p className={styles.availableClinicianText}>Cuando te sea asignada una solicitud podrás ver los datos de la mascota y su dueño aquí</p>
    </div>
)

const BusyClinicianView = ({ counterpart }) => {
    const species = useSpecies();
    return (
    <div className={styles.busyClinicianView}>
        <CounterpartData
            title='Datos del usuario'
            elements={[
                { label: 'Dueño', value: counterpart.fullName },
                // [
                //     { label: 'Sexo', value: counterpart.sex == 'F' ? 'Femenino' : 'Masculino' },
                //     { label: 'Edad', value: `${counterpart.age} años` }
                // ],
                // [
                //     { label: 'Estatura', value: `${Number(counterpart.height)}m` },
                //     { label: 'Peso', value: `${Number(counterpart.weight)}kg` }
                // ],
                { label: 'Número de teléfono', value: counterpart.telephone }
            ]}
        />
        <CounterpartData
            title='Datos de la mascota'
            elements={[
                { label: 'Nombre de la mascota', value: counterpart.petName },
                [
                    { label: 'Sexo', value: counterpart.petSex == 'hembra' ? 'Hembra' : 'Macho' },
                    { label: 'Edad', value: `${counterpart.petAge} años` }
                ],
                [
                    { label: 'Especie', value: species.find(specie => specie.id === counterpart.speciesId).name },
                    { label: 'Raza', value: counterpart.petRace }
                ],
                { label: 'Notas', value: counterpart.petNotes }
            ]}
        />
    </div>
)}

const AvailablePatientView = () => (
    <div className={styles.availablePatientView}>
        <p className={styles.availablePatientText}>Cuando te sea asignado un veterinario podrás ver sus datos aquí</p>
    </div>
)

const BusyPatientView = ({ counterpart }) => (
    <div className={styles.busyPatientView}>
        <CounterpartData
            title='Datos del veterinario'
            elements={[
                { label: 'Veterinario', value: counterpart.fullName },
                // { label: 'Especialidad', value: counterpart.speciality },
                { label: 'Cédula profesional', value: counterpart.licence },
                { label: 'Número de teléfono', value: counterpart.telephone },
                { label: 'Horario', value: counterpart.schedule }
            ]}
        />
    </div>
)

export const CounterpartPage = () => {
    const { tokenData } = useToken();
    const { counterpart } = useAssistanceService();

    if (!tokenData) {
        return;
    }

    const { type } = tokenData;
    const isBusy = !!counterpart;
console.log(counterpart)
    return (
        <main className={styles.counterpartPage}>
            {
                type == 'VET' ?
                    isBusy ? <BusyClinicianView counterpart={counterpart} />
                    : <AvailableClinicianView />
                : type == 'PET' ?
                    isBusy ? <BusyPatientView counterpart={counterpart} />
                    : <AvailablePatientView />
                : null
            }
        </main>
    );
}