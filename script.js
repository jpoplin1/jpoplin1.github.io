async function fetchData() {
  try {
    const response = await fetch("https://compute.samford.edu/zohauth/clients/datajson/1");
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    updateTable(data);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

function updateTable(data) {
  const tableBody = document.getElementById("pitchTableBody");
  tableBody.innerHTML = ""; // Clear any existing rows

  // Save the pitch data as rows in the table
  data.forEach((pitch) => {
    const row = document.createElement("tr");
    row.dataset.date = pitch.Date; // Save the pitch date in a data attribute

    row.innerHTML = `
      <td><a href="details.html?pitch=${pitch.PitchNo}">Pitch ${pitch.PitchNo}</a></td>
      <td>${pitch.Date}</td>
      <td>${pitch.Time}</td>
      <td>${pitch.Batter}</td>
      <td>${pitch.Balls}</td>
      <td>${pitch.Strikes}</td>
      <td>${pitch.Outs}</td>
      <td>${pitch.PitchCall}</td>
      <td>${pitch.KorBB}</td>
      <td>${pitch.RelSpeed}</td>
      <td>${pitch.SpinRate}</td>
      <td>${pitch.SpinAxis}</td>
    `;

    tableBody.appendChild(row);
  });
}

// Filter data based on start and end date
function filterData(event) {
  event.preventDefault(); // Prevent form submission

  const startDate = document.getElementById("startdate").value;
  const endDate = document.getElementById("enddate").value;

  const tableBody = document.getElementById("pitchTableBody");
  const rows = tableBody.getElementsByTagName("tr"); // Get all rows in the table body

  for (let i = 0; i < rows.length; i++) {
    const row = rows[i];
    const rowDate = new Date(row.dataset.date);

    // Check if the row date is within the selected range
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);

      // If the row date is outside the range, hide the row
      if (rowDate < start || rowDate > end) {
        row.style.display = "none";
      } else {
        row.style.display = ""; // Show the row if it's within the range
      }
    } else {
      // If no dates are provided, show all rows
      row.style.display = "";
    }
  }
}

// Initialize the table with data when the page loads
window.onload = fetchData;
