import IdeasApi from '../services/ideasApi';
import IdeaList from './IdeaList';

class IdeaForm{
    constructor(){
        
    }
    #formModal = document.querySelector('#form-modal');
    #form = document.querySelector('#idea-form');
    #ideaList = new IdeaList();

    addEventListeners(){
        this.#form.addEventListener('submit', this.handleSubmit.bind(this));
    }

    async handleSubmit(e){
        e.preventDefault();

      if(!this.#form.elements.text.value || !this.#form.elements.tag.value || !this.#form.elements.username.value) {
        alert('Please enter all fields');
        return;
      }

      // Save User to localstorage
      localStorage.setItem('username', this.#form.elements.username.value);

        const idea = {
            text: this.#form.elements.text.value, //text is the name of the input name="text"
            tag: this.#form.elements.tag.value,
            username: this.#form.elements.username.value,
        }

        // Add Idea to server
        const newIdea = await IdeasApi.createIdea(idea);

        // Add Idea to List
        this.#ideaList.addIdeaToList(newIdea.data.data);

        //Clear Fields
        this.#form.elements.text.value = '';
        this.#form.elements.tag.value = '';
        this.#form.elements.username.value = '';

        this.render();

        document.dispatchEvent(new Event('closemodal'));
    }

    render(){
        this.#formModal.innerHTML = `
        <form id="idea-form">
        <div class="form-control">
          <label for="idea-text">Enter a Username</label>
          <input type="text" name="username" id="username" value="${localStorage.getItem('username') ? localStorage.getItem('username') : ''}" />
        </div>
        <div class="form-control">
          <label for="idea-text">What's Your Idea?</label>
          <textarea name="text" id="idea-text"></textarea>
        </div>
        <div class="form-control">
          <label for="tag">Tag</label>
          <input type="text" name="tag" id="tag" />
        </div>
        <button class="btn" type="submit" id="submit">Submit</button>
      </form>
      `;
      this.#form = document.querySelector('#idea-form');
      this.addEventListeners();
    }
}

export default IdeaForm;