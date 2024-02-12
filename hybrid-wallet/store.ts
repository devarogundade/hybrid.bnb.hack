import type { InjectionKey } from 'vue';
import { createStore, Store } from 'vuex';

// define your typings for the store state
export interface State {
    address: string;
}

// define injection key
export const key: InjectionKey<Store<State>> = Symbol();

export const store = createStore<State>({
    state: {
        address: "0x60...ff21"
    }
});