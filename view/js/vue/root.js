import Aside from "./asideComponent/aside.js";
import Main from "./mainComponent/main.js";

const App = {
    data() {
        return {
            Elements: [
                {
                    type: "TITLE",
                    content: 'TITLE'
                },
                {
                    type: "TEXT",
                    content: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.'
                }
            ]
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
                type: type,
                content: content
            });
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
