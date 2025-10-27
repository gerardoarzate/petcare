import styles from './InfoItem.module.css';

export const InfoItem = ({ label, labelColor, textColor, children }) => {
    return (
        <div className={styles.infoItem}>
            <p className={styles.label} style={{ color: 'inherit' }}>
                {label}
            </p>
            <p style={{ color: textColor }}>
                {children}
            </p>
        </div>
    );
}