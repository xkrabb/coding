import React from 'react';
import ReactDOM from 'react-dom';
import { action, observable } from 'mobx';
import { MobXProviderContext } from 'mobx-react';

const wrap = document.getElementById('app');

class Store {
    timer = 0;
    reset = () => {
        this.timer = 0;
    };
    increase = () => {
        this.timer++;
    };
}
observable(Store, {
    timer: observable,
    reset: action,
    increase: action
});

const store = new Store();

const App = () => {
    return (
        <>
            <p>{store.timer}</p>
            <button onClick={store.increase}>reset</button>
            <button onClick={store.increase}>increase</button>
        </>
    );
};

ReactDOM.render(
    <MobXProviderContext value={store}>
        <App />
    </MobXProviderContext>,
    wrap
);
