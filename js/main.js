class Main{
    constructor() {
        // when a new list is created, add it to this array to access later.
        this.lists = [];
        this.currentList = [];
        this.listContainer = document.querySelector('#list-container');

        this.formModal = document.querySelector('#add-item-modal');
        let form = document.querySelector('form');
        // form.addEventListener('submit', e => e.preventDefault());
        let clearBtn = document.querySelector('#clear-list-btn');
        clearBtn.addEventListener("click", e => this.clearList());
        
        let submitBtn = form.querySelector('#modal-submit-btn');
        submitBtn.addEventListener("click", e => this.createListItem());

        const myStorage = window.localStorage
        
        this.savedList = Object.keys(localStorage);
        
    }

    getFromLocal(arr){
        arr.forEach(item => {
            const str = localStorage.getItem(item);

            let parsedObj = JSON.parse(str);
            this.savedList.push(parsedObj);
        });

        this.displayListItem(this.savedList);
        
    }

    saveToLocal(itemObject){
        let newItemObject = JSON.stringify(itemObject);
        localStorage.setItem(newItemObject, `${newItemObject.name}`);
    }

    createListItem(){
        // create a new list item object
        let newItem = new ListItemDO();

        //gather the data from the form
        newItem.name = document.querySelector('#item-name').value;
        newItem.cost = Number(document.querySelector('#item-cost').value).toFixed(2);
        newItem.store = document.querySelector('#item-store').value;
        newItem.quantity = Number(document.querySelector('#item-quantity').value);
        
        
        // add the item to the currentList
        this.currentList.push(newItem);

        // save the item to local storage
        this.saveToLocal(newItem);

        // call the function to display items in the html
        this.displayListItem(this.currentList);


        document.querySelector('form').reset();
        this.savedList.forEach(item => {
            console.log(`Added Item: \rlocal storage: ${item.name}`);
        });
    }

    resetListContainer(){
        this.listContainer.innerHTML = "";
    }


    displayListItem(arr){
        // reset list container to avoid duplicates
        this.resetListContainer();
        
        // loop through the array and display each item in the html
        arr.forEach(item => {
        let htmlToAdd = 
        `
        <li class="list-group-item">
            <div class="row">
                <p  class="col">${item.name}</p>
                <p class="col-3">$ ${item.cost}</p>
            </div>
            <p>${item.store}</p>
        
            <p class="col">Qty: ${item.quantity}</p>
            <button class="col-3" id="more">...</button>
        </li>
        `;
        this.listContainer.insertAdjacentHTML('afterbegin', htmlToAdd);    
        }); 
    }

    clearList(e){
        localStorage.clear();
        window.location.reload();
        this.savedList.forEach(item => {
            console.log(`Cleared List\r\nlocal storage: ${item.name}`);
        });
    }


    
}


// starts the app 
(()=>{
    console.log("page loaded");
    const main = new Main();
})();

