import { Tooltip } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import axios from "axios";

const ClientList = () => {
  const [clients, setClients] = useState([]); // State to store fetched data
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    try {
      const response = await axios.get(
        "https://panelapi.isomatsoft.com/api/getData?section=contact_request"
      );
      setClients(response.data.data); // Assuming the API returns an array of clients
      console.log(response.data,'success-sajan');
      setLoading(false);
    } catch (error) {
      console.error("Error fetching client data:", error);
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="text-center py-10">Loading...</div>; // Display loading indicator
  }

  return (
    <div className="min-h-screen">
      <div className="bg-white rounded-lg shadow-md overflow-hidden w-full">
        <table className="w-full">
          <thead className="bg-gray-500 text-white">
            <tr>
              <th className="p-4 text-center align-middle">Client</th>
              <th className="p-4 text-center align-middle">Phone</th>
              <th className="p-4 text-center align-middle">Budget</th>
              <th className="p-4 text-center align-middle">Brief Info</th>
              <th className="p-4 text-center align-middle">Website</th>
            </tr>
          </thead>
          <tbody>
            {clients.map((client) => (
              <ClientRow key={client._id} client={client} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const ClientRow = ({ client }) => {
  const [showFullText, setShowFullText] = useState(false);

  const toggleText = () => setShowFullText(!showFullText);

  return (
    <tr className="border-t hover:bg-gray-100">
      <td className="p-4 flex items-center justify-center ">
        <div>
          <p className="text-gray-800 font-medium text-center align-middle">
            {client.name || "Unknown"}
          </p>
          <p className="text-sm text-gray-500">{client.email}</p>
        </div>
      </td>
      <td className="p-4 text-gray-600 text-center align-middle text-nowrap border">
        {client.phone}
      </td>
      <td className="p-4 text-gray-600 text-center align-middle text-nowrap border">
        {client.budget}
      </td>
      <td className="p-4 text-gray-600 align-middle border cursor-pointer">
        <Tooltip hasArrow label={client.brief_info} bg="gray.600">
          <span>{client.brief_info.slice(0, 20)}...</span>
        </Tooltip>
      </td>
      <td className="p-4 text-center align-middle border">
        <a
          href={client.website_link}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 font-medium hover:text-blue-700 text-nowrap"
        >
          Visit Website
        </a>
      </td>
    </tr>
  );
};

export default ClientList;
