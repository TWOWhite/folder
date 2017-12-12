import createStore from './folder';

const defaultState = {
    a: []
};

let index=0;

function render(state) {
    document.body.innerHTML=`<span>${JSON.stringify(state.a)}</span>`;
}

const store = createStore(defaultState);

const actions = store.createActions({
    addState(add) {
        this.path('a',add).set(add);
        this.submit();
    }
});

store.registeWatcher([['a']],render);

setTimeout(()=>{
    actions.addState(index);
    index++;
},1000);
render({a:[1,2,2]})