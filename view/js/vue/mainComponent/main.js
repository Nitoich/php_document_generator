import DocumentElement from "./components/documentElement.js";

export default {
    data() {
        return {
            Elements: [{
                type: 'TEXT',
                content: 'TEXT'
            }]
        }
    },
    components: {
        DocumentElement
    },
    template: `
        <div id="main">
            
        </div>
    `
}