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
            let gcontent = content;
            if(type === 'IMAGE') {
                const formData = new FormData();
                formData.append('image', document.getElementById('file-transfer').files[0], document.getElementById('file-transfer').files[0].name);
                fetch('/ajax/addImage.php', {
                    method: 'post',
                    body: formData
                })
                    .then(res => {return res.json()})
                    .then(res => {
                        this.Elements.push({
                            id: this.getNewId(),
                            type: type,
                            content: {
                                image: res.url,
                                text: gcontent.text
                            }
                        });
                        this.saveToLocalStorage();
                    })
            } else {
                if(content != '') {
                    this.Elements.push({
                        id: this.getNewId(),
                        type: type,
                        content: content
                    });
                    this.saveToLocalStorage();
                }
            }

        },
        deleteElement(id) {
            console.log(id);
            console.log(this.getIndexElement(id))
            this.Elements.splice(this.getIndexElement(id), 1);
            this.saveToLocalStorage();
        },
        getIndexElement(id) {
            let find;
            for(let i = 0; i < this.Elements.length; i++) {
                if(this.Elements[i].id == id) {
                    find = i;
                }
            }
            return find;
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
