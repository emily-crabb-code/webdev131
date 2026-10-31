
const form = document.querySelector("#ticketForm");
const tickettype = document.querySelector("#tickettype");
const studentContainer = document.querySelector("#studentContainer");
const notes = document.querySelector("#notes");
const passwordContainer = document.querySelector("#passwordContainer");
const guestPassword = document.querySelector("#guestPassword");
const output = document.querySelector("#output");

function updateNotesField() {
    const value = tickettype.value;

    studentContainer.hidden = value !== "one";
    passwordContainer.hidden = value !== "many";

    notes.required = value === "one";
    guestPassword.required = value === "many";

    if (value !== "one") {
        notes.value = "";
    }

    if (value !== "many") {
        guestPassword.value = "";
    }
}

tickettype.addEventListener("change", updateNotesField);
updateNotesField();

function isPastDate(value) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const chosen = new Date(value + "T00:00:00");

    return !value || chosen <= today;
}

form.addEventListener("submit", function (event) {
    event.preventDefault();
    output.textContent = "";

    const firstName = form.firstName.value.trim();
    const lastName = form.lastName.value.trim();
    const email = form.email.value.trim();
    const type = form.tickettype.value;
    const eventDate = form.eventDate.value;
    const password = guestPassword.value.trim();
    const note = form.notes.value.trim();

    // Create an array to hold errors.
    const errors = [];

    // Check required fields.
    if (!firstName) {
        errors.push("Please enter your first name.");
    }

    if (!lastName) {
        errors.push("Please enter your last name.");
    }

    if (!email || !form.email.checkValidity()) {
        errors.push("Please enter a valid email.");
    }

    if (!type) {
        errors.push("Please select a ticket type.");
    }

    // Check the event date.
    if (isPastDate(eventDate)) {
        errors.push("Please choose a date later than today.");
    }

    // Check student ID.
    if (type === "one" && !/^\d{9}$/.test(note)) {
        errors.push("Student I# must contain exactly 9 digits.");
    }

    // Check guest password.
    if (type === "many" && password !== "EVENT131") {
        errors.push("Please enter the correct access code.");
    }

    // Display errors if there are any.
    if (errors.length > 0) {
        output.innerHTML = "<h2>Please fix these errors:</h2>";

        const errorList = document.createElement("ul");

        errors.forEach(function (error) {
            const item = document.createElement("li");
            item.textContent = error;
            errorList.appendChild(item);
        });

        output.appendChild(errorList);
        return;
    }

    // Display ticket information.
    output.innerHTML = `
        <h2>Ticket Created</h2>
        <p>${firstName} ${lastName}</p>
        <p>${type === "one" ? "Student" : "Guest"}</p>
        <p>${eventDate}</p>
    `;

    form.reset();
    updateNotesField();
});
