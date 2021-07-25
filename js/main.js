class Main{
    constructor() {
        // when a new list is created, add it to this array to access later.
        this.lists = [];
        this.currentList = [];
        this.listContainer = document.querySelector('#list-container');
        this.listTotal = 0;
        this.main = document.querySelector('main');
        console.log(`beginning list total: ${this.listTotal}`);

        let submitTitleBtn = document.querySelector('#title-submit-btn');
        submitTitleBtn.addEventListener('click', e => this.createList());

        this.formModal = document.querySelector('#add-item-modal');
        let form = document.querySelector('form');
        
        let submitBtn = form.querySelector('#modal-submit-btn');
        submitBtn.addEventListener("click", e => this.createListItem());

    }

    clearList(e){
        localStorage.clear();
        window.location.reload();
        this.savedList.forEach(item => {
            console.log(`Cleared List\r\nlocal storage: ${item.name}`);
        });
    }

    createList(){
        let newList = new List();
        this.lists.push(newList);
        newList.title = document.querySelector('#list-title-input').value;
        this.displayListTitle(newList.title);
        this.moveAddButton();

        let htmlToAdd = 
        `
        <section id="total-container"  class="d-flex w-100 justify-content-between mt-3 fixed-bottom">
            <h3>Total</h3>
            <h3 class="total"><span>$</span>0</h3>
        </section>
        `
        this.main.insertAdjacentHTML('beforeend', htmlToAdd);
        
    }

    createListItem(){
        // create a new list item object
        let newItem = new ListItemDO();

        //gather the data from the form
        newItem.name = document.querySelector('#name-field').value;
        newItem.cost = Number(document.querySelector('#cost-field').value);
        newItem.store = document.querySelector('#store-field').value;
        newItem.quantity = Number(document.querySelector('#quantity-field').value);
        newItem.imageSource = document.querySelector('#image-link').value;

        console.log(`Image source: ${newItem.imageSource}`);
        
        
        // add the item to the currentList
        this.currentList.push(newItem);
        this.moveAddButton();
        this.listTotal = Number(this.listTotal) + Number(newItem.getItemTotal());
        
        // call the function to display items in the html
        this.displayListItems(this.currentList);
        document.querySelector('form').reset();
        this.displayTotal();
    }

    displayListTitle(title){
        let titleContainer = document.querySelector('#list-title-container');
        titleContainer.innerHTML = "";
        let htmlToAdd = 
        `
            <h1 id="list-title" class="col">${title}</h1>
        `
        titleContainer.insertAdjacentHTML('afterbegin', htmlToAdd);
    }


    displayListItems(arr){
        // reset list container html to avoid duplicates
        this.resetHTML(this.listContainer);
        console.log(this.currentList);
        
        // loop through the array and display each item in the html
        arr.forEach(item => {
        console.log(item.name);
        let htmlToAdd = 
        `
        <li class="list-group-item pb-0">
            <div class="d-flex justify-content-between">
                <section id="item-photo-container">
                    <img id="item-photo" src="${item.imageSource}" alt="item photo">
                </section>
                
                <section id="item-info">
                    <div class="d-flex w-100 justify-content-between mb-0">
                        <h2 id="item-name">${item.name}</h2>
                        <h2 id="item-cost">$ ${Number(item.cost).toFixed(2)}</h2>
                    </div>
                    <p id="item-store">${item.store}</p>
                    <p id="item-quantity">Qty: ${item.quantity}</p>
                </section>
            </div>
            <div class="d-flex justify-content-end">
                <button class="btn btn-outline-dark btn-sm border-0" id="more-btn"><i class="fas fa-ellipsis-h"></i></button>
            </div>
        </li>
        `;
        this.listContainer.insertAdjacentHTML('afterbegin', htmlToAdd);    
        }); 
    }

    displayTotal(){
        let listTotalContainer = document.querySelector('#total-container');
        
        this.resetHTML(listTotalContainer);
    
        let htmlToAdd = 
        `
        <h3>Total</h3>
        <h3 class="total"><span>$</span>${Number(this.listTotal).toFixed(2)}</span></h3>
        `
        listTotalContainer.insertAdjacentHTML('afterbegin', htmlToAdd);
        
    }

    moveAddButton(){
        let htmlToAdd;
        let listSection = document.querySelector('#list-section');
        
        if(this.currentList.length == 0) {
            htmlToAdd = 
            `
            <div id="add-btn-container" class="text-center centered-button">
                <button id="add-item-btn" type="button" class="btn btn-dark btn-lg rounded-circle" data-bs-toggle="modal" data-bs-target="#add-item-modal">+</button>
                <p>Add an item to this list.</p>
            </div>
            `
            listSection.border = "3px solid yellow";
            listSection.overflow = "scroll";
            listSection.height = "0";
        } else if(this.currentList.length > 0) {
            document.querySelector('#add-btn-container').remove();
            
            htmlToAdd = 
            `
            <!-- Button to trigger modal -->
            <div id="add-btn-container" class="d-flex justify-content-end">
                <button id="add-item-btn" type="button" class="btn btn-dark btn-lg rounded-circle" data-bs-toggle="modal" data-bs-target="#add-item-modal">+</button>
            </div>
            `
            listSection.style.border = '3px solid yellow';
            listSection.style.overflow = 'scroll';
            listSection.style.height = '20rem';
        }

        listSection.insertAdjacentHTML('afterend', htmlToAdd);
    }

    resetHTML(element){
        element.innerHTML = "";
    }


    
}


// starts the app 
(()=>{
    console.log("page loaded");
    const main = new Main();
})();

