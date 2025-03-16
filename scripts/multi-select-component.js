class MultiSelectComponent {
  constructor(containerId, options = {}) {
    // Default options
    this.options = {
      rtl: true,
      placeholder: "اكتب للبحث",
      ...options,
    };

    // Container element
    this.container = document.getElementById(containerId);
    if (!this.container) {
      throw new Error(`Element with ID "${containerId}" not found`);
    }

    // Find child elements using class selectors
    this.searchContainer = this.container.querySelector(".search-container");
    this.searchIcon = this.container.querySelector(".search-icon");
    this.inputTagsWrapper = this.container.querySelector(".input-tags-wrapper");
    this.searchInput = this.container.querySelector(".search-input");
    this.optionsContainer = this.container.querySelector(".options-container");

    // Validate required elements exist
    if (
      !this.searchContainer ||
      !this.inputTagsWrapper ||
      !this.searchInput ||
      !this.optionsContainer
    ) {
      throw new Error("Required child elements not found in container");
    }

    // Sample data for locations
    this.locations = [
      { id: 1, name: "كل مناطق الكويت", count: 32 },
      { id: 2, name: "محافظة حولي", count: 32 },
      { id: 3, name: "المنزهة", count: 32 },
      { id: 4, name: "الزهراء", count: 32 },
      { id: 5, name: "الجابرية", count: 32 },
      { id: 6, name: "مياه الاتحاد البحرية - الخيران", count: 32 },
    ];

    // Selected items array
    this.selectedItems = [];

    // Flag to track if options are visible
    this.optionsVisible = false;

    // Initialize the component
    this.init();
  }

  init() {
    // Set RTL direction if needed
    if (this.options.rtl) {
      this.container.style.direction = "rtl";
      this.searchInput.style.direction = "rtl";
    }

    // Set placeholder
    this.searchInput.placeholder = this.options.placeholder;

    // Disable autocomplete on search input
    this.searchInput.setAttribute("autocomplete", "off");

    // Set up event listeners
    this.setupEventListeners();

    // Initial render
    this.renderOptions();

    // Initially hide options
    this.hideOptions();
  }

  setupEventListeners() {
    // Add event listener for search input
    this.searchInput.addEventListener("input", () => this.handleSearch());

    // Add event listener for backspace/delete key
    this.searchInput.addEventListener("keydown", (e) => {
      // If the input is empty and backspace is pressed
      if (
        (e.key === "Backspace" || e.key === "Delete") &&
        this.searchInput.value === "" &&
        this.selectedItems.length > 0
      ) {
        // Get the last selected item
        const lastItemId = this.selectedItems[this.selectedItems.length - 1];
        // Remove it
        this.toggleItem(lastItemId);
      }
    });

    // Add event listener for focus
    // this.searchInput.addEventListener("focus", (e) => {
    //   // e.stopPropagation();

    //   if(this.optionsVisible){
    //     this.hideOptions()
    //   }else{
    //     this.showOptions();
    //   }
    //   console.log("focus", this.optionsVisible);
    // });

    // Add event listener for click on the input wrapper or input
    this.inputTagsWrapper.addEventListener("click", (e) => {
      // Focus on the input if clicking the wrapper
      if ( this.inputTagsWrapper.contains(e.target) && !this.optionsVisible ) {
        this.searchInput.focus();
        this.showOptions(); // Ensure options show when clicking the wrapper
        console.log("if");
      } else if (this.optionsVisible) {
        this.hideOptions();
        console.log("else", this.optionsVisible);
      }
    });

    // Add event listener for clicks outside the component
    document.addEventListener("click", (e) => {
      if (!this.container.contains(e.target)) {
        this.hideOptions();
      }
    });
  }

  renderOptions(filterText = "") {
    this.optionsContainer.innerHTML = "";

    const filteredLocations = filterText
      ? this.locations.filter((loc) =>
          loc.name.toLowerCase().includes(filterText.toLowerCase())
        )
      : this.locations;

    filteredLocations.forEach((location) => {
      const isSelected = this.selectedItems.includes(location.id);

      const optionItem = document.createElement("div");
      optionItem.className = `option-item ${isSelected ? "selected" : ""}`;

      // Create elements instead of using innerHTML for better security
      const label = document.createElement("label");
      label.style.display = "flex";
      label.style.alignItems = "center";
      label.style.width = "100%";

      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.className = "checkbox";
      checkbox.dataset.id = location.id;
      checkbox.checked = isSelected;

      const optionText = document.createElement("span");
      optionText.className = "option-text";
      optionText.textContent = location.name;

      const optionCount = document.createElement("span");
      optionCount.className = "option-count";
      optionCount.textContent = `(${location.count})`;

      label.appendChild(checkbox);
      label.appendChild(optionText);

      optionItem.appendChild(label);
      optionItem.appendChild(optionCount);

      // Add event listener for the click on the entire option item
      optionItem.addEventListener("click", (e) => {
        // Don't trigger if clicking on the checkbox itself (let the native behavior happen)
        if (e.target !== checkbox) {
          e.preventDefault();
          // Toggle the item
          this.toggleItem(location.id);
          // Clear search input
          this.searchInput.value = "";
          // Refocus the input
          this.searchInput.focus();
          // Keep options visible - THIS IS KEY
          this.showOptions();
        }
      });

      // Add event listener specifically for the checkbox
      checkbox.addEventListener("change", () => {
        this.toggleItem(location.id);
        // Clear search input when an option is selected
        this.searchInput.value = "";
        // Give focus back to input
        this.searchInput.focus();
        // Make sure options stay visible - THIS IS KEY
        this.showOptions();
      });

      this.optionsContainer.appendChild(optionItem);
    });
  }

  renderTags() {
    // Remove all tags but keep the input
    const tagsToRemove = this.inputTagsWrapper.querySelectorAll(".tag");
    tagsToRemove.forEach((tag) => tag.remove());

    // Create and insert tags before the input
    this.selectedItems.forEach((itemId) => {
      const location = this.locations.find((loc) => loc.id === itemId);
      if (!location) return;

      const tag = document.createElement("div");
      tag.className = "tag";

      const tagText = document.createElement("span");
      tagText.textContent = location.name;

      const closeBtn = document.createElement("span");
      closeBtn.className = "tag-close";
      closeBtn.dataset.id = itemId;
      closeBtn.textContent = "×";

      // Add event listener for tag close button
      closeBtn.addEventListener("click", (e) => {
        e.stopPropagation(); // Prevent event from bubbling up
        this.toggleItem(itemId);
        // Keep options visible after removing tag - THIS IS KEY
        this.showOptions();
      });

      tag.appendChild(tagText);
      tag.appendChild(closeBtn);

      // Insert tag before the input
      this.inputTagsWrapper.insertBefore(tag, this.searchInput);
    });
  }

  toggleItem(itemId) {
    const index = this.selectedItems.indexOf(itemId);

    // Special handling for "all options" (id: 1)
    if (itemId === 1) {
      if (index === -1) {
        // If selecting "all options", clear everything else
        this.selectedItems = [1];
      } else {
        // If deselecting "all options", clear all
        this.selectedItems = [];
      }
    } else {
      // If selecting a regular option, remove "all options" if present
      const allOptionsIndex = this.selectedItems.indexOf(1);
      if (allOptionsIndex !== -1) {
        this.selectedItems.splice(allOptionsIndex, 1);
      }

      // Toggle the selected item
      if (index === -1) {
        this.selectedItems.push(itemId);
      } else {
        this.selectedItems.splice(index, 1);
      }
    }

    // Update UI
    this.renderOptions(this.searchInput.value);
    this.renderTags();

    // Keep options visible after toggling item - THIS IS KEY
    this.showOptions();

    // Trigger change event
    this.triggerChangeEvent();
  }

  handleSearch() {
    const searchText = this.searchInput.value.trim();
    this.renderOptions(searchText);
    this.showOptions();
  }

  showOptions() {
    this.optionsVisible = true;
    this.optionsContainer.style.display = "block";
    this.container.classList.toggle("active");
  }

  hideOptions() {
    this.optionsVisible = false;
    this.optionsContainer.style.display = "none";
    this.searchInput.blur();
    this.container.classList.toggle("active");
  }

  triggerChangeEvent() {
    // Create and dispatch a custom event
    const event = new CustomEvent("multiselect:change", {
      bubbles: true,
      detail: {
        selectedItems: this.getSelectedItems(),
        selectedItemsData: this.getSelectedItemsData(),
      },
    });

    this.container.dispatchEvent(event);
  }

  // Public methods

  /**
   * Set location data
   * @param {Array} locations - Array of location objects
   */
  setLocations(locations) {
    if (!Array.isArray(locations)) {
      throw new Error("Locations must be an array");
    }

    this.locations = [...locations];
    this.selectedItems = []; // Reset selections when changing data

    // Update UI
    this.renderOptions();
    this.renderTags();
  }

  /**
   * Set selected items
   * @param {Array} itemIds - Array of item IDs to select
   */
  setSelectedItems(itemIds) {
    // Validate input
    if (!Array.isArray(itemIds)) {
      throw new Error("Selected items must be an array of IDs");
    }

    // Check for "all options" logic
    if (itemIds.includes(1)) {
      this.selectedItems = [1]; // Only select "all options"
    } else {
      this.selectedItems = [...itemIds]; // Clone the array
    }

    // Update UI
    this.renderOptions(this.searchInput.value);
    this.renderTags();

    // Trigger change event
    this.triggerChangeEvent();
  }

  /**
   * Get selected items
   * @returns {Array} Array of selected item IDs
   */
  getSelectedItems() {
    return [...this.selectedItems]; // Return a copy of the array
  }

  /**
   * Get selected items data (full objects)
   * @returns {Array} Array of selected item objects
   */
  getSelectedItemsData() {
    return this.selectedItems
      .map((id) => {
        return this.locations.find((loc) => loc.id === id);
      })
      .filter((item) => item !== undefined);
  }

  /**
   * Clear all selections
   */
  clearSelections() {
    this.selectedItems = [];

    // Update UI
    this.renderOptions();
    this.renderTags();

    // Trigger change event
    this.triggerChangeEvent();
  }
}
