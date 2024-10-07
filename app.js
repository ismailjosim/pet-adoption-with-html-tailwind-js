// * fetch categories data
async function fetchCategories() {
    const res = await fetch(
        'https://openapi.programming-hero.com/api/peddy/categories',
    )
    const data = await res.json()
    showCategories(data.categories)
}

// show Categories Data
async function showCategories(categories) {
    const categoriesEl = document.getElementById('categories')
    categories.forEach((item) => {
        categoriesEl.innerHTML += `<button
        onclick="fetchSingleCategories(this)"
        class="category_btn flex items-center justify-center gap-5 border-2 px-10 py-3 rounded-lg hover:rounded-full">

            <img src=${ item.category_icon } alt="">
                    <h2 class="text-2xl font-bold">${ item.category }</h2>
                </button>`
    })
}

const cardsContainerEl = document.getElementById('cards_container')
let pets = []
// single category data
async function fetchSingleCategories(category) {

    cardsContainerEl.innerHTML = `
                <div class="col-span-3 flex justify-center items-center">
                  <span class="loader"></span>
                </div>`
    const name = category.innerText

    if (name) {
        const res = await fetch(
            `https://openapi.programming-hero.com/api/peddy/category/${ name }`,
        )
        const data = await res.json()
        pets = data.data
        category.classList.add("bg-primary/30", "rounded-full");
        category.classList.remove("rounded-lg");
    } else {
        const res = await fetch(
            `https://openapi.programming-hero.com/api/peddy/pets`,
        )
        const data = await res.json()
        pets = data.pets
    }
    displayCategoryData(pets)
}

function displayCategoryData(pets) {
    setTimeout(() => {
        cardsContainerEl.innerHTML = ''
        if (pets.length === 0) {
            cardsContainerEl.innerHTML = `
            <div class="col-span-3 flex gap-5 flex-col justify-center items-center">
                    <img src="./assets/no-data.png" alt="">
                    <h3 class="text-3xl font-black">No Information Available</h3>
                    <p class="sm:w-1/2 w-full text-center mx-auto font-medium">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a.
                    </p>
            </div>`
        } else {
            pets.forEach((item) => {
                const { petId, breed, date_of_birth, price, image, gender, pet_name } = item || {}
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
                            <span>${ breed ? breed : 'Not Available' }</span>
                        </p>
                        <p>
                            <i class="fa-regular fa-calendar"></i>
                            Birth:
                            <span>${ date_of_birth ? date_of_birth : 'Not Available'
                    }
                    </span>
                        </p>
                        <p>
                            <i class="fa-solid fa-mercury"></i>
                            Gender:
                            <span>${ gender ? gender : 'Not Available' }</span>
                        </p>
                        <p>
                            <i class="fa-solid fa-dollar-sign"></i>
                            Price:
                            <span>${ price }</span>
                        </p>
                        <div class="divider"></div>
                        <div class="card-actions flex justify-between">
                            <button
                            onclick="likePet('${ image }',this)"
                             class="btn px-5 bg-transparent text-secondary border-primary text-2xl">
                             <i class="fa-solid fa-thumbs-up"></i></button>
                            <button
                            onclick="adoptPet(this)"
                                class="btn border border-primary bg-transparent text-primary font-bold px-5 text-xl">Adopt</button>
                            <button
                            onclick="showDetails(${ petId })"
                                class="btn border border-primary bg-transparent text-primary font-bold px-5 text-xl">Details</button>
                        </div>
                    </div>
                </div>
        `
            })
        }
    }, 2000)
}

const likeContainerEl = document.getElementById('like_container')
likeContainerEl.innerHTML = ''

async function likePet(img, e) {
    e.classList.add('bg-green-800', 'text-white')
    likeContainerEl.innerHTML += `
    <div class="rounded-lg border-2 h-28 flex justify-center items-center shadow-md">
         <img class="rounded-lg p-1" src=${ img } alt="">
    </div>`
}

async function adoptPet(e) {
    const timerEl = document.getElementById('timer')
    const modal = document.getElementById('my_modal_1')

    // Show the modal
    modal.showModal()

    let timeLeft = 3
    timerEl.innerText = timeLeft

    const countdown = setInterval(() => {
        timeLeft--
        timerEl.innerText = timeLeft
    }, 1000)

    setTimeout(() => {
        clearInterval(countdown)
        modal.close()
        e.setAttribute('disabled', true)
    }, 3000)
}

async function showDetails(id) {
    const res = await fetch(
        `https://openapi.programming-hero.com/api/peddy/pet/${ id }`,
    )
    const data = await res.json()
    const {
        breed,
        date_of_birth,
        price,
        image,
        gender,
        pet_details,
        vaccinated_status,
        pet_name,
    } = data.petData || {}
    document.getElementById('my_modal_5').showModal()
    const modalContentEl = document.getElementById('modal_content')
    modalContentEl.innerHTML = `
                        <figure class="px-5 pt-5 ml-10">
                            <img src=${ image } alt=${ pet_name } class="rounded-xl" />
                        </figure>
                        <h3 class="text-3xl font-bold my-5">${ pet_name }</h3>
                        <div class="grid grid-cols-2 justify-between gap-2 ">
                            <p class="text-lg font-bold">
                                <i class="fa-solid fa-border-all"></i>
                                Breed: <span>${ breed ? breed : 'Not Available'
        }</span>
                            </p>
                            <p class="text-lg font-bold">
                                <i class="fa-regular fa-calendar"></i>
                                Birth:
                                <span>
                                ${ date_of_birth
            ? date_of_birth
            : 'Not Available'
        }
                                </span>
                            </p>
                            <p class="text-lg font-bold">
                                <i class="fa-solid fa-mercury"></i>
                                Gender: <span>${ gender ? gender : 'Not Available'
        }</span>
                            </p>
                            <p class="text-lg font-bold">
                                <i class="fa-solid fa-virus"></i>
                                Price: <span >$${ price ? price : 'Not Available'
        }</span>
                            </p>
                            <p class="text-lg font-bold">
                                <i class="fa-solid fa-dollar-sign"></i>
                                Vaccinated Status: <span>${ vaccinated_status }</span>
                            </p>
                        </div>
                        <div class="divider"></div>
                        <h3 class="text-2xl font-bold">Details Information</h3>
                        <p class="pt-2">${ pet_details }</p>`
}

const sortBtnEl = document.getElementById('sort_btn')
sortBtnEl.addEventListener('click', () => {
    if (pets.length > 0) {
        cardsContainerEl.innerHTML = `
                <div class="col-span-3 flex justify-center items-center">
                  <span class="loader"></span>
                </div>`

        const sorted = pets.sort((a, b) => b.price - a.price)
        displayCategoryData(sorted)
    }


})

fetchCategories()
fetchSingleCategories('')
