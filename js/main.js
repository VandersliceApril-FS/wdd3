class Main{
    constructor() {
        // when a new list is created, add it to this array to access later.
        this.lists = [];
        this.currentList = [];
        this.listContainer = document.querySelector('#list-container');
        this.listTotal = 0;
        console.log(`beginning list total: ${this.listTotal}`);

        let submitTitleBtn = document.querySelector('#title-submit-btn');
        submitTitleBtn.addEventListener('click', e => this.createList());

        this.formModal = document.querySelector('#add-item-modal');
        let form = document.querySelector('form');
        
        let submitBtn = form.querySelector('#modal-submit-btn');
        submitBtn.addEventListener("click", e => this.createListItem());
    }

    createList(){
        let newList = new List();
        newList.title = document.querySelector('#list-title-input').value;
        this.displayListTitle(newList.title);
    }

    displayListTitle(title){
        let titleContainer = document.querySelector('#list-title-container');
        titleContainer.innerHTML = "";
        let htmlToAdd = 
        `
            <h1 id="list-title" class="col">${title}</h1>
            <button id="title-submit-btn" class="col-3 btn btn-outline-dark btn-sm" type="button">Edit</button>
        `
        titleContainer.insertAdjacentHTML('afterbegin', htmlToAdd);
    }



    getItemTotal(item){
            let itemTotal = Number(item.cost * item.quantity).toFixed(2);
            console.log(`${Number(item.cost * item.quantity).toFixed(2)}`)
            return itemTotal;
    }

    displayTotal(){

        //grab all children of #list-container with #item-total
        let listTotalContainer = document.querySelector('#total-container');
        this.resetHTML(listTotalContainer);

        let htmlToAdd = 
        `
        <h3 class="col">Total</h3>
        <h2  class="col total"><span>$ </span>${Number(this.listTotal).toFixed(2)}</h2>
        `
        listTotalContainer.insertAdjacentHTML('afterbegin', htmlToAdd);

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
        this.listTotal = Number(this.listTotal) + Number(this.getItemTotal(newItem));
        console.log(this.listTotal);
        
        // call the function to display items in the html
        this.displayListItems(this.currentList);
        document.querySelector('form').reset();
        this.displayTotal();
    }

    resetHTML(element){
        element.innerHTML = "";
    }


    displayListItems(arr){
        // reset list container to avoid duplicates
        this.resetHTML(this.listContainer);
        
        // loop through the array and display each item in the html
        arr.forEach(item => {
        let htmlToAdd = 
        `
        <li class="list-group-item">
            <div class="row">
                <p  class="col">${item.name}</p>
                <p class="col total">$ ${item.cost}</p>
            </div>
            <p>${item.store}</p>
        
            <p class="col">Qty: ${item.quantity}</p>
            <button class="btn btn-sm btn-outline-secondary col-3" id="more">...</button>
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

