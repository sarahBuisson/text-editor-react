declare type actionTypes = ILoadContactAction | ISaveContactAction | Action;

declare type composeWithDevTools = any;

interface Action {
    type: string;
}

interface ILoadContactAction extends Action {
    contacts: Array<IContact>;
}

interface ISaveContactAction extends Action {
    contact: IContact;
}

interface IContact {
    id: number;
    title: string;
}

interface ApplicationRootState {
    contactState: ContactState;
    textState: TextState;
    githubState: GithubState;
}

interface ContactState {
    contacts: Array<IContact>;
    isSaving: boolean;
    isLoading: boolean;
}

interface IParagraph {
    id: number;
    content: string;
    tags: Array<string>;
}


interface TextState {
    currentContent: string
    currentParagrapheId: number
    nextParagraphId: number
    paragraphs: Array<IParagraph>,

}

interface GithubState {
    inProgress:boolean;
    inError:boolean;
    message:string;

}