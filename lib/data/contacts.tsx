import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export interface Contact {
  id: number;
  name: string;
  phone: string;
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

  const addContact = async (name: string, phone: string) => {
    const newContact: Contact = { id: Date.now(), name, phone };
    const updatedContacts = [...contacts, newContact];
    setContacts(updatedContacts);

    try {
      await AsyncStorage.setItem("contacts", JSON.stringify(updatedContacts));
    } catch (error) {
      console.error("Failed to save contact", error);
    }
  };

  // 🗑️ Delete Contact Function
  const deleteContact = async (id: number) => {
    const updatedContacts = contacts.filter((contact) => contact.id !== id);
    setContacts(updatedContacts);

    try {
      await AsyncStorage.setItem("contacts", JSON.stringify(updatedContacts));
    } catch (error) {
      console.error("Failed to delete contact", error);
    }
  };

  return { contacts, addContact, deleteContact };
}
