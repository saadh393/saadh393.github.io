export default function SelectionPopup({ selection }) {
  if (!selection.show) return null;

  return (
    <div 
      className="selection-popup fixed bg-primary text-black px-4 py-2 rounded-lg text-sm pointer-events-none flex items-center gap-2 shadow-lg"
      style={{ 
        left: selection.x,
        top: selection.y
      }}
    >
      <span className="font-mono">{selection.length}</span>
      <span className="text-black/70">characters selected</span>
    </div>
  );
}