export default {
    props: ['type', 'content'],
    template: `
        <div style="width: 100%" class="document-element">
            <div v-if="this.type === 'TEXT'">
                {{ this.content }}
            </div>
            <div v-if="this.type === 'TITLE'" style="text-align: center; font-size: 18px; font-weight: bold; ">
                {{ this.content }}
            </div>
        </div>
    `
}