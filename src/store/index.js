import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        comments: [],
        command: {}
    },
    mutations: {
        sendComment(state, {comment, command}) {
            document.querySelector(".KHxj8b.tL9Q4c").value = JSON.stringify({comment, command});
            const button = document.querySelector(".uArJ5e.Y5FYJe.cjq2Db.IOMpW.Cs0vCd");
            button.setAttribute("aria-disabled", "false");
            button.className = "uArJ5e Y5FYJe cjq2Db IOMpW Cs0vCd";
            button.click();
        },
        updateComments(state, {comment, command}) {
            state.comments.splice(state.comments.length, 0, comment);
            state.command = command;
        }
    },
    getters: {
        comments: state => {
            return state.comments;
        }
    },
    actions: {},
    modules: {}
})
