import { defineStore } from "pinia"

const loggedUserNameFromLocalStore = JSON.parse(localStorage.getItem("userName"));
const loggedUserIdFromLocalStore = JSON.parse(localStorage.getItem("uid"));
const loggedInStatusFromLocalStore = JSON.parse(localStorage.getItem("loggedIn"));


export const useUserStore = defineStore('user', {
    state: () => ({
        uid: loggedUserIdFromLocalStore,
        name: loggedUserNameFromLocalStore, 
        loggedIn: loggedInStatusFromLocalStore,
    }),
  getters: {
    doubleCount: (state) => state.count * 2,
  },
  actions: {
    increment() {
      this.count++
    },
  },
})