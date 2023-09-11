// Calculate the total number of strikes
function calculateTotalStrikes(data) {
  return data.length;
}

// Calculate the average mass
function calculateAverageMass(data) {
  const masses = data
    .map((item) => parseFloat(item.mass_g))
    .filter((mass) => !isNaN(mass));
  if (masses.length === 0) return 0; // Avoid division by zero
  const totalMass = masses.reduce((sum, mass) => sum + mass, 0);
  return (totalMass / masses.length).toFixed(2); // Calculate average and round to 2 decimal places
}

// Create a year histogram and return data
function createYearHistogramData(data) {
  // Extract years from the search results
  const years = data.map((item) => item.year);

  // Count the number of strikes for each year
  const yearCounts = {};
  years.forEach((year) => {
    yearCounts[year] = (yearCounts[year] || 0) + 1;
  });

  const labels = Object.keys(yearCounts);
  const dataPoints = Object.values(yearCounts);

  return {
    labels: labels,
    data: dataPoints,
  };
}

// Function to create a composition histogram and return data
function createCompositionHistogramData(data, composition) {
  // Filter data based on the selected composition
  const filteredData = data.filter(
    (item) => item.recclass.toLowerCase() === composition.toLowerCase()
  );

  // Prepare the data for the histogram
  const bins = [0, 0, 0, 0]; // Initialize 4 bins for the histogram
  const values = filteredData.map((item) => item.mass_g);
  values.forEach((value) => {
    if (value >= 0 && value < 25) {
      bins[0]++;
    } else if (value >= 25 && value < 50) {
      bins[1]++;
    } else if (value >= 50 && value < 75) {
      bins[2]++;
    } else if (value >= 75) {
      bins[3]++;
    }
  });

  return {
    labels: ["0-24", "25-49", "50-74", "75+"],
    data: bins,
  };
}

function createCombinedChart(results) {
  // Move the entire block of code here
  // Calculate total number of strikes
  const totalStrikes = calculateTotalStrikes(results);

  // Calculate average mass
  const averageMass = calculateAverageMass(results);

  // Get the <span> elements by their IDs
  const totalStrikesSpan = document.getElementById("totalS");
  const averageMassSpan = document.getElementById("avgMass");

  // Set the innerHTML of the <span> elements
  totalStrikesSpan.innerHTML = `Total Strikes: ${totalStrikes}`;
  averageMassSpan.innerHTML = `Average Mass: ${averageMass} grams`;

  // Create year histogram data
  const yearHistogramData = createYearHistogramData(results);

  // Get selected meteorite composition from user input (e.g., compositionInput.value)
  const composition = results[0].recclass;

  // Create composition histogram data for the selected composition
  const compositionHistogramData = createCompositionHistogramData(
    results,
    composition
  );

  // Combine the data for the chart
  const chartData = {
    labels: [
      ...yearHistogramData.labels,
      ...compositionHistogramData.labels,
      "Total Strikes",
    ],
    datasets: [
      {
        label: "Number of Strikes by Year",
        data: [...yearHistogramData.data, 0, 0, 0, 0], // Add empty data for composition bins
        backgroundColor: "blue", // Adjust the color
        borderWidth: 1,
        type: "bar", // Bar chart for year histogram
      },
      {
        label: "Number of Strikes by Composition",
        data: [0, 0, 0, 0, ...compositionHistogramData.data], // Add empty data for year bins
        backgroundColor: "red", // Adjust the color
        borderWidth: 1,
        type: "bar", // Bar chart for composition histogram
      },
      // {
      //   label: "Average Mass",
      //   data: [averageMass],
      //   borderColor: "green", // Line color for average mass
      //   fill: false,
      //   type: "line", // Line chart for average mass
      // },
      // {
      //   label: "Total Strikes",
      //   data: [totalStrikes],
      //   backgroundColor: "orange",
      //   borderWidth: 1,
      //   type: "bar", // Bar chart for
      // },
    ],
  };

  // Create a combined chart
  const ctx = document.getElementById("combinedGraph").getContext("2d");
  const combinedChart = new Chart(ctx, {
    type: "bar",
    data: chartData,
    options: {
      scales: {
        x: {
          title: {
            display: true,
            text: "Metric",
          },
        },
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: "Value",
          },
        },
      },
    },
  });
}

export { createCombinedChart };
