export default {
    props: ['element'],
    template: `
        <div :data-id="this.element.id" class="document-element">
            <div class="control">
                <button>Удалить</button>
                <button>Изменить</button>
            </div>
            <div v-if="this.element.type === 'TEXT'">
                {{ this.element.content }}
            </div>
            <div v-if="this.element.type === 'TITLE'" style="text-align: center; font-size: 18px; font-weight: bold; ">
                {{ this.element.content }}
            </div>
        </div>
    `
}