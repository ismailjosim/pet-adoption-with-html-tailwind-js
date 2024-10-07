// * fetch categories data
async function fetchCategories(params) {
    const res = await fetch("https://openapi.programming-hero.com/api/peddy/categories");
    const data = await res.json();
    showCategories(data.categories);

}

// show Categories Data
async function showCategories(categories) {


}
fetchCategories()
