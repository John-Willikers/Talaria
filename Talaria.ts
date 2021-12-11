/*
    A really fast low level wrapper around XMLHttpRequest.
    Named after Herme's winged sandals (Talaria)
    
    Automates handling FormData
*/
import { FormObject } from './Interfaces';

export class Talaria extends XMLHttpRequest {
    formData: FormData | null = null;
    method: string;

    constructor (url: string, method: string, asynchronous: boolean = false) {
        super();
        this.method = method;
        this.open(method, url, asynchronous);
        if (asynchronous && method.toLowerCase() === 'get') {
            this.onload = function () {
                console.log('We got a GET response!!', this.response);
            }
        } else if(asynchronous && method.toLowerCase() === 'post') {
            this.onreadystatechange = function () {
                if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
                    console.log('We got a POST response!!', this.response);
                } else {
                    console.log('There was an issue');   
                }
            }
        }
    }

    append(objects: FormObject[]) {
        let token = document.querySelector('meta[name=csrf-token]')?.getAttribute('content');
        let formData = new FormData();
        formData.append('_token', (token !== null && token !== undefined) ? token : '');
        objects.forEach(object => {
            formData.append(
                object.name, 
                object.value
            );
        });
        this.formData = formData;
    }

    send(obj?: any) {
        if (obj === undefined) {
            XMLHttpRequest.prototype.send.call(this, this.formData);
        } else {
            XMLHttpRequest.prototype.send.call(this, obj);
        }
    }

    ready(callback: Function) {
        if (this.method.toLowerCase() === 'post') {
            this.onreadystatechange = (event: any) => {
                if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
                    let obj = JSON.parse(this.responseText);
                    callback(obj);
                } else if (this.readyState === XMLHttpRequest.DONE && this.status === 500) {
                    console.log('There was an issue');
                }
            }
        } else if (this.method.toLowerCase() === 'get') {
            this.onload = (data) => {
                let obj = JSON.parse(this.responseText);
                callback(obj);
            }
        }
    }
}