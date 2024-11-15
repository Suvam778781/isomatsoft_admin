import { Tooltip } from "@chakra-ui/react";
import React, { useState } from "react";

const ClientList = () => {
  const clients = [
    {
      name: "John Doe",
      email: "john.doe@example.com",
      phone: "+1 555-123-4567",
      budget: "$5,000 - $10,000",
      brief_info: "Looking to redesign our e-commerce website to improve user experience and increase sales.",
      website_link: "https://www.johndoestore.com",
    },
    {
      name: "Jane Smith",
      email: "jane.smith@example.com",
      phone: "+44 20 7946 0958",
      budget: "$1,000 - $3,000",
      brief_info: "Need a professional portfolio website for showcasing my photography work.",
      website_link: "https://www.janesmithphotography.com",
    },
    {
      name: "Michael Brown",
      email: "michael.brown@example.com",
      phone: "+61 3 8376 6284",
      budget: "$15,000 - $20,000",
      brief_info: "Seeking a custom CRM solution for managing customer relationships and sales.",
      website_link: "https://www.michaelbrownbusiness.com",
    },
    {
      name: "Sarah Jones",
      email: "sarah.jones@example.com",
      phone: "+91 98765 43210",
      budget: "$500 - $1,500",
      brief_info: "Need a landing page for a new product launch with lead capture functionality.",
      website_link: "https://www.sarahjonesmarketing.com",
    },
    {
      name: "David Wilson",
      email: "david.wilson@example.com",
      phone: "+81 90-1234-5678",
      budget: "$2,000 - $4,000",
      brief_info: "Looking for SEO optimization for our existing website to improve search engine rankings.",
      website_link: "https://www.wilsonconsulting.jp",
    },
  ];

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
            {clients.map((client, index) => (
              <ClientRow key={index} client={client} />
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
      <td className="p-4 flex items-center align-middle">
        <div>
          <p className="text-gray-800 font-medium">{client.name}</p>
          <p className="text-sm text-gray-500">{client.email}</p>
        </div>
      </td>
      <td className="p-4 text-gray-600 text-center align-middle text-nowrap border">{client.phone}</td>
      <td className="p-4 text-gray-600 text-center align-middle text-nowrap border">{client.budget}</td>
      <td className="p-4 text-gray-600 align-middle border cursor-pointer">
     
        {/* {showFullText ? client.brief_info : `${client.brief_info.slice(0, 20)}...`}
        <button onClick={toggleText} className="text-blue-500 font-medium ml-2 hover:text-blue-700 p-[2px]">
          {showFullText ? "See Less" : "See More"}
        </button> */}
        <Tooltip hasArrow label={client.brief_info} bg='gray.600'>
  <span> {client.brief_info.slice(0, 20)}...</span>
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
