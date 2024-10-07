
// * fetch categories data
async function fetchCategories() {
    const res = await fetch("https://openapi.programming-hero.com/api/peddy/categories");
    const data = await res.json();
    showCategories(data.categories);

}

// show Categories Data
async function showCategories(categories) {
    const categoriesEl = document.getElementById("categories");
    categories.forEach(item => {
        categoriesEl.innerHTML += `<button onclick="fetchSingleCategories(this)" class="flex items-center justify-center gap-5 border-2 px-10 py-3 rounded-lg hover:rounded-full transition-transform ease-in-out">
            <img src=${ item.
                category_icon } alt="">
                    <h2 class="text-2xl font-bold">${ item.category }</h2>
                </button>`
    });

}

const cardsContainerEl = document.getElementById("cards_container")

// single category data
async function fetchSingleCategories(category) {
    cardsContainerEl.innerHTML = `
                <div class="col-span-3 flex justify-center items-center">
                  <span class="loader"></span>
                </div>`;
    const name = category.innerText;
    const res = await fetch(`https://openapi.programming-hero.com/api/peddy/category/${ name }`);
    const data = await res.json();

    setTimeout(() => {
        cardsContainerEl.innerHTML = "";
        data.data.forEach(item => {
            const { petId, breed, category, date_of_birth, price, image, gender, pet_details, vaccinated_status, pet_name } = item || {}
            cardsContainerEl.innerHTML += `
        <div class="card bg-base-100 w-full shadow-xl">
                    <figure class="px-10 pt-10">
                        <img src=${ image }
                            alt=${ pet_name } class="rounded-xl" />
                    </figure>
                    <div class="card-body">
                        <h2 class="card-title text-3xl">Name: ${ pet_name }</h2>
                        <p>
                            <i class="fa-solid fa-border-all"></i>
                            Breed:
                            <span>${ breed }</span>
                        </p>
                        <p>
                            <i class="fa-regular fa-calendar"></i>
                            Birth:
                            <span>${ date_of_birth ? date_of_birth : "Not Available" }</span>
                        </p>
                        <p>
                            <i class="fa-solid fa-mercury"></i>
                            Gender:
                            <span>${ gender ? gender : "Not Available" }</span>
                        </p>
                        <p>
                            <i class="fa-solid fa-dollar-sign"></i>
                            Price:
                            <span>${ price }</span>
                        </p>
                        <div class="divider"></div>
                        <div class="card-actions flex justify-between">
                            <button class="btn px-5 bg-transparent text-secondary border-primary text-2xl"><i
                                    class="fa-solid fa-thumbs-up"></i></button>
                            <button
                                class="btn border border-primary bg-transparent text-primary font-bold px-5 text-xl">Adopt</button>
                            <button
                                class="btn border border-primary bg-transparent text-primary font-bold px-5 text-xl">Details</button>
                        </div>
                    </div>
                </div>
        `;
        });
    }, 2000);


}



fetchCategories()


