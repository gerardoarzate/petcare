import styles from './ChatPage.module.css';
import { useToken } from '../contexts/TokenContext';
import { useAssistanceService } from '../contexts/AssistanceServiceContext';
import { CounterpartHeader } from '../components/CounterpartHeader';
import { AIChat } from '../components/AIChat';
import AIHandler from '../services/AIHandler';
window.ai ??= new AIHandler();

export const AIPage = () => {
    return (
        <div className={styles.busyPatientView}>
            <CounterpartHeader name='Dudas rápidas' />
            <div style={{
                background: '#f69999',
                padding: '12px',
                borderRadius: '4px',
                width: "95%",
                margin: "8px auto"
            }}>
                Recuerda siempre consultar a un médico veterinario para un diagnóstico confiable
            </div>
            <AIChat />
        </div>
    );
}