"use strict";

class LogoutButton {
    constructor() {
        this.logoutBtn = null;
        this.action = this.logoutClick.bind(this);
    }

    logoutClick() {
        setTimeout(() => {
            ApiConnector.logout(response => {
                if(response.success) {
                    location.reload();
                }
            })
        }, 0);
    }
}

class ProfileWidget {
    showProfile(data) {
        console.log(data);
    }
}

setTimeout(() => {
    ApiConnector.current(response => {
        if(response.success) {
            ProfileWidget.showProfile(response);
        }
    })
}, 0);

class RatesBoard {
   constructor() {
    this.tableBody = null;
   }

   fillTable(data) {
    this.tableBody = data;
   }

   clearTable() {
    this.tableBody = [];
   }
}

function getRates() {
    setTimeout(() => {
        ApiConnector.getStocks(response => {
            if(response.success) {
                RatesBoard.clearTable();
                RatesBoard.fillTable(response.data);
            }
        })
    }, 0);
};

   getRates();
   setInterval(getRates, 60000);



   class MoneyManager {
    constructor() {
        this.addMoneyForm = null;
        this.conversionMoneyForm = null;
        this.sendMoneyForm = null;
        this.errorMessageBlock = null;
        this.addMoneyCallback = this.addMoneyAction.bind(this);
        this.conversionMoneyCallback = this.conversionMoneyAction.bind(this);
        this.sendMoneyCallback = this.sendMoneyAction.bind(this);
    }

    addMoneyAction(data) {
        setTimeout(() => {
            ApiConnector.addMoney(data, response => {
                if(response.success) {
                    ProfileWidget.showProfile(response.data);
                    this.setMessage("Перевод выполнен успешно!");
                }
                this.setMessage(response.error);
            })
        }, 0);
    }

    conversionMoneyAction(data) {
        setTimeout(() => {
            ApiConnector.convertMoney(data, response => {
                if(response.success) {
                    ProfileWidget.showProfile(response.data);
                    this.setMessage("Конвертация прошла успешна!");
                }
                this.setMessage(response.error);
            })
        }, 0);
    }

    sendMoneyAction(data) {
        setTimeout(() => {
            ApiConnector.transferMoney(data, response => {
                if(response.success) {
                    ProfileWidget.showProfile(response.data);
                }
                this.setMessage(response.success, response.success ? "Перевод выполнен успешно!" : response.error);
            })
        }, 0);
    }

    setMessage(isSuccess,message) {
        console.log(isSuccess ? "SUCCESS:" : "ERROR:", message);
        this.errorMessageBlock = {isSuccess, message};
    }

    updateUsersList(data) {
        this.usersList = data;
    }
   }

   class FavoritesWidget {
    constructor() {
        this.favoritesTableBody = setTimeout(() => {
            ApiConnector.getFavorites(data, response => {
                if(response.success) {
                    this.clearTable();
                    this.fillTable(response.data);
                    MoneyManager.updateUsersList(response.data);
                }
            })
        }, 0);
        this.addUserToFavoritesForm = null;
        this.favoritesMessageBox = null;
        this.addUserCallback = this.addUserAction.bind(this);
        this.removeUserCallback = this.removeUserAction.bind(this);
    }

    addUserAction(data) {
        setTimeout(() => {
            ApiConnector.addUserToFavorites(data, (response) => {
                if (response.success) {
                    this.clearTable();
                    this.fillTable(response.data);
                    MoneyManager.updateUsersList(response.data);
                }
                this.setMessage(response.success, response.success ? "Пользователь добавлен!" : response.error);
            });
        }, 0);
    }

    removeUserAction(id) {
        setTimeout(() => {
            ApiConnector.removeUserFromFavorites(id, (response) => {
                if (response.success) {
                    this.clearTable();
                    this.fillTable(response.data);
                    MoneyManager.updateUsersList(response.data);
                }
                this.setMessage(response.success, response.success ? "Пользователь удалён!" : response.error);
            });
        }, 0);
    }

    fillTable(data) {
        this.favoritesTableBody = data; 
    }

    clearTable() {
        this.favoritesTableBody = [];
    }

    setMessage(isSuccess, message) {
        console.log(isSuccess ? "SUCCESS:" : "ERROR:", message);
        this.favoritesMessageBox = { isSuccess, message };
    }

    getData(data) {
        this.addUserToFavoritesForm = data;
    }

   }