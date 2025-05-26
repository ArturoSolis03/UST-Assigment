
class Book{
    constructor(title, price){
        this.title = title;
        this.cost = price; // price is parameter, but cost is a property
    }

    borrow(){
        console.log(`${this.title} is borrowed`);
    }

    rent(){
        //this.borrow();
        console.log(this.title); //won't work

    }
}

class FictionBook extends Book{
    borrow(){ //override
        console.log('override');
        super.borrow();
    }
}

const b1 = new Book("Learn HTML", 100);
console.log(b1.cost);
b1.borrow();
Book.rent();
const fb = new FictionBook('Caves of steel', 101);
console.log(fb.title);
fb.borrow();