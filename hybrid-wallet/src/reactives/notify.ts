import { reactive } from 'vue';

export const notify = reactive({
    messages: [],

    push: function (message) {
        this.messages = [...this.messages, message];

        setTimeout(() => {
            this.remove(this.messages.length - 1);
        }, 30000);
    },

    remove: function (index: any) {
        this.messages.splice(index, 1);
    }
});