import * as React from 'react';

import {Dispatch} from 'redux';

import {connect} from 'react-redux';
import TextEditorActions from "../actions/text-editor-actions";

class Paragraph implements IParagraph {
    id: number = 1;
    content: string = "";
    tags: Array<string> = [];

}

export interface SampleProps {
    dispatch?: Dispatch<ApplicationRootState>;
    currentContent: string
    currentId: number
    paragraphs: Array<IParagraph>

}

export interface SampleState {
    currentContent: string
    currentId: number
    paragraphs: Array<IParagraph>
}


class SampleComponent extends React.Component<SampleProps, SampleState> {

    constructor(props: SampleProps) {
        super(props);
        this.state = {currentContent: 'defaultText', paragraphs: []} as SampleState;

    }

    changeEditedParagraph = (id: number, event: any) => {
        var newparagraphs: Array<IParagraph> = this.switchPara();



        this.props.dispatch(TextEditorActions.saveParagraphAction(this.state.currentId,this.state.currentContent))

        this.setState((prevState: SampleState) => ({
            currentId: id,
            currentContent: searchParagraph(this.state.paragraphs, id).content,
            paragraphs: newparagraphs
        } as SampleState));

    };

    newParagraph = (event: any) => {
        console.log("nex")
        var newparagraphs = this.switchPara();

        this.setState((prevState: SampleState) => ({
            currentId: null,
            currentContent: "",
            paragraphs: newparagraphs
        } as SampleState));
        console.log("se2")
    };

    private switchPara() {
        var newparagraphs: Array<IParagraph> = this.state.paragraphs;

        var paragraph = searchParagraph(this.state.paragraphs, this.state.currentId);
        if (!this.state.currentId || !paragraph)
            newparagraphs.push({content: this.state.currentContent} as IParagraph);
        else
            paragraph.content = this.state.currentContent;
        return newparagraphs;
    }



    save() {
        console.log("save")
    }

    handleCurrentChange = (event: any): void => {
        let target = event.target;
        if (target) {
            this.setState((prevState: SampleState) => {

                    var id = target.value;
                    return (
                        {
                            currentId: prevState.currentId,
                            currentContent: target.value,
                            paragraphs: prevState.paragraphs
                        } as SampleState)

                }
            );
        }

    };

    render() {
        return (<div>Hello sample agazinr
            <textarea value={this.props.currentContent}
                      onChange={this.handleCurrentChange}></textarea> : {this.state.currentContent}
            <button onClick={this.save}>Save</button>
            <button onClick={this.newParagraph}>newParagraph</button>
            <ul>
                {
                    this.state.paragraphs.map((p: IParagraph) => {
                        return (<li onClick={e => this.changeEditedParagraph(p.id, e)}>{p.content}</li>)
                    })

                }</ul>
        </div>)
    }
}

function searchParagraph(paragraphs: Array<IParagraph>, id: number): IParagraph {
    return paragraphs.filter((p) => p.id == id)[0]
}

function mapStateToProps(state: ApplicationRootState, props: SampleProps): SampleProps {
    return {
        currentContent: searchParagraph(state.textState.paragraphs, state.textState.currentParagrapheId).content,
        currentId: state.textState.currentParagrapheId,
        paragraphs: state.textState.paragraphs
    } as SampleProps
}

const SampleComponentContainer = connect(mapStateToProps)(SampleComponent);

export default SampleComponentContainer;