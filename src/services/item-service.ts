/* eslint-disable @typescript-eslint/no-explicit-any */
import { apiClient, CanceledError } from "./api-client";

export { CanceledError };

export interface Item {
  _id?: string;
  name: string;
  description: string;
  category: string;
  location: string;
  date: string;
  itemType: "lost" | "found";
  imageUrl: string;
  userId: string;
  ownerName?: string;
  ownerEmail?: string;
  isResolved?: boolean;
  matchedId?: string;
  createdAt?: string;
  updatedAt?: string;
}

const getAllItems = (filters?: {
  itemType?: "lost" | "found";
  userId?: string;
}) => {
  const abortController = new AbortController();

  let url = "/items";
  const queryParams: string[] = [];

  if (filters?.itemType) {
    queryParams.push(`itemType=${filters.itemType}`);
  }

  if (filters?.userId) {
    queryParams.push(`userId=${filters.userId}`);
  }

  if (queryParams.length > 0) {
    url += "?" + queryParams.join("&");
  }

  const request = apiClient.get<Item[]>(url, {
    signal: abortController.signal,
  });

  return { request, abort: () => abortController.abort() };
};

const getAllLostItems = (userId?: string) => {
  return getAllItems({ itemType: "lost", userId });
};

const getAllFoundItems = (userId?: string) => {
  return getAllItems({ itemType: "found", userId });
};

const getItemById = (id: string) => {
  const abortController = new AbortController();
  const request = apiClient.get<Item>(`/items/${id}`, {
    signal: abortController.signal,
  });

  return {
    request: request,
    abort: () => abortController.abort(),
  };
};

const getItemsByUser = (userId: string) => {
  const abortController = new AbortController();
  const request = apiClient.get<Item[]>(`/items?userId=${userId}`, {
    signal: abortController.signal,
  });

  return {
    request: request,
    abort: () => abortController.abort(),
  };
};

const addItem = async (formData: FormData) => {
  try {
    for (const pair of formData.entries()) {
      if (pair[0] === "image") {
        const file = pair[1] as File;
        console.log(
          `${pair[0]}: [File] ${file.name}, type: ${file.type}, size: ${file.size} bytes`
        );
      } else {
        console.log(`${pair[0]}: ${pair[1]}`);
      }
    }

    return apiClient.post("/items", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  } catch (error: any) {
    console.error("Error in addItem:", error);

    throw error;
  }
};

const deleteItem = (id: string) => {
  const abortController = new AbortController();
  const request = apiClient.delete(`/items/${id}`, {
    signal: abortController.signal,
  });
  return { request, abort: () => abortController.abort() };
};

export default {
  getAllItems,
  getAllLostItems,
  getAllFoundItems,
  getItemById,
  getItemsByUser,
  addItem,
  deleteItem,
};
