import { createJSONStorage, StateStorage } from "zustand/middleware";
const firebaseURL = import.meta.env.VITE_FIREBASE_URL;

const storageAPi: StateStorage = {
  getItem: async function (name: string): Promise<string | null> {
    try {
      const data = await fetch(`${firebaseURL}/${name}.json`).then((res) =>
        res.json()
      );
      return JSON.stringify(data);
    } catch (error) {
      console.error("Error fetching data from Firebase:", error);
      throw error;
    }
  },
  setItem: async function (name: string, value: string): Promise<void> {
    await fetch(`${firebaseURL}/${name}.json`, {
      method: "PUT",
      body: value,
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => res.json());
    sessionStorage.setItem(name, value);
    return;
  },
  removeItem: function (name: string): void | Promise<void> {
    console.log("removeItem", name);
  },
};

export const firebaseStorage = createJSONStorage(() => storageAPi);
