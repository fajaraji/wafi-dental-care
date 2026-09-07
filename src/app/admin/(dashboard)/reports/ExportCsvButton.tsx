"use client";

export default function ExportCsvButton() {
  const onExport = () => {
    window.location.href = "/api/admin/reports/export";
  };

  return (
    <button
      onClick={onExport}
      className="rounded-xl bg-white border border-gray-200 px-5 py-2.5 text-sm font-semibold text-text-primary shadow-sm hover:bg-gray-50 transition-colors"
    >
      ⬇ Export CSV
    </button>
  );
}
