import DocumentElement from "./components/documentElement.js";

export default {
    props: ['elements', 'methodDeleteElement'],
    components: {
        DocumentElement
    },
    template: `
        <div id="main">
            <DocumentElement v-for="element in this.elements" :element="element" :methodDeleteElement="methodDeleteElement"/>
            <div class="document-element add-new-element">
                <span></span>
            </div>
        </div>
    `
}