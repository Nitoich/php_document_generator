import Aside from "./asideComponent/aside.js";
import Main from "./mainComponent/main.js";

const App = {
    data() {
        return {
            variable: 'varia'
        }
    },
    mounted() {
        console.info('App mounted!');
    },
    components: {
        Aside,
        Main
    },
    template: `
        <Aside />
        <Main />
    `
}

window.addEventListener('DOMContentLoaded', (event) => {
    window.App = Vue.createApp(App).mount('#root');
});
