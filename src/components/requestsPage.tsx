"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; // Correct import for the App Router

interface IRequest {
  _id: string;
  userId: { _id: string; name: string };
  productId: { _id: string; name: string };
  status: "pending" | "completed";
}

const RequestsPage = () => {
  const [requests, setRequests] = useState<IRequest[]>([]);
  const [selectedRequest, setSelectedRequest] = useState<IRequest | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("yourTokenKey");
    if (!token) {
      router.push("/login");
    } else {
      fetchRequests(token);
    }
  }, []);

  const fetchRequests = async (token: string) => {
    try {
      setLoading(true);
      const res = await fetch("/api/adminReq", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.status === 401 || res.status === 403) {
        router.push("/login");
      }
      const data = await res.json();
      setRequests(data);
    } catch (error) {
      setError("Error fetching requests");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async () => {
    if (!selectedRequest) return;
    const token = localStorage.getItem("yourTokenKey");
    if (!token) return;

    try {
      setLoading(true);
      const res = await fetch("/api/adminReq", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          id: selectedRequest._id,
          status: selectedRequest.status,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        alert("Request updated successfully");
        fetchRequests(token);
        setSelectedRequest(null);
      } else {
        setError(data.message || "Error updating request");
      }
    } catch (error) {
      setError("Error updating request");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (_id: string) => {
    const token = localStorage.getItem("yourTokenKey");
    if (!token) return;

    try {
      setLoading(true);
      const res = await fetch("/api/adminReq", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ id: _id }),
      });

      const data = await res.json();
      if (res.ok) {
        alert("Request deleted successfully");
        fetchRequests(token);
      } else {
        setError(data.message || "Error deleting request");
      }
    } catch (error) {
      setError("Error deleting request");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto font-sans w-4/5">
      <h1 className="text-2xl text-center my-5 text-gray-800">Admin Dashboard</h1>
      {error && <p className="text-red-500 text-center">{error}</p>}
      {loading ? (
        <p className="text-lg text-center">Loading...</p>
      ) : (
        <ul className="list-none p-0">
          {requests.map((request) => (
            <li key={request._id} className="bg-gray-100 p-4 my-2 rounded-lg shadow-md">
              <strong>{request?.productId?.name}</strong>
              <p>Status: {request.status}</p>
              <p>Requested by: {request?.userId?.name}</p>
              <button
                className="bg-red-600 text-white py-2 px-4 rounded mr-2 cursor-pointer"
                onClick={() => handleDelete(request._id)}
              >
                Delete
              </button>
              <button
                className="bg-blue-600 text-white py-2 px-4 rounded cursor-pointer"
                onClick={() => setSelectedRequest(request)}
              >
                Update
              </button>
            </li>
          ))}
        </ul>
      )}
      {selectedRequest && (
        <div className="mt-5 p-5 bg-gray-200 rounded-lg shadow-md">
          <h2 className="text-xl mb-2">Update Request</h2>
          <select
            value={selectedRequest.status}
            onChange={(e) =>
              setSelectedRequest({
                ...selectedRequest,
                status: e.target.value as "pending" | "completed",
              })
            }
            className="p-2 mb-4 w-full rounded"
          >
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
          </select>
          <button
            className="bg-green-600 text-white py-2 px-4 rounded cursor-pointer"
            onClick={handleUpdate}
          >
            Submit Update
          </button>
        </div>
      )}
    </div>
  );
};

export default RequestsPage;
