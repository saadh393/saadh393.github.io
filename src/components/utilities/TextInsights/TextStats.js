export default function TextStats({ stats }) {
  const formatFileSize = (bytes) => {
    if (bytes < 1024) return `${bytes} Bytes`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(2)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  };

  const stats_data = [
    {
      label: "Text Length",
      value: stats.length,
      color: "primary",
      suffix: "Char"
    },
    {
      label: "Lines",
      value: stats.lines,
      color: "secondary"
    },
    {
      label: "Numbers",
      value: stats.numbers,
      color: "trinary"
    },
    {
      label: "Capital Letters",
      value: stats.capitalLetters,
      color: "primary"
    },
    {
      label: "File Size",
      value: formatFileSize(stats.bytes),
      color: "secondary"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
      {stats_data.map((stat, index) => (
        <div key={index} className="stats-card">
          <p className={`stats-card-label text-${stat.color}`}>{stat.label}</p>
          <p className="stats-card-value">
            {stat.value}
            {stat.suffix && <span className="stats-card-suffix">{stat.suffix}</span>}
          </p>
        </div>
      ))}
    </div>
  );
}