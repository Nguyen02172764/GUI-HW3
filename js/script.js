/*
File: script.js
GUI Assignment: Create a interactive dynamic table
Name: Andrew Nguyen
Email: Andrew_Nguyen4@student.uml.edu
Description: Reading user input, validating the values, and dynamically creating a multiplication table.
*/
document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("tableForm");
    const errorMessages = document.getElementById("errorMessages");
    const tableContainer = document.getElementById("tableContainer");
/*
Runs when user clicks the generate table button. Prevents page from refreshing, clears old messages/tables, reads the form values, validates them, and creates the table if valid.
*/
    form.addEventListener("submit", function (event) {
        event.preventDefault();

        errorMessages.innerHTML = "";
        tableContainer.innerHTML = "";

        const minCol = Number(document.getElementById("minCol").value);
        const maxCol = Number(document.getElementById("maxCol").value);
        const minRow = Number(document.getElementById("minRow").value);
        const maxRow = Number(document.getElementById("maxRow").value);

        const errors = validateInput(minCol, maxCol, minRow, maxRow);

        if (errors.length > 0) {
            displayErrors(errors);
            return;
        }

        generateTable(minCol, maxCol, minRow, maxRow);
    });
/*
Checks the user's input before creating table. It prevents invalid ranges, non whole numbers, and values outside -50 to 50.
*/
    function validateInput(minCol, maxCol, minRow, maxRow) {
        const errors = [];

        if (!Number.isInteger(minCol) || !Number.isInteger(maxCol) ||
            !Number.isInteger(minRow) || !Number.isInteger(maxRow)) {
            errors.push("All values must be whole numbers.");
        }

        if (minCol < -50 || maxCol > 50 || minRow < -50 || maxRow > 50) {
            errors.push("All values must be between -50 and 50.");
        }

        if (minCol > maxCol) {
            errors.push("Minimum column value cannot be greater than maximum column value.");
        }

        if (minRow > maxRow) {
            errors.push("Minimum row value cannot be greater than maximum row value.");
        }

        return errors;
    }
/*
Displays validation errors on the page. Avoids popup windows and gives the user feedback.
*/
    function displayErrors(errors) {
        const ul = document.createElement("ul");

        errors.forEach(function (error) {
            const li = document.createElement("li");
            li.textContent = error;
            ul.appendChild(li);
        });

        errorMessages.appendChild(ul);
    }
/*
Builds the multiplication table dynamically, the top row contains column values, the left column contains row values, and each inside cell contains row multiplied by the column.
*/
    function generateTable(minCol, maxCol, minRow, maxRow) {
        const table = document.createElement("table");
        const thead = document.createElement("thead");
        const tbody = document.createElement("tbody");
        // Creating the top header row of the table.
        const headerRow = document.createElement("tr");
        const emptyCorner = document.createElement("th");
        emptyCorner.textContent = "";
        headerRow.appendChild(emptyCorner);
        // Adds each column number across the top.
        for (let col = minCol; col <= maxCol; col++) {
            const th = document.createElement("th");
            th.textContent = col;
            headerRow.appendChild(th);
        }

        thead.appendChild(headerRow);
        // Creates each table row and calculates the multiplication results.
        for (let row = minRow; row <= maxRow; row++) {
            const tr = document.createElement("tr");
             // Adds the row number on the left side.
            const rowHeader = document.createElement("th");
            rowHeader.textContent = row;
            tr.appendChild(rowHeader);
            // Adds the multiplication results for the current row.
            for (let col = minCol; col <= maxCol; col++) {
                const td = document.createElement("td");
                td.textContent = row * col;
                tr.appendChild(td);
            }

            tbody.appendChild(tr);
        }
        // Places the completed table into the page.
        table.appendChild(thead);
        table.appendChild(tbody);
        tableContainer.appendChild(table);
    }
});