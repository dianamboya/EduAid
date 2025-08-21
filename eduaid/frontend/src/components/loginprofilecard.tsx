import React from "react";
import { useAuth } from "../contexts/AuthContext";

export default function LoginProfileCard() {
  const { user, logout } = useAuth();

  if (!user) {
    return (
      <div className="p-6 rounded-2xl border bg-white shadow text-center">
        <p className="text-gray-600">You are not logged in.</p>
      </div>
    );
  }

  return (
    <div className="p-6 rounded-2xl border bg-white shadow">
      <div className="mb-4">
        <h2 className="text-xl font-semibold">Welcome, {user.name}</h2>
        <p className="text-sm text-gray-600">{user.email}</p>
      </div>

      <div className="rounded-xl p-4 bg-gray-50 border mb-4">
        <div className="text-sm text-gray-700">
          <span className="font-medium">Role:</span> {user.role}
        </div>
        {user.createdAt && (
          <div className="text-xs text-gray-600">
            Created: {new Date(user.createdAt).toLocaleString()}
          </div>
        )}
        {user.lastLogin && (
          <div className="text-xs text-gray-600">
            Last Login: {new Date(user.lastLogin).toLocaleString()}
          </div>
        )}
      </div>

      <button
        onClick={logout}
        className="px-4 py-2 rounded-2xl bg-gray-200 hover:bg-gray-300"
      >
        Logout
      </button>
    </div>
  );
}
