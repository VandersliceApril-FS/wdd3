class Main{
    constructor() {
        // let addButton = document.querySelector('#add-item-btn');
        // addButton.addEventListener("click", this.getData);
        let form = document.querySelector('form');
        form.addEventListener('submit', e => e.preventDefault());
        
        let submitBtn = form.querySelector('#modal-submit-btn');
        submitBtn.addEventListener("click", e => this.createListItem());
    }
    

    createListItem(){
        let newItem = new ListItemDO();
        newItem.name = document.querySelector('#item-name').value;
        newItem.cost = Number(document.querySelector('#item-cost').value);
        newItem.store = document.querySelector('#item-store').value;
        newItem.quantity = Number(document.querySelector('#item-quantity').value);
        console.log(newItem);
    }

    
}


// starts the app 
(()=>{
    console.log("page loaded");
    const main = new Main();
})();

