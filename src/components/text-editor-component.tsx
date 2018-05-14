import * as React from 'react';

import {Dispatch} from 'redux';

import * as  ObjectAssign from 'object-assign';
import {connect} from 'react-redux';
import TextEditorActions from "../actions/text-editor-actions";

export interface TextProps {
    dispatch?: Dispatch<ApplicationRootState>;
    currentContent?: string
    currentId?: number
    paragraphs?: Array<IParagraph>

}

class TextComponent extends React.Component<TextProps, TextState> {
    currentContent:string;
    constructor(props: TextProps) {
        super(props);
        //this.state = {currentContent: 'defaultText', paragraphs: []} as TextState;
      //  this.currentContent = searchParagraphContent(props.paragraphs, props.currentId)
      //  this.currentContent="fff"+Math.random();
    }

    changeEditedParagraph = (id: number, event: any) => {
       // var newparagraphs: Array<IParagraph> = this.switchPara();
        console.log(this)
        this.props.dispatch(TextEditorActions.saveParagraphAction(this.props.currentId,this.props.currentContent))
        this.props.dispatch(TextEditorActions.loadParagraphAction(id))


    };

    newParagraph = (event: any) => {
        console.log("newParagraph")
        this.props.dispatch(TextEditorActions.saveParagraphAction(this.props.currentId,this.props.currentContent))
        this.props.dispatch(TextEditorActions.newParagraphAction())
    };

    save=() =>{
        console.log("ss")
        this.props.dispatch(TextEditorActions.saveParagraphAction(this.props.currentId,this.props.currentContent))
    };

    handleCurrentChange = (event: any): void => {
        let target = event.target;
        if (target) {
            this.setState((prevState: TextState) => ObjectAssign(prevState, {currentContent: target.value}))
            this.props.currentContent = target.value;
        }
    };

    render() {
        return (<div>Hello text agazinr
            <textarea value={this.props.currentContent}
                      onChange={this.handleCurrentChange}></textarea> : {this.props.currentContent}{this.props.currentId}
            <button onClick={this.save}>Save</button>
            <button onClick={this.newParagraph}>newParagraph</button>
            <ul>
                {
                    this.props.paragraphs.map((p: IParagraph) => {
                        return (<li onClick={e => this.changeEditedParagraph(p.id, e)}>{p.id} - {p.content}</li>)
                    })

                }</ul>
        </div>)
    }
}

export function searchParagraph(paragraphs: Array<IParagraph>, id: number, callback: (value: IParagraph, index: number, array: IParagraph[]) => void=null): IParagraph {
    if (callback)
        paragraphs.filter((p) => p.id == id).forEach(callback);
    else
        return paragraphs.filter((p) => p.id == id)[0]
}
function searchParagraphContent(paragraphs: Array<IParagraph>, id: number): string {
    let iParagraphs = paragraphs.filter((p) => p.id == id);
    return iParagraphs.length==0?"":iParagraphs[0].content;
}

function mapStateToProps(state: ApplicationRootState, props: TextProps): TextProps {
    console.log("mapStateToProps"+state.textState.currentContent)
    return {
        currentContent: state.textState.currentContent,
        currentId: state.textState.currentParagrapheId,
        paragraphs: state.textState.paragraphs
    } as TextProps
}

const TextComponentContainer = connect(mapStateToProps)(TextComponent);

export default TextComponentContainer;