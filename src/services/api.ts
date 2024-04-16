// Defines the interface for a Customer object with properties id, firstName, username, and address.
export interface Customer {
  id: number;
  firstName: string;
  username: string;
  address: {
    address: string;
  };
}

// Asynchronously fetches a list of customers from the specified URL.
// Returns a Promise that resolves to an array of Customer objects.
export const fetchCustomers = async (): Promise<Customer[]> => {
  try {
    const response = await fetch("https://dummyjson.com/users/");

    if (!response.ok) {
      throw new Error("Failed to fetch customers");
    }

    const data = await response.json();
    return data.users;
  } catch (error) {
    console.error("Error fetching customers:", error);
    return [];
  }
};

// Defines the interface for a Photo object with properties url and photographer.
export interface Photo {
  url: string;
  photographer: string;
}

// Asynchronously fetches a list of photos from the Pexels API based on the provided index.
// Returns a Promise that resolves to an array of Photo objects.
export const fetchPhotos = async (index: number): Promise<Photo[]> => {
  try {
    console.log(index);
    const response = await fetch(
      `https://api.pexels.com/v1/curated?page=${index}&per_page=9`,
      {
        headers: {
          Authorization:
            "Bearer 6KeqKFmeF4sb40QC5vSxhEAl5HCrRWKJSUagI8LltPvvHMJyuIwmAO14",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch photos");
    }

    const data = await response.json();
    // Maps the response data to an array of Photo objects
    const photos: Photo[] = data.photos.map((photo: any) => ({
      url: photo.src.medium,
      photographer: photo.photographer,
    }));

    return photos;
  } catch (error) {
    console.error("Error fetching photos:", error);
    return [];
  }
};
