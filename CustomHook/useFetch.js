import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { useEffect } from "react";
import { useState } from "react";
import { db } from "../firebase/config";

const useFetch = (collectionName) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const getCollection = () => {
    setIsLoading(true);
    try {
      const docRef = collection(db, collectionName);
      const q = query(docRef, orderBy("createdAt", "desc"));

      onSnapshot(q, (snapshot) => {
        const allData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setData(allData);
        setIsLoading(false);
      });
    } catch (error) {
      setIsLoading(false);
      console.error(error.message);
    }
  };

  useEffect(() => {
    getCollection();
  }, []);

  return { data, isLoading };
};

export default useFetch;
