class Main{
    constructor() {
        // when a new list is created, add it to this array to access later.
        this.lists = [];
        this.currentList = [];

        this.formModal = document.querySelector('#add-item-modal');
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
        
        // items wil be added to the listObject array
        this.currentList.push(newItem);
        this.displayListItems(this.currentList);
        document.querySelector('form').reset();
        let myModal = document.getElementById('#add-item-modal');
        // myModal.hide();
        console.log(`Current List: ${this.currentList}`);
        
    }

    displayListItems(arr){
        let mainList = document.querySelector('#list-container');
        arr.forEach(item => {
            let htmlToAdd = 
        `
        <li class="list-group-item">
            <div class="row">
                <h2  class="col">${item.name}</h2>
                <h3 class="col-3">${item.cost}</h3>
            </div>
            <p>${item.store}</p>
        
            <p class="col">${item.quantity}</p>
            <button class="col-3" id="more">...</button>
        </li>
        `;
        mainList.insertAdjacentHTML('afterbegin', htmlToAdd);
        })  
    }

    
}


// starts the app 
(()=>{
    console.log("page loaded");
    const main = new Main();
})();

