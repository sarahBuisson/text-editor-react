import {Dispatch} from 'redux';


export enum TypeActions {
    "SAVE_PARAGRAPH","LOAD_PARAGRAPH", "NEW_PARAGRAPH"
}


export default class TextEditorActions {


    static saveParagraphAction(currentId: number, currentContent: string): Action {
        return {type: TypeActions.SAVE_PARAGRAPH.toString(), id: currentId, content: currentContent} as Action

    }
    static loadParagraphAction(id: number): Action {
        return {type: TypeActions.LOAD_PARAGRAPH.toString(), id: id} as Action

    }
    static newParagraphAction(): Action {
        return {type: TypeActions.NEW_PARAGRAPH.toString()} as Action

    }

    static saveParagraph(id: number, content: string): any {
        return ((dispatch: Dispatch<ApplicationRootState>) => {
            dispatch(TextEditorActions.saveParagraphAction(id, content));
        })

    }
}