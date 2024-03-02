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
                    var dateSpan = document.createElement('span');
                    dateSpan.classList.add('date-number'); // Class for the date number
                    dateSpan.textContent = date;
                    td.appendChild(dateSpan);

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
                            //INITIAL TASKS FOR MVP
                            // Predefined tasks for the first three days
                            const initialTasks = {
                                1: "Finish UT Why Us Essay",
                                2: "Start outlining A&M Essays",
                                3: "Finish 2 A&M Essays"
                            };

                            // Check if the date is 1, 2, or 3, and add the initial task
                            if (date in initialTasks) {
                                // Create the span for the task text
                                var taskSpan = document.createElement('span');
                                taskSpan.textContent = initialTasks[date];
                                taskSpan.classList.add('task-text'); // Add a class for styling the task text

                                // Optionally, you can create a delete button for the task
                                var deleteTaskButton = document.createElement('button');
                                deleteTaskButton.textContent = 'X';
                                deleteTaskButton.classList.add('delete-task');
                                deleteTaskButton.onclick = function() {
                                    this.parentNode.remove();
                                };

                                // Append the delete button to the task span
                                taskSpan.appendChild(deleteTaskButton);

                                // Insert the task at the beginning of the cell
                                td.insertBefore(taskSpan, td.firstChild);
                            }
                                //INITIAL TASKS FOR MVP

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
