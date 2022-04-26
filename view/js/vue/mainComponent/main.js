import DocumentElement from "./components/documentElement.js";

export default {
    props: ['elements'],
    components: {
        DocumentElement
    },
    template: `
        <div id="main">
            <DocumentElement v-for="element in this.elements" :type="element.type" :content="element.content" />
        </div>
    `
}