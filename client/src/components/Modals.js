class Modal {
    constructor(){
        this.addEventListeners();
    }


        #modal = document.querySelector('#modal');
        #modalBtn = document.querySelector('#modal-btn');

        addEventListeners(){
            this.#modalBtn.addEventListener('click', this.open.bind(this));
            window.addEventListener('click', this.outsideClick.bind(this));
            document.addEventListener('closemodal', () => this.close());
        }

open(){
    this.#modal.style.display = 'block'
}

close(){
    this.#modal.style.display = 'none';
}

outsideClick(e){
    if (e.target === this.#modal){
        this.close();
    }
}
}

export default Modal;