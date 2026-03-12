/**
 * Converts an array of objects to a CSV string and triggers a download.
 * @param data Array of objects to export
 * @param filename Desired filename for the download
 */
export const exportToCSV = (data: any[], filename: string) => {
  if (!data || data.length === 0) return;

  // Extract headers
  const headers = Object.keys(data[0]);
  const csvRows = [];

  // Add header row
  csvRows.push(headers.join(","));

  // Add data rows
  for (const row of data) {
    const values = headers.map((header) => {
      const val = row[header];
      // Escape commas and quotes
      const escaped = ("" + val).replace(/"/g, '\\"');
      return `"${escaped}"`;
    });
    csvRows.push(values.join(","));
  }

  // Create blob and download
  const csvString = csvRows.join("\n");
  const blob = new Blob([csvString], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("download", `${filename}.csv`);
  link.style.visibility = "hidden";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
