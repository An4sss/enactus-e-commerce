"use client";
import { useState } from "react";
import  RequestsPage  from "@/components/requestsPage";
import ProductForm from "@/components/productsPage";
const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState<"dashboard" | "productForm">("dashboard");

  const toggleTab = () => {
    setActiveTab((prev) => (prev === "dashboard" ? "productForm" : "dashboard"));
  };

  return (
    <div className="container mx-auto font-sans w-4/5">
      <h1 className="text-2xl text-center my-5 text-gray-800">Admin Panel</h1>
      
      <div className="flex justify-center mb-4">
        <button
          onClick={toggleTab}
          className="bg-indigo-600 text-white py-2 px-4 rounded mr-2"
        >
          {activeTab === "dashboard" ? "Go to Product Form" : "Go to Requests Form"}
        </button>
      </div>

      {activeTab === "dashboard" ? <RequestsPage /> : <ProductForm />}
    </div>
  );
};

export default AdminPanel;
