document.addEventListener('DOMContentLoaded', function() {
    var monthYearDisplay = document.getElementById('month-year');
    var prevMonthButton = document.getElementById('prev-month');
    var nextMonthButton = document.getElementById('next-month');
    var currentDate = new Date();
    var currentMonth = currentDate.getMonth();
    var currentYear = currentDate.getFullYear();

    const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    function createCalendar(month, year) {
        var firstDay = new Date(year, month).getDay();
        var days = daysInMonth[month];

        var tbody = document.querySelector('#calendar tbody');
        tbody.innerHTML = ''; // Clear previous calendar cells

        monthYearDisplay.textContent = months[month] + ' ' + year; // Set the month and year header

        var date = 1;
        for (var i = 0; i < 6; i++) { // Calendar can have a maximum of 6 rows
            var tr = document.createElement('tr');
            for (var j = 0; j < 7; j++) {
                var td = document.createElement('td');
                if (i === 0 && j < firstDay) {
                    td.textContent = '';
                } else if (date > days) {
                    break; // No more days in month
                } else {
                    td.textContent = date;
                    date++;
                }
                tr.appendChild(td);
            }
            tbody.appendChild(tr);
            if (date > days) {
                break; // All days have been added
            }
        }
    }

    prevMonthButton.addEventListener('click', function() {
        if (currentMonth === 0) {
            currentMonth = 11;
            currentYear--;
        } else {
            currentMonth--;
        }
        createCalendar(currentMonth, currentYear);
    });

    nextMonthButton.addEventListener('click', function() {
        if (currentMonth === 11) {
            currentMonth = 0;
            currentYear++;
        } else {
            currentMonth++;
        }
        createCalendar(currentMonth, currentYear);
    });

    createCalendar(currentMonth, currentYear); // Initial call to display the current month
});
