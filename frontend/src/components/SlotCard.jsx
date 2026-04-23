const SlotCard = ({ time, available, selected, onClick }) => {
  const classes = [
    "w-full rounded-2xl border p-4 text-left",
    "transition duration-200 active:scale-[0.98]",
    selected
      ? "border-turf-300 bg-turf-300/20 text-turf-100 shadow-glow"
      : "border-white/10 bg-white/5 text-turf-50 shadow-soft",
    !available ? "cursor-not-allowed bg-white/5 text-white/40 opacity-70" : "hover:-translate-y-0.5 hover:border-turf-200"
  ].join(" ");

  return (
    <button className={classes} onClick={onClick} disabled={!available}>
      <p className="text-base font-semibold">{time}</p>
      <p className="mt-1 text-xs uppercase tracking-wide">{available ? "Available" : "Booked"}</p>
    </button>
  );
};

export default SlotCard;
