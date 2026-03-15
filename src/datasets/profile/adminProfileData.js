import { 
    Lock, Smartphone, Laptop, Clock, 
    Moon, Sun, Languages, Globe, Bell 
} from 'lucide-react';

export const securitySettings = [
    { name: 'Change Password', status: 'Update', icon: Lock, active: true },
    { name: 'Two-Factor Authentication', status: 'Enabled', icon: Smartphone, active: true },
    { name: 'Active Sessions', status: '2 Devices', icon: Laptop, active: true },
    { name: 'Login History', status: 'View', icon: Clock, active: false },
];

export const getAccountPreferences = (isDarkMode) => [
    { label: 'Theme Mode', value: isDarkMode ? 'Dark Mode' : 'Light Mode', icon: isDarkMode ? Moon : Sun },
    { label: 'Language', value: 'English (US)', icon: Languages },
    { label: 'Timezone', value: 'IST (UTC +5:30)', icon: Globe },
    { label: 'Email Notifications', value: 'Enabled', icon: Bell, toggle: true },
];
