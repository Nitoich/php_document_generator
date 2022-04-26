export default {
    data() {
        return {
            typeBlock: 'TITLE',
            content: 'CONTENT'
        }
    },
    props: ['methodAddElement'],
    template: `
    <div id="aside">
        <h1 class="title">WordGenerator</h1>
        <div class="aside-block add-element-to-main">
            <select v-model="this.typeBlock">
                <option value="TITLE">Заголовок</option>
                <option value="TEXT">Текст</option>
            </select>
            <div v-if="this.typeBlock === 'TITLE'">
                <input type="text" placeholder="Title" v-model="this.content"></input>
            </div>
            <div v-if="this.typeBlock === 'TEXT'">
                <textarea cols="30" rows="10" v-model="this.content"></textarea>
            </div>
            <button @click="this.methodAddElement(this.typeBlock, this.content)">AddBlockButton</button>
        </div>
        <button>GENERATE</button>
    </div>`
}