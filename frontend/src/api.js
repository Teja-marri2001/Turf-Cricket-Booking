const API_BASE = "http://localhost:8081/api";

const request = async (path, options = {}) => {
  const response = await fetch(`${API_BASE}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...options
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: "Something went wrong." }));
    throw new Error(error.message || "Request failed");
  }

  return response.json();
};

export const getSlots = (date) => request(`/bookings/slots?date=${date}`);
export const createBooking = (payload) => request("/bookings", { method: "POST", body: JSON.stringify(payload) });
export const getAdminBookings = () => request("/admin/bookings");
export const getPrice = () => request("/admin/price");
export const updatePrice = (price) => request("/admin/price", { method: "PUT", body: JSON.stringify({ price }) });
export const blockSlot = (payload) => request("/admin/blocked-slots", { method: "POST", body: JSON.stringify(payload) });
export const unblockSlot = (date, time) => request(`/admin/blocked-slots/${date}/${encodeURIComponent(time)}`, { method: "DELETE" });
