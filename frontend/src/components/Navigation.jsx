import styles from './Navigation.module.css';
import AssistanceIcon from '../assets/ion--medical.svg?react';
import PatientIcon from '../assets/material-symbols--medical-mask.svg?react';
import ChatIcon from '../assets/mynaui--message-solid.svg?react';
import ProfileIcon from '../assets/iconamoon--profile-fill.svg?react';
import ClinicianIcon from '../assets/maki--doctor.svg?react';
import QuickQuestionIcon from '../assets/mingcute--question-fill.svg?react'
import PetIcon from '../assets/streamline-plump--pet-paw-solid.svg?react';
import { NavigationItem } from './NavigationItem';
import { useToken } from '../contexts/TokenContext';

const clinicianItems = [
	{
		label: 'Asistencia',
		path: 'assistance',
		IconComponent: AssistanceIcon
	},
	{
		label: 'Cliente',
		path: 'counterpart',
		IconComponent: ProfileIcon
	},
	{
		label: 'Chat',
		path: 'chat',
		IconComponent: ChatIcon
	},
	{
		label: 'Perfil',
		path: 'profile',
		IconComponent: ClinicianIcon
	}
];

const patientItems = [
	{
		label: 'Asistencia',
		path: 'assistance',
		IconComponent: AssistanceIcon
	},
	{
		label: 'Vet',
		path: 'counterpart',
		IconComponent: ClinicianIcon
	},
	{
		label: 'Chat',
		path: 'chat',
		IconComponent: ChatIcon
	},
	{
		label: 'Dudas',
		path: 'ai',
		IconComponent: QuickQuestionIcon
	},
	{
		label: 'Mascota',
		path: 'pet-profile',
		IconComponent: PetIcon
	},
	{
		label: 'Perfil',
		path: 'profile',
		IconComponent: ProfileIcon
	}
];

export const Navigation = () => {
	const userType = useToken().tokenData?.type;
	const items = userType == 'VET' ? clinicianItems : patientItems;

	return (
		<div className={styles.navigation}>
			{ items.map(item => (
				<NavigationItem
					key={item.label}
					label={item.label}
					path={item.path}
					IconComponent={item.IconComponent}
				/>
			)) }
		</div>
	);
}