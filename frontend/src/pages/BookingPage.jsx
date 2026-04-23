import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getPrice, getSlots } from "../api";
import SlotCard from "../components/SlotCard";

const toDateInput = (date) => date.toISOString().split("T")[0];

const BookingPage = () => {
  const navigate = useNavigate();
  const [date, setDate] = useState(toDateInput(new Date()));
  const [slots, setSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);    //null
  const [price, setPrice] = useState(1200);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    getPrice().then((data) => setPrice(data.price)).catch(() => setPrice(1200));
  }, []);

  useEffect(() => {
    setLoading(true);
    setError("");
    setSelectedSlot(null);
    
    getSlots(date)
      .then((data) => setSlots(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [date]);

  const proceedToCheckout = () => {
    if (!selectedSlot || !selectedSlot.id) {
      setError("Select a slot to continue.");
      return;
    }

    localStorage.setItem(
      "bookingDraft",
      JSON.stringify({
        bookingDate: date,
        slotId: selectedSlot.id,     // 🔥 IMPORTANT
        slotTime: selectedSlot.time,
        price
      })
    );
    navigate("/checkout");
  };

  return (
    <main className="page-shell">
      <section className="glass-card p-5 sm:p-6">
        <div className="flex items-center justify-between gap-3">
          <h1 className="text-2xl font-bold text-white">Choose Your Slot</h1>
          <span className="rounded-full bg-turf-300/20 px-3 py-1 text-xs font-semibold text-turf-100">Rs {price} / slot</span>
        </div>

        <div className="mt-4 rounded-2xl border border-white/10 bg-black/20 p-4">
          <label className="mb-2 block text-sm font-medium text-turf-100">Select Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full rounded-xl border border-white/10 bg-white/5 p-3 text-turf-50 outline-none focus:border-turf-300"
          />
        </div>

        {error && <p className="mt-4 rounded-xl border border-red-300/20 bg-red-500/10 p-3 text-sm text-red-200">{error}</p>}

        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
  {loading ? (
    <p>Loading...</p>
  ) : (
    slots.map((slot, index) => (
      <SlotCard
        key={slot.id || index}
        time={slot.time ? slot.time : "No Time"}   // 🔥 FORCE SHOW
        available={slot.booked === false}          // 🔥 FIX
        selected={selectedSlot?.id === slot.id}    // 🔥 FIX
        onClick={() => {
          console.log("CLICKED SLOT:", slot);      // DEBUG
          setSelectedSlot(slot);
        }}
      />
    ))
  )}
</div>

        <button
          type="button"
          onClick={proceedToCheckout}
          className="mt-5 w-full rounded-xl bg-turf-300 px-4 py-3 font-semibold text-turf-900 shadow-soft hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-50"
          disabled={loading}
        >
          Continue to Checkout
        </button>
      </section>
    </main>
  );
};

export default BookingPage;
