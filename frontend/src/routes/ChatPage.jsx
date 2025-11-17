import styles from './ChatPage.module.css';
import { useToken } from '../contexts/TokenContext';
import { useAssistanceService } from '../contexts/AssistanceServiceContext';
import { CounterpartHeader } from '../components/CounterpartHeader';
import { Chat } from '../components/Chat';

const AvailableClinicianView = () => (
    <div className={styles.availableClinicianView}>
        <p className={styles.availableClinicianText}>Cuando te sea asignada una solicitud podrás comunicarte con el dueño de la mascota aquí</p>
    </div>
)

const BusyClinicianView = () => {
    const { counterpart } = useAssistanceService();

    return (
        <div className={styles.busyClinicianView}>
            <CounterpartHeader name={counterpart.fullName} />
            <Chat />
        </div>
    );
}

const AvailablePatientView = () => (
    <div className={styles.availablePatientView}>
        <p className={styles.availablePatientText}>Cuando te sea asignado un veterinario podrás comunicarte con él aquí</p>
    </div>
)

const BusyPatientView = () => {
    const { counterpart } = useAssistanceService();

    return (
        <div className={styles.busyPatientView}>
            <CounterpartHeader role='Veterinario' name={counterpart.fullName} />
            <Chat />
        </div>
    );
}

export const ChatPage = () => {
    const { tokenData } = useToken();
    const { counterpart } = useAssistanceService();
    
    if (!tokenData) {
        return;
    }

    const { type } = tokenData;
    const isBusy = counterpart;

    return (
        <main className={styles.chatPage}>
            {
                type == 'VET' ? 
                    isBusy ? <BusyClinicianView />
                    : <AvailableClinicianView />
                : type == 'PET' ?
                    isBusy ? <BusyPatientView />
                    : <AvailablePatientView />
                : null
            }
        </main>
    );
}