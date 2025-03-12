import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export interface Contact {
  id: number;
  name: string;
  phone: string;
  isFavorite?: boolean; // Nå kan kontakter være favoritter
}

export function useContacts() {
  const [contacts, setContacts] = useState<Contact[]>([]);

  useEffect(() => {
    loadContacts();
  }, []);

  const loadContacts = async () => {
    try {
      const storedContacts = await AsyncStorage.getItem("contacts");
      if (storedContacts) {
        setContacts(JSON.parse(storedContacts));
      }
    } catch (error) {
      console.error("Failed to load contacts", error);
    }
  };

  const saveContacts = async (updatedContacts: Contact[]) => {
    setContacts(updatedContacts);
    try {
      await AsyncStorage.setItem("contacts", JSON.stringify(updatedContacts));
    } catch (error) {
      console.error("Failed to save contacts", error);
    }
  };

  const addContact = async (name: string, phone: string) => {
    const newContact: Contact = {
      id: Date.now(),
      name,
      phone,
      isFavorite: false,
    };
    const updatedContacts = [...contacts, newContact];
    saveContacts(updatedContacts);
  };

  const deleteContact = async (id: number) => {
    const updatedContacts = contacts.filter((contact) => contact.id !== id);
    saveContacts(updatedContacts);
  };

  const toggleFavorite = async (id: number) => {
    const updatedContacts = contacts.map((contact) =>
      contact.id === id
        ? { ...contact, isFavorite: !contact.isFavorite }
        : contact
    );
    saveContacts(updatedContacts);
  };

  return { contacts, addContact, deleteContact, toggleFavorite };
}
