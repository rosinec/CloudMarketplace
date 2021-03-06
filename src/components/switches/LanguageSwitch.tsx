import { IconButton, Tooltip } from '@mui/material';
import { useCallback, useMemo } from 'react';
import Flag from 'react-flagkit';

import { useLanguage, useTranslation } from '../../hooks/useTranslation';

const LanguageSwitch = () => {
	const t = useTranslation();
	const [language, setLanguage] = useLanguage();
	const isCzech = useMemo(() => language === 'cs', [language]);
	const changeLanguage = useCallback(czech => {
		setLanguage(czech ? 'en' : 'cs');
	}, []);

	return (
		<Tooltip title={isCzech ? t('language.en') : t('language.cs')}>
			<IconButton
				size="small"
				onClick={() => changeLanguage(isCzech)}
				sx={{ p: '0' }}
			>
				<Flag size={20} country={isCzech ? 'GB' : 'CZ'} />
			</IconButton>
		</Tooltip>
	);
};

export default LanguageSwitch;
