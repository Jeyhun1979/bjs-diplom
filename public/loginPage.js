"use strict";

const userForm = new UserForm();

userForm.loginFormCallback = (data) => {
  setTimeout(() => {
    ApiConnector.login(data, (response) => {
      if (response.success) {
        location.reload();
      } else {
        userForm.setLoginErrorMessage(response.error);
      }
    });
  }, 0);
};

userForm.registerFormCallback = (data) => {
  setTimeout(() => {
    ApiConnector.register(data, (response) => {
      if (response.success) {
        location.reload();
      } else {
        userForm.setRegisterErrorMessage(response.error);
      }
    });
  }, 0);
};