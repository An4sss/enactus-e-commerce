"use client";

import { useState, useEffect } from "react";

const ProductForm = () => {
  const [product, setProduct] = useState({
    id: null, // For updates
    name: "",
    price: "",
    description: "",
  });
  const [products, setProducts] = useState<any[]>([]);
  const [isEditMode, setIsEditMode] = useState(false);

  const fetchProducts = async () => {
    const token = localStorage.getItem("yourTokenKey");
    const response = await fetch("/api/products", {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`,
      },
    });

    if (response.ok) {
      const data = await response.json();
      setProducts(data || []);
    } else {
      console.error("Failed to fetch products:", response.statusText);
      setProducts([]);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleInputChange = (e: { target: any }) => {
    const { name, value } = e.target;
    setProduct({
      ...product,
      [name]: value,
    });
  };

  const createProduct = async (formData: FormData) => {
    const token = localStorage.getItem("yourTokenKey");
    const response = await fetch("/api/products", {
      method: "POST",
      body: formData,
      headers: {
        "Authorization": `Bearer ${token}`,
      },
    });

    return response;
  };

  const updateProduct = async (productData: any) => {
    const token = localStorage.getItem("yourTokenKey");
    const response = await fetch(`/api/products`, {
      method: "PUT",
      body: JSON.stringify(productData),
      headers: {
        "Content-Type": "application/json", // Set content type to JSON
        "Authorization": `Bearer ${token}`,
      },
    });

    return response;
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const formData = new FormData();
    if (e.target.file.files) {
      Object.values(e.target.file.files).forEach((file) => {
        formData.append("file", file as File);
      });
    }
    
    // Append product data for creation
    formData.append("name", product.name);
    formData.append("price", product.price);
    formData.append("description", product.description);

    let response;
    if (isEditMode) {
      // Use JSON for updating the product
      const productData = {
        id: product.id,
        name: product.name,
        price: product.price,
        description: product.description,
      };
      response = await updateProduct(productData);
    } else {
      response = await createProduct(formData);
    }

    const result = await response.json();
    if (response.ok) {
      alert(isEditMode ? "Product updated" : "Product created");
      fetchProducts();
      resetForm();
    } else {
      alert(`Operation failed: ${result.message || "Unknown error"}`);
    }
  };

  const handleEdit = (productToEdit: any) => {
    setProduct({
      id: productToEdit._id,
      name: productToEdit.name,
      price: productToEdit.price,
      description: productToEdit.description,
    });
    setIsEditMode(true);
  };

  const handleDelete = async (productId: any) => {
    const token = localStorage.getItem("yourTokenKey");

    const response = await fetch(`/api/products`, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify({ id: productId }),
    });

    if (response.ok) {
      alert("Product deleted");
      fetchProducts();
    } else {
      const result = await response.json();
      alert(`Delete failed: ${result.message || "Unknown error"}`);
    }
  };

  const resetForm = () => {
    setProduct({
      id: null,
      name: "",
      price: "",
      description: "",
    });
    setIsEditMode(false);
  };

  return (
    <div className="max-w-xl mx-auto p-5 bg-white shadow-md rounded-md">
      <h1 className="text-xl font-bold mb-4">{isEditMode ? "Edit Product" : "Create Product"}</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Product Name:
            <input
              type="text"
              name="name"
              value={product.name}
              onChange={handleInputChange}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-500"
            />
          </label>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Price:
            <input
              type="number"
              name="price"
              value={product.price}
              onChange={handleInputChange}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-500"
            />
          </label>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Description:
            <textarea
              name="description"
              value={product.description}
              onChange={handleInputChange}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-500"
            />
          </label>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Upload File:
            <input type="file" name="file" multiple className="mt-1 block w-full" />
          </label>
        </div>
        <div className="flex justify-between mt-4">
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white font-bold py-2 rounded-md hover:bg-indigo-500 transition duration-300"
          >
            {isEditMode ? "Update Product" : "Create Product"}
          </button>
          {isEditMode && (
            <button
              type="button"
              onClick={resetForm}
              className="ml-2 w-full bg-gray-300 text-gray-700 font-bold py-2 rounded-md hover:bg-gray-200 transition duration-300"
            >
              Cancel Edit
            </button>
          )}
        </div>
      </form>

      <div className="mt-6">
        <h3 className="text-lg font-bold mb-2">Product List</h3>
        <ul className="divide-y divide-gray-200">
          {products.length > 0 ? (
            products.map((p) => (
              <li key={p.id} className="py-2 flex justify-between items-center">
                <div>
                  <strong>{p.name}</strong> - ${p.price} - {p.description}
                </div>
                <div>
                  <button
                    onClick={() => handleEdit(p)}
                    className="text-indigo-600 hover:text-indigo-500 font-medium"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(p._id)}
                    className="ml-2 text-red-600 hover:text-red-500 font-medium"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))
          ) : (
            <li className="py-2">No products found</li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default ProductForm;
