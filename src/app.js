import "@fortawesome/fontawesome-free/js/all";
import CalorieTracker from "./Tracker";
import { Meal, Workout } from "./Item";
import { Modal, Collapse } from "bootstrap";
import "./css/bootstrap.css";
import "./css/style.css";

// const tracker = new CalorieTracker();

// const breakfast = new Meal("breakfast", 400);
// const lunch = new Meal("Lunch", 2350);

// tracker.addMeal(breakfast);
// tracker.addMeal(lunch);

// const run = new Workout("Morning Run", 300);

// tracker.addWorkout(run);

// console.log(tracker._meals);
// console.log(tracker._workouts);
// console.log(tracker._totalCalories);

class App {
  constructor() {
    this._tracker = new CalorieTracker();
    this._loadEventListeners();
    this._tracker.loadItems();
  }

  _loadEventListeners() {
    document
      .getElementById("meal-form")
      .addEventListener("submit", this._newItem.bind(this, "meal"));
    document
      .getElementById("workout-form")
      .addEventListener("submit", this._newItem.bind(this, "workout"));

    document
      .getElementById("meal-items")
      .addEventListener("click", this._removeItem.bind(this, "meal"));
    document
      .getElementById("workout-items")
      .addEventListener("click", this._removeItem.bind(this, "workout"));
    document
      .getElementById("filter-meals")
      .addEventListener("keyup", this._filterItems.bind(this, "meal"));
    document
      .getElementById("filter-workouts")
      .addEventListener("keyup", this._filterItems.bind(this, "workout"));

    document
      .getElementById("reset")
      .addEventListener("click", this._reset.bind(this));
    document
      .getElementById("limit-form")
      .addEventListener("submit", this._setLimit.bind(this));
  }
  _newItem(type, e) {
    e.preventDefault();
    const name = document.getElementById(`${type}-name`);
    const calories = document.getElementById(`${type}-calories`);

    // Validate inputs
    if (name.value === "" || calories.value === "") {
      alert("Please fill in all fields");
      return;
    }

    if (type === "meal") {
      const meal = new Meal(name.value, +calories.value);

      this._tracker.addMeal(meal);
    } else {
      const workout = new Workout(name.value, +calories.value);

      this._tracker.addWorkout(workout);
    }

    name.value = "";
    calories.value = "";
    ``;
    const collapseItem = document.getElementById(`collapse-${type}`);
    const bsCollapse = new Collapse(collapseItem, {
      toggle: true,
    });
  }

  _removeItem(type, e) {
    if (
      e.target.classList.contains("delete") ||
      e.target.classList.contains("fa-xmark")
    ) {
      if (confirm("Are you sure")) {
        const id = e.target.closest(".card").getAttribute("data-id");

        type === "meal"
          ? this._tracker.removeMeal(id)
          : this._tracker.removeWorkout(id);
        e.target.closest(".card").remove();
        console.log(id);
      }
    }
  }

  _filterItems(type, e) {
    const text = e.target.value.toLowerCase();
    console.log(text);

    document.querySelectorAll(`#${type}-items .card`).forEach((item) => {
      const name = item.firstElementChild.firstElementChild.textContent;
      if (name.toLowerCase().indexOf(text) !== -1) {
        item.style.display = "block";
      } else {
        item.style.display = "none";
      }
    });
  }

  _reset() {
    this._tracker.reset();
    document.getElementById("meal-items").innerHTML = "";
    document.getElementById("workout-items").innerHTML = "";
    document.getElementById("filter-meals").value = "";
    document.getElementById("filter-workouts").value = "";
  }

  _setLimit(e) {
    e.preventDefault();
    const limit = document.getElementById("limit");
    if (limit.value === "") {
      alert("Please add a limit");
      return;
    }

    this._tracker.setLimit(+limit.value);
    limit.value = "";

    const modalEl = document.getElementById("limit-modal");
    const modal = new Modal.getInstance(modalEl);
    modal.hide();
  }

  // _newWorkout(e) {
  //   e.preventDefault();
  //   const name = document.getElementById("workout-name");
  //   const calories = document.getElementById("workout-calories");

  //   // Validate inputs
  //   if (name.value === "" || calories.value === "") {
  //     alert("Please fill in all fields");
  //     return;
  //   }

  //   const workout = new Workout(name.value, +calories.value);

  //   this._tracker.addWorkout(workout);

  //   name.value = "";
  //   calories.value = "";
  //   const collapseWorkout = document.getElementById("collapse-workout");
  //   const bsCollapse = new bootstrap.Collapse(collapseWorkout, {
  //     toggle: true,
  //   });
  // }
}

const app = new App();
