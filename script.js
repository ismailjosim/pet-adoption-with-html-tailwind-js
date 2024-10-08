
const fetchAllData = () => {
    displayCategoryData(data)
}
const singleCategoriesData = () => {
    displayCategoryData(data)
}

const displayCategoryData = data => {
    const cardContainer = document.getElementById("card_container")
    if (data.length === 0) {
        cardContainer.innerHTML = ""
        cardContainer.innerHTML = "spinner"
    } else {
        setTimeout(() => {
            cardContainer.innerHTML = ""


        }, 2000);
    }
}
let petData = [];


function adoptBtn() {
    const modal = document.getElementById("my_modal_1");
    modal.showModal()

    setTimeout(() => {
        modal.close()
    }, 3000);
}
