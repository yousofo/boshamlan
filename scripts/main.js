const propertyLocations = new MultiSelectComponent("locationSelector", {
  placeholder: "اكتب المنطقة للبحث",
  rtl: true,
});

const propertyTypes = new MultiSelectComponent("propertyTypesSelector", {
  placeholder: "نوع العقار",
  rtl: true,
});


//set initial selections with ALLL
propertyLocations.setSelectedItems([1]);
propertyLocations.setLocations([
  { id: 1, name: "كل مناطق الكويت", count: 32 },
  { id: 2, name: "محافظة حولي", count: 32 },
  { id: 3, name: "المنزهة", count: 32 },
  { id: 4, name: "الزهراء", count: 32 },
  { id: 5, name: "الجابرية", count: 32 },
  { id: 6, name: "مياه الاتحاد البحرية1 - الخيران", count: 32 },
  { id: 7, name: "مياه الاتحاد البحرية2 - الخيران", count: 32 },
  { id: 8, name: "مياه الاتحاد البحرية3 - الخيران", count: 32 },
  { id: 9, name: "مياه الاتحاد البحرية4 - الخيران", count: 32 },
  { id: 10, name: "مياه الاتحاد البحرية5 - الخيران", count: 32 },
]);


propertyTypes.setSelectedItems([1]);
propertyTypes.setLocations([
  { id: 1, name: "الكل", count: 32 },
  { id: 2, name: "type 2", count: 32 },
  { id: 3, name: "type 3", count: 32 },
]);


//listen for changes
document
  .getElementById("locationSelector")
  .addEventListener("multiselect:change", function (event) {
    console.log("Selected IDs:", event.detail.selectedItems);
    console.log("Selected Items:", event.detail.selectedItemsData);
  });
document
  .getElementById("propertyTypesSelector")
  .addEventListener("multiselect:change", function (event) {
    console.log("Selected IDs:", event.detail.selectedItems);
    console.log("Selected Items:", event.detail.selectedItemsData);
  });
