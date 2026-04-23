import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createBooking } from "../api";

const CheckoutPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({ customerName: "", phone: "" });

  const draft = useMemo(() => {
    const data = localStorage.getItem("bookingDraft");
    return data ? JSON.parse(data) : null;
  }, []);

  useEffect(() => {
    if (!draft?.bookingDate || !draft?.slotTime) {
      navigate("/book");
    }
  }, [draft, navigate]);

  const handlePay = async () => {
    if (!form.customerName.trim() || !/^\d{10}$/.test(form.phone)) {
      setError("Enter valid name and 10-digit phone number.");
      return;
    }

    try {
      setLoading(true);
      setError("");
      const response = await createBooking({
        bookingDate: draft.bookingDate,
        slotId: draft.slotId,  // ✅ FIX HERE
        name: form.customerName.trim(),
        phone: form.phone.trim()
      });

      localStorage.setItem(
        "bookingConfirmation",
        JSON.stringify({
          bookingId: response.bookingId,
          message: response.message,
          bookingDate: draft.bookingDate,
          //slotTime: draft.slotTime,
          slotId: draft.slotId,   // ✅ CORRECT
          customerName: form.customerName.trim(),
          phone: form.phone.trim(),
          amount: draft.price
        })
      );
      navigate("/confirmation");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (!draft) {
    return null;
  }

  return (
    <main className="page-shell">
      <section className="glass-card p-5 sm:p-6">
        <h1 className="text-2xl font-bold text-white">Checkout</h1>

        <div className="mt-4 rounded-2xl border border-white/10 bg-black/20 p-4 text-sm text-turf-100">
          <p><span className="text-turf-200">Date:</span> {draft.bookingDate}</p>
          <p className="mt-1"><span className="text-turf-200">Time:</span> {draft.slotTime?.time}</p>
          <p className="mt-1"><span className="text-turf-200">Amount:</span> Rs {draft.price}</p>
        </div>

        <div className="mt-4 space-y-3">
          <div>
            <label className="mb-1 block text-sm text-turf-100">Name</label>
            <input
              type="text"
              value={form.customerName}
              onChange={(e) => setForm((prev) => ({ ...prev, customerName: e.target.value }))}
              className="w-full rounded-xl border border-white/10 bg-white/5 p-3 text-turf-50 outline-none focus:border-turf-300"
              placeholder="Enter your full name"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm text-turf-100">Phone</label>
            <input
              type="tel"
              value={form.phone}
              onChange={(e) => setForm((prev) => ({ ...prev, phone: e.target.value }))}
              className="w-full rounded-xl border border-white/10 bg-white/5 p-3 text-turf-50 outline-none focus:border-turf-300"
              placeholder="Enter 10-digit mobile number"
            />
          </div>
        </div>

        {error && <p className="mt-4 rounded-xl border border-red-300/20 bg-red-500/10 p-3 text-sm text-red-200">{error}</p>}

        <button
          type="button"
          onClick={handlePay}
          disabled={loading}
          className="mt-5 w-full rounded-xl bg-turf-300 px-4 py-3 font-semibold text-turf-900 shadow-soft hover:scale-[1.01] disabled:opacity-60"
        >
          {loading ? "Processing Payment..." : "Pay & Confirm Booking"}
        </button>
      </section>
    </main>
  );
};

export default CheckoutPage;
