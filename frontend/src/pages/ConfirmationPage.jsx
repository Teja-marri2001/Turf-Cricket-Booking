import { useEffect, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";

const ConfirmationPage = () => {
  const navigate = useNavigate();

  const details = useMemo(() => {
    const saved = localStorage.getItem("bookingConfirmation");
    return saved ? JSON.parse(saved) : null;
  }, []);

  useEffect(() => {
    if (!details) {
      navigate("/book");
    }
  }, [details, navigate]);

  if (!details) {
  return <p className="text-white p-4">No booking found</p>;
}

  return (
    <main className="page-shell">
      <section className="glass-card p-6 text-center sm:p-8">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-500/20 text-3xl text-green-400">?</div>
        <h1 className="mt-4 text-3xl font-bold text-white">Booking Confirmed</h1>
        <p className="mt-2 text-sm text-turf-100/80">{details.message || "Your slot has been successfully booked!"}</p>

        <div className="mx-auto mt-5 max-w-md rounded-2xl border border-white/10 bg-black/20 p-4 text-left text-sm text-turf-100">
          <p><span className="text-turf-200">Booking ID:</span> #{details.bookingId}</p>
          <p className="mt-1"><span className="text-turf-200">Date:</span> {details.bookingDate}</p>
          <p className="mt-1"><span className="text-turf-200">Time:</span> {details.slotTime?.time || details.slotTime}</p>
          <p className="mt-1"><span className="text-turf-200">Name:</span> {details.customerName}</p>
          <p className="mt-1"><span className="text-turf-200">Phone:</span> {details.phone}</p>
          <p className="mt-1"><span className="text-turf-200">Amount:</span> Rs {details.amount}</p>
        </div>

        <Link
          to="/book"
          onClick={() => {
            localStorage.removeItem("bookingDraft");
            localStorage.removeItem("bookingConfirmation");
          }}
          className="mt-6 inline-flex rounded-xl bg-turf-300 px-6 py-3 font-semibold text-turf-900 shadow-soft hover:scale-[1.01]"
        >
          Book Another Slot
        </Link>
      </section>
    </main>
  );
};

export default ConfirmationPage;
