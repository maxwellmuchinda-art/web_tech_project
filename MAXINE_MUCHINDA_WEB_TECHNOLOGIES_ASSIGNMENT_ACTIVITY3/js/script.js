/* ICT251 Activity 3 - JavaScript for Maxine Muchinda's portfolio
   Features:
   1. Contact form validation and local preview (compulsory)
   2. Theme switch (light / dark)
   3. Gallery viewer (Previous / Next)
   4. Project search and filter
   The script is loaded with "defer", so the page is ready when this runs. */

"use strict";

/* =====================================================
   1. CONTACT FORM VALIDATION AND PREVIEW
   ===================================================== */

const contactForm = document.getElementById("contact-form");
const formStatus = document.getElementById("form-status");
const previewBox = document.getElementById("form-preview");
const previewList = document.getElementById("preview-list");

// Each field to check: its id, a friendly label and the message shown when it is invalid.
const formFields = [
    { id: "name", label: "name", message: "Please enter your name (spaces alone are not accepted)." },
    { id: "email", label: "email", message: "Please enter a valid email address, for example name@example.com." },
    { id: "message", label: "message", message: "Please write a message (spaces alone are not accepted)." }
];

// Returns true when the text looks like an email address: something@something.something with no spaces.
function isValidEmail(text) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    return emailPattern.test(text);
}

// Checks one field. Whitespace is trimmed first, so "   " counts as empty.
function isFieldValid(fieldId, value) {
    const cleaned = value.trim();
    if (cleaned === "") {
        return false;
    }
    if (fieldId === "email") {
        return isValidEmail(cleaned);
    }
    return true;
}

// Shows or clears the error message next to a field and marks the field for screen readers.
function setFieldError(fieldId, message) {
    const input = document.getElementById(fieldId);
    const errorBox = document.getElementById(fieldId + "-error");
    errorBox.textContent = message;
    if (message === "") {
        input.removeAttribute("aria-invalid");
    } else {
        input.setAttribute("aria-invalid", "true");
    }
}

// Builds the preview box using textContent only, so anything typed is shown as plain text.
function showPreview(details) {
    previewList.textContent = "";
    details.forEach(function (item) {
        const term = document.createElement("dt");
        term.textContent = item.label;
        const description = document.createElement("dd");
        description.textContent = item.value;
        previewList.appendChild(term);
        previewList.appendChild(description);
    });
    previewBox.hidden = false;
}

// Runs when the form is submitted: validate, show errors or show the preview. Nothing is ever sent.
function handleFormSubmit(event) {
    event.preventDefault();

    let firstInvalid = null;
    let allValid = true;

    formFields.forEach(function (field) {
        const input = document.getElementById(field.id);
        if (isFieldValid(field.id, input.value)) {
            setFieldError(field.id, "");
        } else {
            setFieldError(field.id, field.message);
            allValid = false;
            if (firstInvalid === null) {
                firstInvalid = input;
            }
        }
    });

    if (!allValid) {
        previewBox.hidden = true;
        formStatus.textContent = "Please fix the problems shown above and try again.";
        formStatus.classList.add("has-error");
        firstInvalid.focus();
        return;
    }

    const topicSelect = document.getElementById("topic");
    formStatus.textContent = "Details validated in your browser. No message was sent.";
    formStatus.classList.remove("has-error");
    showPreview([
        { label: "Name", value: document.getElementById("name").value.trim() },
        { label: "Email", value: document.getElementById("email").value.trim() },
        { label: "Topic", value: topicSelect.value },
        { label: "Message", value: document.getElementById("message").value.trim() }
    ]);
}

// Clears a field's error as soon as the visitor starts correcting it.
function clearErrorOnInput(event) {
    if (event.target.id && document.getElementById(event.target.id + "-error")) {
        setFieldError(event.target.id, "");
    }
}

if (contactForm) {
    contactForm.addEventListener("submit", handleFormSubmit);
    contactForm.addEventListener("input", clearErrorOnInput);
}

/* =====================================================
   2. THEME SWITCH (light / dark)
   ===================================================== */

const themeButton = document.getElementById("theme-toggle");

// Reads the saved theme. Falls back to the visitor's system setting, then to light.
function getStartingTheme() {
    try {
        const saved = localStorage.getItem("portfolio-theme");
        if (saved === "light" || saved === "dark") {
            return saved;
        }
    } catch (error) {
        // Storage can be blocked in private windows; just carry on.
    }
    const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
    return prefersDark ? "dark" : "light";
}

// Applies a theme to the page and updates the button text to show the next action.
function applyTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    themeButton.textContent = theme === "dark" ? "Switch to light theme" : "Switch to dark theme";
}

// Flips between light and dark and remembers the choice.
function toggleTheme() {
    const current = document.documentElement.getAttribute("data-theme");
    const next = current === "dark" ? "light" : "dark";
    applyTheme(next);
    try {
        localStorage.setItem("portfolio-theme", next);
    } catch (error) {
        // Saving is optional, so ignore storage errors.
    }
}

if (themeButton) {
    applyTheme(getStartingTheme());
    themeButton.addEventListener("click", toggleTheme);
}

/* =====================================================
   3. GALLERY VIEWER (Previous / Next)
   ===================================================== */

const galleryItems = Array.from(document.querySelectorAll(".gallery-item"));
const galleryControls = document.getElementById("gallery-controls");
const prevButton = document.getElementById("gallery-prev");
const nextButton = document.getElementById("gallery-next");
const galleryCount = document.getElementById("gallery-count");
let currentPhoto = 0;

// Shows one photo (with its caption), hides the rest, and disables buttons at the first and last photo.
function showPhoto(index) {
    currentPhoto = index;
    galleryItems.forEach(function (item, position) {
        item.hidden = position !== currentPhoto;
    });
    galleryCount.textContent = "Photo " + (currentPhoto + 1) + " of " + galleryItems.length;
    prevButton.disabled = currentPhoto === 0;
    nextButton.disabled = currentPhoto === galleryItems.length - 1;
}

// Moves one photo back or forward, never past the first or last photo.
function changePhoto(step) {
    const target = currentPhoto + step;
    if (target >= 0 && target < galleryItems.length) {
        showPhoto(target);
    }
}

if (galleryItems.length > 0 && galleryControls) {
    galleryControls.hidden = false;
    prevButton.addEventListener("click", function () { changePhoto(-1); });
    nextButton.addEventListener("click", function () { changePhoto(1); });
    showPhoto(0);
}

/* =====================================================
   4. PROJECT SEARCH AND FILTER
   ===================================================== */

const filterForm = document.getElementById("project-filter");
const searchInput = document.getElementById("project-search");
const categorySelect = document.getElementById("project-category");
const resetButton = document.getElementById("project-reset");
const projectCards = Array.from(document.querySelectorAll(".project-card"));
const projectStatus = document.getElementById("project-status");
const emptyMessage = document.getElementById("project-empty");

// Shows only the cards that match both the search words and the chosen topic.
function filterProjects() {
    const searchText = searchInput.value.trim().toLowerCase();
    const category = categorySelect.value;
    let visibleCount = 0;

    projectCards.forEach(function (card) {
        const matchesCategory = category === "all" || card.dataset.category === category;
        const matchesSearch = searchText === "" || card.textContent.toLowerCase().includes(searchText);
        const show = matchesCategory && matchesSearch;
        card.hidden = !show;
        if (show) {
            visibleCount++;
        }
    });

    projectStatus.textContent = "Showing " + visibleCount + " of " + projectCards.length + " projects.";

    if (visibleCount === 0) {
        emptyMessage.textContent = "No projects match your search. Try a different word or press Reset to see everything.";
        emptyMessage.hidden = false;
    } else {
        emptyMessage.textContent = "";
        emptyMessage.hidden = true;
    }
}

// Clears the search box and topic, then shows every project again.
function resetFilter() {
    searchInput.value = "";
    categorySelect.value = "all";
    filterProjects();
    searchInput.focus();
}

if (filterForm && projectCards.length > 0) {
    searchInput.addEventListener("input", filterProjects);
    categorySelect.addEventListener("change", filterProjects);
    resetButton.addEventListener("click", resetFilter);
    // Pressing Enter in the search box should not reload the page.
    filterForm.addEventListener("submit", function (event) { event.preventDefault(); });
    filterProjects();
}
