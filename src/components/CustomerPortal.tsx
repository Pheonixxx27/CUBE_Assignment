import React, { useState, useEffect, useRef } from "react";
import Card from "./Card";
import PhotoGrid from "./PhotoGrid";
import { fetchPhotos, Photo, fetchCustomers, Customer } from "../services/api"; // Importing necessary functions and types from the api module

const CustomerPortal: React.FC = () => {
  // State variables for managing customers, selected customer, photos, and card selection state
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(
    null
  );
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [isCardSelected, setIsCardSelected] = useState<boolean>(false);
  const pindexRef = useRef<number>(1); // Ref for managing photo index for pagination

  // Fetch customers data from the API on component mount
  useEffect(() => {
    const fetchCustomerData = async () => {
      try {
        const users = await fetchCustomers();
        setCustomers(users);
      } catch (error) {
        console.error("Error fetching customers:", error);
      }
    };

    fetchCustomerData();
  }, []);

  // Fetch photos data from the API and set up interval for automatic refresh
  useEffect(() => {
    const fetchPhotosData = async () => {
      try {
        const newIndex = pindexRef.current + 1;
        pindexRef.current = newIndex;
        const photosData = await fetchPhotos(newIndex);
        setPhotos(photosData);
      } catch (error) {
        console.error("Error fetching photos:", error);
      }
    };

    fetchPhotosData();
    const intervalId = setInterval(fetchPhotosData, 10000); // Refresh photos every 10 seconds

    return () => clearInterval(intervalId); // Cleanup interval on component unmount
  }, []);

  // Event handler for selecting a customer card
  const handleCustomerClick = (customer: Customer) => {
    setSelectedCustomer(customer);
    setIsCardSelected(true);
  };

  // JSX structure for rendering customer cards and selected customer details
  return (
    <div className="flex">
      <div className="w-1/3 p-4 overflow-y-auto">
        {customers.map((customer, index) => (
          <div
            key={customer.id}
            className={`p-2 cursor-pointer ${
              selectedCustomer && selectedCustomer.id === customer.id
                ? "bg-blue-200"
                : ""
            }`}
            onClick={() => handleCustomerClick(customer)}
          >
            <Card
              index={index}
              name={customer.firstName}
              title={customer.username}
            />
          </div>
        ))}
      </div>
      <div className="w-2/3 p-4 fixed right-0 top-4 bottom-0 overflow-y-auto">
        {isCardSelected ? (
          selectedCustomer && (
            <div>
              <div className="flex flex-col">
                <h2 className="text-2xl font-semibold mb-4">
                  {selectedCustomer.firstName}
                </h2>
                <p className="text-gray-600 mb-4">
                  {selectedCustomer.username}
                </p>
                <p className="text-gray-600 mb-8">
                  {selectedCustomer.address.address}
                </p>
              </div>
              <div className="flex justify-center items-center">
                <PhotoGrid photos={photos} />
              </div>
            </div>
          )
        ) : (
          <div className="flex items-center justify-center h-full">
            <p className="text-gray-600 font-semibold">Select a card first</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomerPortal; // Exporting the CustomerPortal component
