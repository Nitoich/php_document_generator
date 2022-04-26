import Aside from "./asideComponent/aside.js";
import Main from "./mainComponent/main.js";

const App = {
    data() {
        return {
            Elements: []
        }
    },
    mounted() {
        console.info('App mounted!');
        this.loadFromLocalStorage();
    },
    components: {
        Aside,
        Main
    },
    methods: {
        loadFromLocalStorage() {
            if(localStorage.getItem('SAVE_ELEMENTS') !== null) {
                this.Elements = JSON.parse(localStorage.getItem('SAVE_ELEMENTS'));
            }
        },
        saveToLocalStorage() {
            localStorage.setItem('SAVE_ELEMENTS', JSON.stringify(this.Elements));
        },
        addElement(type, content) {
            if(content != '') {
                this.Elements.push({
                    id: this.getNewId(),
                    type: type,
                    content: content
                });
                this.saveToLocalStorage();
            }
        },
        deleteElement(id) {
            console.log(id);
            this.Elements.splice(this.getIndexElement(id), 1);
            this.saveToLocalStorage();
        },
        getIndexElement(id) {
            for(let i = 0; i < this.Elements.length - 1; i++) {
                if(this.Elements[i].id == id) {
                    return i;
                }
            }
            return false;
        },
        getNewId() {
            if (this.Elements.length != 0) {
                return this.Elements[this.Elements.length - 1].id + 1;
            } else {
                return 1;
            }
        }
    },
    template: `
        <Aside :methodAddElement="addElement" :elements="this.Elements" />
        <Main :elements="this.Elements" :methodDeleteElement="deleteElement"/>
    `
}

window.addEventListener('DOMContentLoaded', (event) => {
    window.App = Vue.createApp(App).mount('#root');
});
