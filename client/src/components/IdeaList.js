import IdeasApi from '../services/ideasApi';

class IdeaList{
    constructor(){

        this.getIdeas();

        this.#validTags.add('technology');
        this.#validTags.add('software');
        this.#validTags.add('business');
        this.#validTags.add('education');
        this.#validTags.add('health');
        this.#validTags.add('inventions');
    }

    #ideaListEl = document.querySelector('#idea-list');
    #ideas = [];

    #validTags = new Set();

    addEventListeners(){
        this.#ideaListEl.addEventListener('click', (e) => {
            if (e.target.classList.contains('fa-times')) {
                e.stopImmediatePropagation();
                const ideaId = e.target.parentElement.parentElement.dataset.id;
                this.deleteIdea(ideaId);
            }
        })
    }

    async getIdeas(){
        try {
            const res = await IdeasApi.getIdeas();
            this.#ideas = res.data.data;
            this.render();
        } catch (error){
            console.log(error);
        }
    }

    async deleteIdea(ideaId){
        try {
            // delete from Server
            const res = await IdeasApi.deleteIdea(ideaId);
            this.#ideas.filter((idea) => 
                idea._id !== ideaId
            );
            this.getIdeas();
        } catch (error) {
            alert('You can not delete this ressource.');
        }
    }

    addIdeaToList(idea){
        this.#ideas.push(idea);
        this.render();
    }
    
    getTagClass(tag){
        tag = tag.toLowerCase();
        let tagClass = '';
        if (this.#validTags.has(tag)){
            tagClass = `tag-${tag}`;
        } else {
            tagClass = '';
        }

        return tagClass;
     }

    render (){
        this.#ideaListEl.innerHTML = this.#ideas.map((idea) => {
            const tagClass = this.getTagClass(idea.tag);
            const deleteBtn = idea.username === localStorage.getItem('username') ? `<button class="delete"><i class="fas fa-times"></i></button>` : '';
            return `
            <div class="card" data-id="${idea._id}">
            ${deleteBtn}
            <h3>
              ${idea.text}
            </h3>
            <p class="tag ${tagClass}">${idea.tag.toUpperCase()}</p>
            <p>
              Posted on <span class="date">${idea.date}</span> by
              <span class="author">${idea.username}</span>
            </p>
          </div>
            `;
        }).join('')
        this.addEventListeners();
    }
}

export default IdeaList;