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
        for (var i = 0; i < 6; i++) {
            var tr = document.createElement('tr');
            for (var j = 0; j < 7; j++) {
                var td = document.createElement('td');
                td.classList.add('day-cell'); // Added class for cell styling
                if (i === 0 && j < firstDay) {
                    td.textContent = '';
                } else if (date > days) {
                    break; // No more days in month
                } else {

                    //Manual Task Fill
                    var dateSpan = document.createElement('span');
                    dateSpan.classList.add('date-number'); // Class for the date number
                    dateSpan.textContent = date;
                    td.appendChild(dateSpan);
    
                    if (date === 1) {
                        // Automatically add tasks for the first day
                        addTask(td, "Complete UT Why US Essay");
                        addTask(td, "Outline Purdue Essays");
                    }

                    var dateSpan = document.createElement('span');
                    dateSpan.classList.add('date-number'); // Class for the date number
                    dateSpan.textContent = date;
                    td.appendChild(dateSpan);

                    // Manual Task Fill

                    var plusButton = document.createElement('button');
                    plusButton.classList.add('plus-button');
                    plusButton.textContent = '+';
                    td.appendChild(plusButton);
                    plusButton.style.position = 'absolute';
                    plusButton.style.top = '8px';
                    plusButton.style.right = '8px';
                    plusButton.addEventListener('click', function() {
                        // Create and show the text input
                        var input = document.createElement('input');
                        input.type = 'text';
                        input.style.position = 'absolute';
                        input.style.top = '5px';
                        input.style.left = '5px';
                        input.style.width = '90%'; 
                        input.style.height = '20px'; 
    
                        // Append the input and hide the plus button
                        this.parentNode.appendChild(input);
                        input.focus();
                        // this.style.display = 'none';
    
                    // Event listener for Enter key press
                    input.addEventListener('keypress', function(e) {
                        if (e.key === 'Enter') {
                            e.preventDefault(); 
                            var textSpan = document.createElement('span');
                            textSpan.textContent = this.value;
                            textSpan.classList.add('text-content'); 


                            var deleteButton = document.createElement('button');
                            deleteButton.textContent = 'X';
                            deleteButton.classList.add('delete-text');
                            deleteButton.onclick = function() {
                                this.parentNode.remove();
                            };

                            textSpan.textContent = this.value;
                            textSpan.appendChild(deleteButton);
                            
                            // Insert the new textSpan at the beginning of the parent container
                            var parentContainer = this.parentNode;
                            parentContainer.insertBefore(textSpan, parentContainer.firstChild); 
                    
                            this.value = ''; // Clear the input field
                            this.style.display = 'none'; 
                            plusButton.style.display = 'block'; // Show the plus button again

                        }

                    });
                    });
    
                    td.appendChild(plusButton);
    
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

    // Manual Task Fill
    function addTask(td, taskText) {
        var textSpan = document.createElement('span');
        textSpan.textContent = taskText;
        textSpan.classList.add('text-content');
    
        var deleteButton = document.createElement('button');
        deleteButton.textContent = 'X';
        deleteButton.classList.add('delete-text');
        deleteButton.onclick = function() {
            this.parentNode.remove();
        };
    
        textSpan.appendChild(deleteButton);
    
        // Insert the new textSpan at the beginning of the td container
        td.insertBefore(textSpan, td.firstChild);
    }
    // Manual Task Fill

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
