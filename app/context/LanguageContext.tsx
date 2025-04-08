// lib/context/LanguageContext.tsx
import React, { createContext, useState, useContext, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

type Language = "en" | "no" | "es";

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  translations: Record<string, string>;
}

// lib/context/LanguageContext.tsx - Update the defaultTranslations object

const defaultTranslations = {
  en: {
    // Settings translations (already added)
    darkMode: 'Dark Mode',
    emailNotifications: 'Email Notifications',
    pushNotifications: 'Push Notifications',
    reportBug: 'Report Bug',
    contactUs: 'Contact Us',
    language: 'Language',
    preferences: 'Preferences',
    resources: 'Resources',
    english: 'English',
    norwegian: 'Norwegian',
    spanish: 'Spanish',
    
    // Index screen
    noContactsFound: 'No contacts found',
    addContact: 'Add Contact',
    map: 'Map',
    ninjaQuiz: 'Find the ninja!',
    deleteContact: 'Delete Contact',
    deleteConfirmation: 'Are you sure you want to delete this contact?',
    cancel: 'Cancel',
    delete: 'Delete',
    
    // Favorites screen
    noFavoritesAdded: 'No favorites added',
    hideFavorites: 'Hide Favorites',
    showFavorites: 'Show Favorites',
    
    // Add contact screen
    addNewContact: 'Add New Contact',
    enterName: 'Enter Name',
    enterPhoneNumber: 'Enter Phone Number',
    saveContact: 'Save Contact'
  },
  no: {
    // Settings translations (already added)
    darkMode: 'Mørk Modus',
    emailNotifications: 'E-postvarsler',
    pushNotifications: 'Push-varsler',
    reportBug: 'Rapporter Feil',
    contactUs: 'Kontakt Oss',
    language: 'Språk',
    preferences: 'Preferanser',
    resources: 'Ressurser',
    english: 'Engelsk',
    norwegian: 'Norsk',
    spanish: 'Spansk',
    
    // Index screen
    noContactsFound: 'Ingen kontakter funnet',
    addContact: 'Legg til kontakt',
    map: 'Kart',
    ninjaQuiz: 'Finn ninjaen',
    deleteContact: 'Slett kontakt',
    deleteConfirmation: 'Er du sikker på at du vil slette denne kontakten?',
    cancel: 'Avbryt',
    delete: 'Slett',
    
    // Favorites screen
    noFavoritesAdded: 'Ingen favoritter lagt til',
    hideFavorites: 'Skjul favoritter',
    showFavorites: 'Vis favoritter',
    
    // Add contact screen
    addNewContact: 'Legg til ny kontakt',
    enterName: 'Skriv navn',
    enterPhoneNumber: 'Skriv telefonnummer',
    saveContact: 'Lagre kontakt'
  },
  es: {
    // Settings translations (already added)
    darkMode: 'Modo Oscuro',
    emailNotifications: 'Notificaciones por Correo',
    pushNotifications: 'Notificaciones Push',
    reportBug: 'Reportar Error',
    contactUs: 'Contáctenos',
    language: 'Idioma',
    preferences: 'Preferencias',
    resources: 'Recursos',
    english: 'Inglés',
    norwegian: 'Noruego',
    spanish: 'Español',
    
    // Index screen
    noContactsFound: 'No se encontraron contactos',
    addContact: 'Añadir contacto',
    map: 'Mapa',
    ninjaQuiz: 'Find the ninja!',
    deleteContact: 'Eliminar contacto',
    deleteConfirmation: '¿Estás seguro de que quieres eliminar este contacto?',
    cancel: 'Cancelar',
    delete: 'Eliminar',
    
    // Favorites screen
    noFavoritesAdded: 'No se han añadido favoritos',
    hideFavorites: 'Ocultar favoritos',
    showFavorites: 'Mostrar favoritos',
    
    // Add contact screen
    addNewContact: 'Añadir nuevo contacto',
    enterName: 'Introducir nombre',
    enterPhoneNumber: 'Introducir número de teléfono',
    saveContact: 'Guardar contacto'
  }
};

const LanguageContext = createContext<LanguageContextType>({
  language: "en",
  setLanguage: () => {},
  translations: defaultTranslations.en,
});

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [language, setLanguageState] = useState<Language>("en");
  const [translations, setTranslations] = useState(defaultTranslations.en);

  useEffect(() => {
    // Load saved language preference
    const loadLanguage = async () => {
      try {
        const savedLanguage = await AsyncStorage.getItem("language");
        if (
          savedLanguage &&
          (savedLanguage === "en" ||
            savedLanguage === "no" ||
            savedLanguage === "es")
        ) {
          setLanguageState(savedLanguage);
          setTranslations(defaultTranslations[savedLanguage]);
        }
      } catch (error) {
        console.error("Failed to load language preference", error);
      }
    };

    loadLanguage();
  }, []);

  const setLanguage = async (newLanguage: Language) => {
    try {
      await AsyncStorage.setItem("language", newLanguage);
      setLanguageState(newLanguage);
      setTranslations(defaultTranslations[newLanguage]);
    } catch (error) {
      console.error("Failed to save language preference", error);
    }
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, translations }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
