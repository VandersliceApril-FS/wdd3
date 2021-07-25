class ListItemDO{
    constructor(n, c, s, q, img){
        this.name = n;
        this.cost = c;
        this.store = s;
        this.quantity = q;
        this.imageSource = img;
    }

    getItemTotal() {
        return this.cost * this.quantity;
    }
}