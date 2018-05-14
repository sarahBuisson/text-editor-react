import * as  ObjectAssign from 'object-assign';
import {TypeActions} from "../actions/text-editor-actions";
import {searchParagraph} from "../components/text-editor-component";


export function initText(): TextState {
    return {
        currentContent: "",
        currentParagrapheId: null,
        paragraphs: [{content: "rrrr", id: -1} as IParagraph],
        nextParagraphId: 1
    }
}

export const TextReducer = (state: TextState = initText(), action: Action | any): TextState => {
    console.log("type" + action.type.toString());
    switch (action.type) {
        case TypeActions.SAVE_PARAGRAPH.toString(): {

            var nextState = ObjectAssign({} as TextState, state);
            nextState.paragraphs =  nextState.paragraphs.map(it=>ObjectAssign({},it));
            if (!action.id) {
                let id = nextState.nextParagraphId++;
                nextState.currentParagrapheId = id;
                nextState.paragraphs.push({id: id, content: action.content} as IParagraph)
            } else {
                searchParagraph(nextState.paragraphs, action.id,).content=action.content;
            }
            nextState.currentContent=action.content;
            console.log(nextState);
            return nextState;
        }

        case TypeActions.LOAD_PARAGRAPH.toString(): {
            console.log("load" + action.id);


            var nextState = ObjectAssign({} as TextState, TextReducer(state, {
                id: state.currentParagrapheId,
                type: TypeActions.SAVE_PARAGRAPH
            }));
            nextState.currentParagrapheId = action.id;

            nextState.currentContent = searchParagraph(state.paragraphs, action.id).content

            console.log(nextState);
            return nextState;
        }

        case TypeActions.NEW_PARAGRAPH.toString(): {


            var nextState = ObjectAssign({} as TextState, TextReducer(state, {
                id: state.currentParagrapheId,
                type: TypeActions.SAVE_PARAGRAPH
            }));
            nextState.currentParagrapheId = null;
            nextState.currentContent = "new paragraph";
            console.log(nextState);
            return nextState;
        }
        default:
            return state;


    }
};

export default TextReducer;
