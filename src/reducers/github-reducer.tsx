import {initText} from "./text-reducer";
import {GithubTypeActions} from "../actions/github-actions";

export const GithubReducer = (state: GithubState = initText(), action: Action | any): GithubState => {
    console.log("type saveGithub" + action.type);
    switch (action.type) {
        case GithubTypeActions.SAVE_IN_PROGRESS.toString():


            return state;
            case GithubTypeActions.SAVE_SUCCESS.toString():
                console.log("SAVE_SUCCESS")

            return state;
    }
    return state;
};