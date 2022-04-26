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
    },
    components: {
        Aside,
        Main
    },
    methods: {
        addElement(type, content) {
            this.Elements.push({
                id: this.getNewId(),
                type: type,
                content: content
            });
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
        <Main :elements="this.Elements" />
    `
}

window.addEventListener('DOMContentLoaded', (event) => {
    window.App = Vue.createApp(App).mount('#root');
});
