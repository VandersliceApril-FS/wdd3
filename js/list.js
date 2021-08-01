class List{
    constructor(t){
        this.title = t;
        this.items = [];
        this.listTotal;
        this.titleContainer = document.querySelector('#list-title-container');
        this.listContainer = document.querySelector('#list-container');
        
        this.displayTitle();
        this.displayAddButton();
        this.displayTotal();

        let listTitle = document.querySelector('#list-title');
        listTitle.addEventListener("click", e => this.editListTitle());
        
        // listen for form submission
        this.formModal = document.querySelector('#add-item-modal');
        let submitBtn = this.formModal.querySelector('#modal-submit-btn');
        submitBtn.addEventListener("click", e => this.createListItem(this.currentList));
    }

    createListItem(){
        // create a new list item object
        let newItem = new ListItemDO();

        //gather the data from the form
        
        newItem.name =  document.querySelector('#name-field').value;
        newItem.cost = Number(document.querySelector('#cost-field').value);
        newItem.store = document.querySelector('#store-field').value;
        newItem.quantity = Number(document.querySelector('#quantity-field').value);
        
        if(document.querySelector('#image-link').value == "") {
            newItem.imageSource = 'images/box.jpg';
        } else {
            newItem.imageSource = document.querySelector('#image-link').value;
        }
        
        
        // add the item to the currentList
        this.items.push(newItem);

        // give the new item an ID number using the item's index in the array
        newItem.idNumber = this.items.indexOf(newItem);
        
        this.displayTotal();
        // call the function to display items in the html
        this.displayListItems(this.items);
        document.querySelector('form').reset();
        this.toggleInstructions();
    }



    displayAddButton(){
        let htmlToAdd = 
        `
            <!-- Button to trigger modal -->
            <div id="add-btn-container" class="d-flex justify-content-end">
                <p id="instructions">Add an item to this list.</p>    
                <button id="add-item-btn" type="button" class="btn btn-dark btn-lg rounded-circle" data-bs-toggle="modal" data-bs-target="#add-item-modal">+</button>
            </div>
        `;
        let listSection = document.querySelector('#list-section');

        listSection.insertAdjacentHTML('afterend', htmlToAdd);
    }

    displayTitle(){
        
        this.titleContainer.innerHTML = "";
        let htmlToAdd = 
        `
            <h1 id="list-title" class="col">${this.title}</h1>
        `
        this.titleContainer.insertAdjacentHTML('afterbegin', htmlToAdd);
        
        let listTitle = document.querySelector('#list-title');
        listTitle.addEventListener("click", e => this.editListTitle());
    }

    displayTotal(){
        let main = document.querySelector('main');
        this.getListTotal();
        

        if(!this.listTotal){
            console.error("no list total", this.listTotal);
            let htmlToAdd = 
        `
        <section id="total-container"  class="d-flex w-100 justify-content-between mt-3 fixed-bottom">
            <h3>Total</h3>
            <h3 class="total"><span>$</span>0</h3>
        </section>
        `
        main.insertAdjacentHTML('beforeend', htmlToAdd);
        } 
        
        let listTotalContainer = document.querySelector('#total-container');
        listTotalContainer.innerHTML = "";
    
        let htmlTotal = 
        `
        <h3>Total</h3>
        <h3 class="total"><span>$</span>${Number(this.listTotal).toFixed(2)}</span></h3>
        `
        listTotalContainer.insertAdjacentHTML('afterbegin', htmlTotal);

        
        
    }

    displayListItems(){
        // reset list container html to avoid duplicates
        this.listContainer.innerHTML = "";
        
        if(this.items.length !== 0) {
            // loop through the array and display each item in the html
            this.items.forEach(item => {
                console.log(item.name);
                let htmlToAdd = 
                    `   
                    <li class="list-group-item pb-0" data-js="${item.idNumber}">
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" name="completed" value="true" id="isComplete">
                                <label class="form-check-label" for="isComplete">
                                    <div class="d-flex">
                                        <section id="item-photo-container">
                                            <img id="item-photo" src="${item.imageSource}" alt="item photo">
                                        </section>
                                        <section id="item-info" class="w-100" >
                                            <div class="d-flex justify-content-between mb-0">
                                                <h2 id="item-name">${item.name}</h2>
                                                <h2 id="item-cost">$ ${item.getTotalCost().toFixed(2)}</h2>
                                            </div>
                                            <p id="item-store">${item.store}</p>
                                            <p id="item-quantity">Qty: ${item.quantity}</p>
                                        </section>
                                    </div>
                                </label>
                            </div>
                            <div class="d-flex justify-content-end">
                                <button class="btn btn-outline-dark btn-sm border-0" deleteId-js="${item.idNumber}" id="delete-btn"><i class="fas fa-trash"></i></button>
                            </div>
                        </li>
                    `;
                this.listContainer.insertAdjacentHTML('afterbegin', htmlToAdd);
                let listItem = document.querySelector(`[data-js = "${item.idNumber}"]`);

                let deleteButton = listItem.querySelector(`[deleteID-js="${item.idNumber}"]`);
                deleteButton.addEventListener("click", e => this.deleteItem(item.idNumber));

                
                let checkbox = listItem.querySelector('#isComplete');
                checkbox.addEventListener("change", e => this.markComplete(item));
            })
        } else {
            this.toggleInstructions();
        }

    }

    deleteItem(id){
        this.items.splice(id, 1);
        
        
        this.displayListItems();
        
        this.getListTotal();
        this.displayTotal();
        this.toggleInstructions();
    }

    editListTitle() {
        console.log("list title clicked");
        console.log();
        
        // clear the current html so the current list title doesn't display
        // display the form with the current title
        this.titleContainer.innerHTML = 
        `
        <form id="title-form" class="d-flex">
            <input id="list-title-input" class="form-control" type="text" value="${this.title}"  aria-label=".form-control-lg" required>
            <button id="title-change-btn" class="btn btn-outline-dark" type="button">change</button>
        </form>
        `;

        // listen for the "change" button click
        this.titleContainer.querySelector('#title-change-btn').addEventListener('click', evt => {
            console.log('change title button clicked')
            // grab the new title and change this list's title
            this.title = this.titleContainer.querySelector('#list-title-input').value;
            // display the new title
            this.displayTitle();
        });
        
    }

    
    getListTotal(){
        this.listTotal = 0;
        this.items.forEach(item => {
            this.listTotal = this.listTotal + item.getTotalCost();
        });
    }

    markComplete(itemToComplete) {

        let markCompleted = document.querySelector(`[data-js = "${itemToComplete.idNumber}"]`);
        markCompleted.classList.add("completed");
        
    }

    toggleInstructions(){
        if(this.items.length !== 0) {
            document.querySelector('#instructions').style.display = 'none';  
        } else {
            document.querySelector('#instructions').style.display = 'block';
        } 
    }
}