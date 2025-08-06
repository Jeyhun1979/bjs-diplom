"use strict";

class UserForm {
    constructor() {
        this.loginForm = null;
        this.registerForm = null;
        this.loginErrorMessageBox = null;
        this.registerErrorMessageBox = null;
        this.loginFormCallback = this.loginFormAction.bind(this);
        this.registerFormCallback = this.registerFormAction.bind(this);
    }

    setLoginErrorMessage(message) {
        if (this.loginErrorMessageBox) {
            this.loginErrorMessageBox.textContent = message;
        } else {
            console.warn(message);
        }
    }

    setRegisterErrorMessage(message) {
        if (this.registerErrorMessageBox) {
            this.registerErrorMessageBox.textContent = message;
        } else {
            console.warn(message);
        }
    }

    loginFormAction(data) {
        setTimeout(() => {
            ApiConnector.login(data, response => {
                if(response.success) {
                    location.reload();  
                } else {
                    this.setLoginErrorMessage(response.error);
                }

            })
        }, 0);
    }

    registerFormAction(data) {
        setTimeout(() => {
            ApiConnector.register(data, response => {
                if(response.success) {
                    location.reload();  
                } else {
                    this.setRegisterErrorMessage(response.error);
                }
            })
        }, 0)
    }

    getData(form) {
        const data = {};
        if (form) {
            if (form.login !== undefined) { 
                data.login = form.login;
            }
            if (form.password !== undefined) {
                data.password = form.password;
            }
        }
        return data;
    }
}