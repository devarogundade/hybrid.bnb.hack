import type { App } from 'vue';
import Converter from '../scripts/converter';
import Countdown from '../scripts/countdown';

export default {
    // eslint-disable-next-line no-unused-vars
    install: (app: App) => {
        app.config.globalProperties.$toMoney = (value: any, max: any) => {
            return Converter.toMoney(value, max);
        },
            app.config.globalProperties.$nFormat = (value: any, digits = 2) => {
                return Converter.nFormatter(value, digits);
            },
            app.config.globalProperties.$fromWei = (value: any) => {
                return Converter.fromWei(value);
            },
            app.config.globalProperties.$toWei = (value: any) => {
                return Converter.toWei(value);
            },
            app.config.globalProperties.$toDate = (value: any) => {
                return Countdown.toDate(value);
            };
        app.config.globalProperties.$fineHash = (hash: any, sapce: number) => {
            return Converter.fineHash(hash, sapce);
        };
    }
};