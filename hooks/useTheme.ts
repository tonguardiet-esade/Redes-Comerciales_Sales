import { useSettings } from '../context/SettingsContext';

export const useTheme = () => {
  const { theme, toggleTheme } = useSettings();
  return { theme, toggleTheme };
};
