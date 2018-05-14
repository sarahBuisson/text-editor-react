import { combineReducers } from 'redux';
import * as  ObjectAssign from 'object-assign';
import ContactActions from '../actions/contact-actions';
import * as CONST from "../interfaces/contact-strings"
import {SampleState} from "../components/sample-component";
import TextEditorActions, {TypeActions} from "../actions/text-editor-actions";


export function initSample(): SampleState {
    return {
        currentContent: "",
        currentId: null,
        paragraphs: []
    }
}
export const SampleReducer = (state: SampleState = initSample(), action: Action|any): SampleState => {
    switch(action.type) {
        case TypeActions.SAVE_PARAGRAPH.toString(): {
            if(!action.id)
                action.id=4;


            return ObjectAssign({} as SampleState, state, {isLoading: true});
        }
            default: return state;


    }
}

export default SampleReducer;
