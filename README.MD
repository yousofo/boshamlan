### tailwind.config.js
is only for intellisense (auto complete) to work, you can remove it.

### css nesting
didn't use for compatibility 
>i prefer using SASS (readable) then transpiling to CSS but requirments only allow CSS :)

### Components
Created 'multi select list' class handler
styles -> in main file under 'MULTI SELECT COMPONENT' section.
must manually add markup with new id at (id="propertyTypesSelector"):
```
<div
          id="propertyTypesSelector"
          class="multi-select-container"
          role="search"
        >
          <div class="search-container w-full">
            <div class="input-tags-wrapper">
              <label for="property-type" class="sr-only">نوع العقار</label>

              <input
                placeholder="نوع العقار"
                id="property-type"
                name="property-type"
                aria-label="نوع العقار"
                type="text"
                class="search-input"
              />

              <!-- dropdown icon -->
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                class="input-icon-spin"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6 10L12 16L18 10L16.6 8.6L12 13.2L7.4 8.6L6 10Z"
                  fill="#556885"
                />
              </svg>
            </div>
          </div>
          <div class="options-container"></div>
        </div>
```


