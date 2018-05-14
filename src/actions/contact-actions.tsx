import * as CONST from "../interfaces/contact-strings"
import { Dispatch } from 'redux';
import * as fetch from 'isomorphic-fetch';

export default class ContactActions {
    public static loadContactsSuccess(contacts: Array<IContact>): ILoadContactAction {
        var action: ILoadContactAction = {
            type: CONST.LOAD_CONTACT_SUCCESS,
            contacts: contacts
        };

        return action;
    } 

    public static loadContactsInProgress(): Action {
        var action: Action = {
            type: CONST.LOAD_CONTACT_INPROGRESS
        };

        return action;
    }

    public static loadContactsAsync(): Promise<Array<IContact>> | any {
        return ((dispatch: Dispatch<ApplicationRootState>) => {
            dispatch(ContactActions.loadContactsInProgress());
            return new Promise<Array<IContact>>((resolve, reject) => {
                setTimeout(() => {
                    var tmp: Array<IContact> = [],
                        dt: Date = new Date();

                    tmp.push({ id: dt.getTime(), title: "React" });
                    tmp.push({ id: dt.getTime(), title: "Redux" });
                    tmp.push({ id: dt.getTime(), title: "TypeScript" });

                    resolve(tmp);
                }, 3000);
            })
            .then((values: Array<IContact>) => {
                dispatch(ContactActions.loadContactsSuccess(values));
            });;
        });
    }

    public static saveContactSuccess(contact: IContact): ISaveContactAction {
        var action: ISaveContactAction = {
            type: CONST.SAVE_CONTACT_SUCCESS,
            contact: contact
        };

        return action;
    }

    public static saveContactInProgress(): Action {
        var action: Action = {
            type: CONST.SAVE_CONTACT_INPROGRESS
        }

        return action;
    }

    /*  
        http://redux.js.org/docs/advanced/AsyncActions.html
        http://www.datchley.name/es6-promises/
    */
    public static saveContactAsync(contact: IContact): Promise<IContact> | any {
        return ((dispatch: Dispatch<ApplicationRootState>) => {
            dispatch(ContactActions.saveContactInProgress());
            return new Promise<IContact>((resolve, reject) => {  
                setTimeout(() => {
                    resolve(contact);
                }, 2000);
            })
            .then((value: IContact) => {
                dispatch(ContactActions.saveContactSuccess(value));
            });
        });
    }


}