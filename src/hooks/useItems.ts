/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import itemService, { Item } from "../services/item-service";

export const useLostItems = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    setIsLoading(true);
    setError(null);

    const { request, abort } = itemService.getAllLostItems();
    request
      .then((res) => {
        setItems(res.data);
        setIsLoading(false);
      })
      .catch((err:any) => {
        if (err || err.code === "ERR_CANCELED") {
          console.log("Request was canceled");
          return;
        }
        setError(err.message);
        console.error("Error fetching lost items:", err);
        setIsLoading(false);
      });

    return () => {
      abort();
    };
  }, []);

  return { items, error, isLoading, setItems, setError, setIsLoading };
};


export const useUserItems = (userId: string) => {
  const [items, setItems] = useState<Item[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!userId) return;
    setIsLoading(true);
    const { request, abort } = itemService.getItemsByUser(userId);
    request
      .then((res) => {
        setItems(res.data);
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setIsLoading(false);
      });

    return abort;
  }, [userId]);

  return { items, error, isLoading, setItems, setError, setIsLoading };
};
