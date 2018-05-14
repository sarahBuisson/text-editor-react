import * as React from 'react'


import TextComponent from './text-editor-component';
import GithubComponent from './github-component';

class App extends React.Component<any,any> {
    render() {
        return (
            <div>
                <GithubComponent/>
                <TextComponent/>
            </div>
        );
    }
}

export default App;