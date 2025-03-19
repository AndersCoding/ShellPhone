// lib/data/contacts.tsx
import { useState, useEffect, useCallback } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export interface Contact {
  id: number;
  name: string;
  phone: string;
  isFavorite?: boolean;
}

// Create a single shared state that persists across components
let globalContacts: Contact[] = [];
let listeners: Function[] = [];

// Function to notify all listeners of changes
const notifyListeners = () => {
  listeners.forEach((listener) => listener(globalContacts));
};

export function useContacts() {
  const [contacts, setContacts] = useState<Contact[]>(globalContacts);

  // Load contacts from AsyncStorage
  const loadContacts = useCallback(async () => {
    try {
      const storedContacts = await AsyncStorage.getItem("contacts");
      if (storedContacts) {
        const parsedContacts = JSON.parse(storedContacts);
        globalContacts = parsedContacts;
        setContacts(parsedContacts);
        notifyListeners();
      }
    } catch (error) {
      console.error("Failed to load contacts", error);
    }
  }, []);

  // Save contacts to AsyncStorage and update global state
  const saveContacts = useCallback(async (updatedContacts: Contact[]) => {
    globalContacts = updatedContacts;
    setContacts(updatedContacts);
    notifyListeners();

    try {
      await AsyncStorage.setItem("contacts", JSON.stringify(updatedContacts));
    } catch (error) {
      console.error("Failed to save contacts", error);
    }
  }, []);

  // Add a contact
  const addContact = useCallback(
    (name: string, phone: string) => {
      const newContact: Contact = {
        id: Date.now(),
        name,
        phone,
        isFavorite: false,
      };
      const updatedContacts = [...globalContacts, newContact];
      saveContacts(updatedContacts);
    },
    [saveContacts]
  );

  // Delete a contact
  const deleteContact = useCallback(
    (id: number) => {
      const updatedContacts = globalContacts.filter(
        (contact) => contact.id !== id
      );
      saveContacts(updatedContacts);
    },
    [saveContacts]
  );

  // Toggle favorite status
  const toggleFavorite = useCallback(
    (id: number) => {
      const updatedContacts = globalContacts.map((contact) =>
        contact.id === id
          ? { ...contact, isFavorite: !contact.isFavorite }
          : contact
      );
      saveContacts(updatedContacts);
    },
    [saveContacts]
  );

  // Register this component as a listener for changes
  useEffect(() => {
    // Add this component to listeners
    const listener = (updatedContacts: Contact[]) => {
      setContacts(updatedContacts);
    };
    listeners.push(listener);

    // Load contacts when component mounts
    loadContacts();

    // Clean up listener when component unmounts
    return () => {
      listeners = listeners.filter((l) => l !== listener);
    };
  }, [loadContacts]);

  return {
    contacts,
    addContact,
    deleteContact,
    toggleFavorite,
    reloadContacts: loadContacts,
  };
}
