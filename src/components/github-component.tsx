import * as React from 'react';

import {connect} from 'react-redux';
import {Dispatch} from 'redux';
import GithubActions from "../actions/github-actions";
import {TextProps} from "./text-editor-component";

export interface GithubProps {
    dispatch?: Dispatch<ApplicationRootState>;
    login?: string;
    token?: string;
    repository?: string;
    branch?: string

}

class GithubComponent extends React.Component<GithubProps, GithubState> {

    saveGithub=()=> {
        console.log("saveGithub")
        this.props.dispatch(GithubActions.saveGithub("sarahBuisson/pitest-xebicon-demo",this.props.login, this.props.token))
    }

    render() {

        return (<div><input value={this.props.login}/><input value={this.props.token}/>
            <button onClick={this.saveGithub}>commit</button>
        </div>)
    }
}


function mapStateToProps(state: ApplicationRootState, props: GithubProps): GithubProps {

    return {

    } as GithubProps
}

const GithubComponentContainer = connect(mapStateToProps)(GithubComponent);

export default GithubComponentContainer;