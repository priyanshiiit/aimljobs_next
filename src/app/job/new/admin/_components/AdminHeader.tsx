"use client";

import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import toast from "react-hot-toast";

export function AdminHeader() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      // Call the server-side logout endpoint
      const response = await fetch("/api/admin/verify", {
        method: "DELETE",
      });

      if (response.ok) {
        // Also remove the client-side cookie for immediate UI update
        Cookies.remove("admin_auth");
        toast.success("Logged out successfully");
        router.push("/job/new/admin/login");
      } else {
        toast.error("Logout failed");
      }
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Logout failed");
    }
  };

  return (
    <div className="flex justify-between items-center mb-8 pb-4 border-b">
      <h1 className="text-3xl font-bold">Admin Dashboard</h1>
      <div className="flex gap-4">
        <button
          onClick={() => router.push("/job/new/admin")}
          className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-purple transition-colors"
        >
          Create Job
        </button>
        <button
          onClick={handleLogout}
          className="px-4 py-2 text-sm font-medium text-red-600 hover:text-red-800 transition-colors"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
