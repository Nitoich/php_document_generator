export default {
    data() {
        return {
            typeBlock: 'TITLE',
            content: 'CONTENT',
            image: undefined
        }
    },
    props: ['methodAddElement','elements'],
    methods: {
        generate() {
            console.log('123')
            fetch('/ajax/getDocument.php', {
                method: 'post',
                body: JSON.stringify(this.elements)
            })
                .then(res => {return res.json()})
                .then(res => {
                    console.log(res)
                    window.open(res.url);
                })
        },
        addElement() {
            if (this.typeBlock === 'IMAGE') {
                this.methodAddElement(this.typeBlock, this.image);
                console.log(this.image)
            } else {
                this.methodAddElement(this.typeBlock, this.content)
            }
        }
    },
    template: `
    <div id="aside">
        <h1 class="title">WordGenerator</h1>
        <div class="aside-block add-element-to-main">
            <select v-model="this.typeBlock">
                <option value="TITLE">Заголовок</option>
                <option value="TEXT">Текст</option>
                <option value="IMAGE">Картинка</option>
            </select>
            <div v-if="this.typeBlock === 'TITLE'">
                <input type="text" placeholder="Title" v-model="this.content">
            </div>
            <div v-if="this.typeBlock === 'TEXT'">
                <textarea cols="30" rows="10" v-model="this.content"></textarea>
            </div>
            
            <div v-if="this.typeBlock === 'IMAGE'">
                <input type="file" v-model="this.image">
                <input type="text" placeholder="Название фото">
            </div>
            <button @click="this.addElement()">AddBlockButton</button>
        </div>
        <button @click="this.generate()">GENERATE</button>
    </div>`
}