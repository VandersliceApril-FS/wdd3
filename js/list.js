class List{
    constructor(t){
        this.title = t;
        this.items = [];
        this.listTotal;

        
        this.displayTitle();
        // add a click event listener to edit the title
        let listTitle = document.querySelector("#list-title");
        listTitle.addEventListener('click', e => {
            console.log('title clicked');
            this.editListTitle();
        });
    }

    createListItem(arr){
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
        arr.push(newItem);
        
        // give the new item an ID number using the item's index in the array
        newItem.idNumber = arr.indexOf(newItem);

        // update local storage
        this.saveToLocal();
        // update the list total
        this.getListTotal();
        this.displayTotal();
        // call the function to display items in the html
        this.displayListItems(arr);
        document.querySelector('form').reset();
        this.toggleInstructions();
    }

    displayTitle(){
        let titleContainer = document.querySelector('#list-title-container');
        titleContainer.innerHTML = "";
        let htmlToAdd = 
        `
            <h1 id="list-title" class="col">${this.title}</h1>
        `
        titleContainer.insertAdjacentHTML('afterbegin', htmlToAdd);

        
    }

    displayListItems(arr){
        // reset list container html to avoid duplicates
        this.resetHTML(this.listContainer);
        
        if(arr.length !== 0) {
            // loop through the array and display each item in the html
            arr.forEach(item => {
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
                                <button class="btn btn-outline-dark btn-sm border-0" id="delete-btn"><i class="fas fa-trash"></i></button>
                            </div>
                        </li>
                    `;
                this.listContainer.insertAdjacentHTML('afterbegin', htmlToAdd);
                let listItem = document.querySelector(`[data-js = "${item.idNumber}"]`);

                let deleteButton = listItem.querySelector('#delete-btn');
                deleteButton.addEventListener("click", e => this.deleteItem(listItem));

                
                let checkbox = listItem.querySelector('#isComplete');
                checkbox.addEventListener("input", e => this.markComplete(item));
            })
        };
    }

    editListTitle() {
        // select the title container
        let titleContainer = document.querySelector('#list-title-container');
        // clear the current html so the current list title doesn't display
        titleContainer.innerHTML = "";
        
        // display the form with the current title
        let htmlToAdd = 
        `
        <form id="title-form" class="d-flex">
            <input id="list-title-input" class="form-control" type="text" value="${this.title}"  aria-label=".form-control-lg" required>
            <button id="title-change-btn" class="btn btn-outline-dark" type="button">change</button>
        </form>
        `
        titleContainer.insertAdjacentHTML('afterbegin', htmlToAdd);

        // listen for the "change" button click
        let titleChangeBtn = titleContainer.querySelector('#title-change-btn');
        titleChangeBtn.addEventListener('click', e => {
            // grab the new title and change this list's title
            let editedTitle = titleContainer.querySelector('#list-title-input').value;
            this.title = editedTitle;
        });

        // display the new title
        this.displayTitle();
    }

    
    getListTotal(){
        this.listTotal = 0;
        this.items.forEach(item => {
            this.listTotal = this.listTotal + item.getTotalCost();
        });
    }
}