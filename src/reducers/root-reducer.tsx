import { combineReducers } from 'redux';
import ContactReducer from './contact-reducer'
import TextReducer from "./text-reducer";
import {GithubReducer} from "./github-reducer";

export default combineReducers({
    contactState: ContactReducer,
    textState: TextReducer,
    githubState: GithubReducer

})