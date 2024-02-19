import type { InjectionKey } from 'vue';
import { createStore, Store } from 'vuex';

// define your typings for the store state
export interface State {
    address: string;
    signer: string;
    assets: [];
}

// define injection key
export const key: InjectionKey<Store<State>> = Symbol();

export const store = createStore<State>({
    state: {
        address: null,
        signer: null,
        assets: []
    },
    mutations: {
        setAddress(state: State, newAddress: string) {
            state.address = newAddress;
        },
        setSigner(state: State, newSigner: string) {
            state.signer = newSigner;
        },
        setAssets(state: State, newAssets: []) {
            state.assets = newAssets;
        }
    }
});