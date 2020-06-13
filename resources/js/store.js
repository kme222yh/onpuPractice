window.Vuex = require('vuex');

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        is_opend: {
            background: false,
            menu: {
                home: true,
                app: false,
            },
            board: false,
            other: false,

            opening: true,

            message: null,
        }
    },
    mutations: {
        openingClose(state, ){
            state.is_opend.opening = false
        },
        messageOpen(state, payload){
            state.is_opend.message = payload
        },
        menuAppOpen(state){
            state.is_opend.menu.home = false;
            state.is_opend.menu.app = true;
            state.is_opend.background = true;
            state.is_opend.board = false
            state.is_opend.other = false
        },
        menuClose(state){
            state.is_opend.menu.home = true;
            state.is_opend.menu.app = false;
            state.is_opend.background = false;
            state.is_opend.board = false
            state.is_opend.other = false
        },
        notationBoardOpen(state){
            state.is_opend.menu.home = false;
            state.is_opend.menu.app = false;
            state.is_opend.background = true;
            state.is_opend.board = true
            state.is_opend.other = false
        },
        backgroundOpen(state){
            state.is_opend.menu.home = false;
            state.is_opend.menu.app = false;
            state.is_opend.background = true;
            state.is_opend.board = false
            state.is_opend.other = true
        },
        otherPageOpen(state){
            state.is_opend.menu.home = false;
            state.is_opend.menu.app = false;
            state.is_opend.background = false;
            state.is_opend.board = false
            state.is_opend.other = true
        }
    },
    getters: {
    },
    actions: {
        messageOpen(ctx, payload){ctx.commit('messageOpen', payload)},
        openingClose(ctx){ctx.commit('openingClose')},
        menuAppOpen(ctx){ctx.commit('menuAppOpen');},
        menuClose(ctx){ctx.commit('menuClose');},
        notationBoardOpen(ctx){ctx.commit('notationBoardOpen');},
        backgroundOpen(ctx){ctx.commit('backgroundOpen');},
        otherPageOpen(ctx){ctx.commit('otherPageOpen');},
    }
});
