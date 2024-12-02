
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

  data.forEach((pitch) => {
    const row = document.createElement("tr");

    innerHTML = 
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

    // Append the row to the table body
    tableBody.appendChild(row);
  });
}

// Filter data based on start and end date
function filterData(event) {
  event.preventDefault(); // Prevent form submission

  const startDate = document.getElementById("startdate").value;
  const endDate = document.getElementById("enddate").value;

  if (startDate && endDate) {
    fetchData().then((data) => {
      const filteredData = data.filter((pitch) => {
        const pitchDate = new Date(pitch.Date);
        return pitchDate >= new Date(startDate) && pitchDate <= new Date(endDate);
      });
      updateTable(filteredData);
    });
  } else {
    fetchData(); // If no dates are provided, show all data
  }
}

// Initialize the table with data when the page loads
window.onload = fetchData;
