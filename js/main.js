class Main{
    constructor() {
        let addButton = document.querySelector('#add-item-btn');
        addButton.addEventListener("click", this.displayData);
    
    }
    displayData(){
        let addItemModal = document.querySelector('#add-item-modal');
        let submitBtn = addItemModal.querySelector('#modal-submit-btn');
        submitBtn.addEventListener('submit', e=>preventDefault(e));
        let itemName = addItemModal.querySelector('#item-name');
        submitBtn.addEventListener("click", e=>console.log(`Submit Button Clicked.\rItem Name: ${itemName.value}`));
    }
}
        

// starts the app 
(()=>{
    console.log("page loaded");
    const main = new Main();
})();