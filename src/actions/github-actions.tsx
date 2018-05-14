import {Dispatch} from 'redux';
import axios from 'axios';

export enum GithubTypeActions {
    "SAVE_IN_PROGRESS","SAVE_SUCCESS","SAVE_ERROR"
}


export default class GithubActions {


    static saveSuccessAction(res:any): Action {
        return {type: GithubTypeActions.SAVE_SUCCESS.toString(), response:res} as Action

    }

    static saveErrorAction(error: any): Action {
        return {type: GithubTypeActions.SAVE_ERROR.toString(), error: error} as Action
    }

    static saveInProgressAction(): Action {

        return {type: GithubTypeActions.SAVE_IN_PROGRESS.toString()} as Action

    }


    static saveGithub(repository:string, login:string, token:string): Promise<any>| any {
        console.log("in save")
        return ((dispatch: Dispatch<ApplicationRootState>) => {
            dispatch(GithubActions.saveInProgressAction());

            console.log("in progress")
            let url = "https://api.github.com/repos/"+repository+"/contents/datafile.json";
            console.log(url);

            axios.get("https://api.github.com/repos/"+repository+"/git/refs/heads/master/datafile.json",{});

            axios.put(url,{
                "message": "my commit message",
                "committer": {
                    "name": "Sarah Buisson",
                    "email": "schacon@gmail.com"
                },
                "content": "bXkgdXBkYXRlZCBmaWxlIGNvbnRlbnRz",
                "sha": "329688480d39049927147c162b9d2deaf885005f"
            }).then((res) => {
                console.log("success")
                dispatch(GithubActions.saveSuccessAction(res));
            }) .catch(res => {

                console.log("error")
                console.log(res)
                dispatch(GithubActions.saveErrorAction(res));
            })


        });


    }
}