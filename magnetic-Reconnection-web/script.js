// Function to create and populate a select element
function createAndPopulateSelect(id, options) {
  var selectElement = document.createElement("select");
  selectElement.id = id;

  options.forEach(function (optionText, index) {
    var option = document.createElement("option");
    option.value = index + 1;
    option.text = optionText;
    selectElement.appendChild(option);
  });

  selectElement.style.cssFloat = "left";
  document.body.appendChild(selectElement);

  return selectElement;
}

// Function to create an input element
function createInput(id, placeholder) {
  var inputElement = document.createElement("input");
  inputElement.id = id;
  inputElement.type = "number";
  inputElement.placeholder = placeholder;
  inputElement.min = 1;
  inputElement.max = 366; // Maximum number of days in a leap year

  inputElement.style.cssFloat = "left";
  document.body.appendChild(inputElement);

  return inputElement;
}

// Array for years (2019 - 2023)
var years = Array.from({ length: 5 }, (_, i) => (2019 + i).toString());

// Create and populate year select element
var yearSelect = createAndPopulateSelect("yearSelect", years);

// Create input elements for month and day
var monthInput = createInput("monthInput", "Month");
var dayInput = createInput("dayInput", "Day");

// Variable to store the calculated day of the year
var calculatedDayOfYear = null;

// Function to calculate the day of the year
function calculateDayOfYear() {
  var selectedYear = parseInt(yearSelect.value, 10);
  var selectedMonth = parseInt(monthInput.value, 10);
  var selectedDay = parseInt(dayInput.value, 10);

  var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  // Check for leap year and adjust February's days
  if ((selectedYear % 4 === 0 && selectedYear % 100 !== 0) || (selectedYear % 400 === 0)) {
    daysInMonth[1] = 29; // Leap year, so February has 29 days
  }

  // Validate the input
  if (isNaN(selectedDay) || selectedDay < 1 || selectedDay > 366) {
    alert("Please enter a valid day of the year.");
    return;
  }

  // Calculate the day of the year
  var dayOfYear = selectedDay;
  for (var i = 0; i < selectedMonth - 1; i++) {
    dayOfYear += daysInMonth[i];
  }

  // Store the calculated day of the year in the variable
  calculatedDayOfYear = dayOfYear;
}

// Create and append a button for calculation
var calculateButton = document.createElement("button");
calculateButton.textContent = "View Graphs";
calculateButton.addEventListener("click", calculateDayOfYear);
document.body.appendChild(calculateButton);

// Create a div container for inputs and button
var inputContainer = document.createElement("div");
inputContainer.id = "input-container";
document.body.appendChild(inputContainer);

// Append input elements to the container
inputContainer.appendChild(yearSelect);
inputContainer.appendChild(monthInput);
inputContainer.appendChild(dayInput);

// Append the "View Graphs" button to the container
inputContainer.appendChild(calculateButton);

// Assume we have data like this:
var data = {
  dayInput,
};

// Extract the dates and levels into separate arrays
var dates = Object.keys(data);
var levels = Object.values(data);

// Calculate the total of the levels
var total = levels.reduce((a, b) => a + b, 0);

// Convert each level to a percentage of the total
var percentages = levels.map(level => (level / total) * 100);

calculateButton.addEventListener('click', function() {
  calculateDayOfYear();
  var ctx = document.getElementById('canvas').getContext('2d');

  // Create the chart
  var chart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: Array.from({length: 24}, (_, i) => i + 1), // Numbers from 1 to 24
      datasets: [{
        label: 'Magnetic Reconnection Level (%)',
        data: percentages,  // Use percentages instead of levels
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        borderColor: 'rgba(255, 255, 255, 1)',
        borderWidth: 1,
        fill: false,
      }]
    },
    options: {
      scales: {
        x: {
          beginAtZero: true,
          ticks: {
            color: 'white' // Set x-axis tick color to white
          }
        },
        y: {
          beginAtZero: true,
          ticks: {
            color: 'white' // Set y-axis tick color to white
          }
        }
      },
      plugins: {
        legend: {
          labels: {
            color: 'white' // Set legend text color to white
          }
        }
      }
    }
  });
});

// if else statements that add to the number of days
if (yearSelect.value == "2019" || yearSelect.value == "2021" || yearSelect.value == "2022" || yearSelect.value == "2023") {
  if (monthInput.value == "2") {
    dayInput.value = parseInt(dayInput.value, 10) + 31;
  } else if (monthInput.value == "3") {
    dayInput.value = parseInt(dayInput.value, 10) + 59;
  } else if (monthInput.value == "4") {
    dayInput.value = parseInt(dayInput.value, 10) + 90;
  } else if (monthInput.value == "5") {
    dayInput.value = parseInt(dayInput.value, 10) + 120;
  } else if (monthInput.value == "6") {
    dayInput.value = parseInt(dayInput.value, 10) + 151;
  } else if (monthInput.value == "7") {
    dayInput.value = parseInt(dayInput.value, 10) + 181;
  } else if (monthInput.value == "8") {
    dayInput.value = parseInt(dayInput.value, 10) + 212;
  } else if (monthInput.value == "9") {
    dayInput.value = parseInt(dayInput.value, 10) + 243;
  } else if (monthInput.value == "10") {
    dayInput.value = parseInt(dayInput.value, 10) + 273;
  } else if (monthInput.value == "11") {
    dayInput.value = parseInt(dayInput.value, 10) + 304;
  } else if (monthInput.value == "12") {
    dayInput.value = parseInt(dayInput.value, 10) + 334;
  }
}

if (yearSelect.value == "2020") {
  if (monthInput.value == "2") {
    dayInput.value = parseInt(dayInput.value, 10) + 31;
  } else if (monthInput.value == "3") {
    dayInput.value = parseInt(dayInput.value, 10) + 60;
  } else if (monthInput.value == "4") {
    dayInput.value = parseInt(dayInput.value, 10) + 91;
  } else if (monthInput.value == "5") {
    dayInput.value = parseInt(dayInput.value, 10) + 121;
  } else if (monthInput.value == "6") {
    dayInput.value = parseInt(dayInput.value, 10) + 152;
  } else if (monthInput.value == "7") {
    dayInput.value = parseInt(dayInput.value, 10) + 183;
  } else if (monthInput.value == "8") {
    dayInput.value = parseInt(dayInput.value, 10) + 213;
  } else if (monthInput.value == "9") {
    dayInput.value = parseInt(dayInput.value, 10) + 244;
  } else if (monthInput.value == "10") {
    dayInput.value = parseInt(dayInput.value, 10) + 274;
  } else if (monthInput.value == "11") {
    dayInput.value = parseInt(dayInput.value, 10) + 305;
  } else if (monthInput.value == "12") {
    dayInput.value = parseInt(dayInput.value, 10) + 335;
  }
}
