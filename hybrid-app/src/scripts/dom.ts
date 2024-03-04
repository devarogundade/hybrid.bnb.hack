import axios from "axios";

const endPoint = 'https://hybrid-dom.azurewebsites.net/';

export async function bindWallet(owner: string, email: string) {
    try {
        const response = await axios.post(`${endPoint}new-bind?owner=${owner}&email=${email}`);
        return response.data;
    } catch (error: any) {
        console.log(error);
        return error.response.data;
    }
}

export async function getBinding(owner: string) {
    try {
        const response = await axios.post(`${endPoint}get-bind?owner=${owner}`);
        return response.data;
    } catch (error: any) {
        console.log(error);
        return error.response.data;
    }
}

export async function unBindWallet(owner: string) {
    try {
        const response = await axios.post(`${endPoint}delete-bind?owner=${owner}`);
        return response.data;
    } catch (error: any) {
        console.log(error);
        return error.response.data;
    }
}

export async function newSignedMessage(owner: string, data: string) {
    try {
        const response = await axios.post(`${endPoint}new-signedhash?owner=${owner}&data=${data}`);
        return response.data;
    } catch (error: any) {
        console.log(error);
        return error.response.data;
    }
}