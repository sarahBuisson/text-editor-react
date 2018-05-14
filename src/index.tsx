import {initText} from "./reducers/text-reducer";


require('es6-promise/auto');
import * as React from "react";
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import configureStore from './store/configureStore';
import ContactComponent from './components/contact-component';
import TextComponent from './components/text-editor-component';
import SampleComponent from './components/sample-component';
import GithubComponent from './components/github-component';
import App from "./components/App";

const store = configureStore({ contactState:null,
textState:initText()} as ApplicationRootState);
const defaultContent:string ="new Textt"
const defaultId:number=null
const paragraphs:Array<IParagraph>=[]
ReactDOM.render(
    <Provider store={store}>
        <App/>

    </Provider>,
    document.getElementById('app')
);