import { useEffect, useState } from "react";
import { blockSlot, getAdminBookings, getPrice, unblockSlot, updatePrice } from "../api";

const toDateInput = (date) => date.toISOString().split("T")[0];

const AdminPage = () => {
  const [bookings, setBookings] = useState([]);
  const [price, setPrice] = useState(1200);
  const [slotDate, setSlotDate] = useState(toDateInput(new Date()));
  const [slotTime, setSlotTime] = useState("18:00");
  const [message, setMessage] = useState("");

  const loadData = () => {
    getAdminBookings().then(setBookings);
    getPrice().then((data) => setPrice(data.price));
  };

  useEffect(() => {
    loadData();
  }, []);

  const handlePriceUpdate = async () => {
    await updatePrice(Number(price));
    setMessage("Pricing updated.");
  };

  const handleBlock = async () => {
    await blockSlot({ slotDate, slotTime: `${slotTime}:00` });
    setMessage("Slot blocked.");
  };

  const handleUnblock = async () => {
    await unblockSlot(slotDate, `${slotTime}:00`);
    setMessage("Slot unblocked.");
  };

  return (
    <main className="page-shell space-y-6">
      <h1 className="text-2xl font-bold text-white">Admin Panel</h1>
      {message && <p className="rounded-xl border border-turf-200/20 bg-turf-300/10 p-3 text-sm text-turf-100">{message}</p>}

      <section className="glass-card p-4">
        <h2 className="text-lg font-semibold text-white">Manage Pricing</h2>
        <div className="mt-3 flex gap-2">
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full rounded-xl border border-white/10 bg-white/5 p-3 text-turf-50"
          />
          <button onClick={handlePriceUpdate} className="rounded-xl bg-turf-300 px-4 py-3 font-semibold text-turf-900">
            Save
          </button>
        </div>
      </section>

      <section className="glass-card p-4">
        <h2 className="text-lg font-semibold text-white">Manage Slots</h2>
        <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-3">
          <input type="date" value={slotDate} onChange={(e) => setSlotDate(e.target.value)} className="rounded-xl border border-white/10 bg-white/5 p-3 text-turf-50" />
          <input type="time" value={slotTime} onChange={(e) => setSlotTime(e.target.value)} className="rounded-xl border border-white/10 bg-white/5 p-3 text-turf-50" />
          <div className="flex gap-2">
            <button onClick={handleBlock} className="w-1/2 rounded-xl bg-turf-300 px-4 py-3 font-semibold text-turf-900">Block</button>
            <button onClick={handleUnblock} className="w-1/2 rounded-xl border border-white/20 px-4 py-3 text-turf-100">Unblock</button>
          </div>
        </div>
      </section>

      <section className="glass-card p-4">
        <h2 className="text-lg font-semibold text-white">Bookings</h2>
        <div className="mt-3 overflow-x-auto">
          <table className="min-w-full text-left text-sm text-turf-100">
            <thead className="text-turf-200">
              <tr>
                <th className="py-2">Date</th>
                <th className="py-2">Time</th>
                <th className="py-2">Name</th>
                <th className="py-2">Phone</th>
                <th className="py-2">Price</th>
                <th className="py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking) => (
                <tr key={booking.id} className="border-t border-white/10">
                  <td className="py-2">{booking.bookingDate}</td>
                  <td className="py-2">{booking.slotTime}</td>
                  <td className="py-2">{booking.customerName}</td>
                  <td className="py-2">{booking.phone}</td>
                  <td className="py-2">Rs {booking.price}</td>
                  <td className="py-2">{booking.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
};

export default AdminPage;
