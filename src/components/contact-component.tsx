import * as React from 'react';
import { Dispatch, Action } from 'redux';
import { connect } from 'react-redux';
import * as $ from "jquery";
import ContactActions from '../actions/contact-actions';

interface ContactProps {
    dispatch?: Dispatch<ApplicationRootState>;
    contacts?: Array<IContact>;
    isSaving?: boolean;
    isLoading?: boolean;
}

class ContactComponent extends React.Component<ContactProps, {}> {
    title: string;

    constructor(props: ContactProps) {
        super(props);
        this.title = '';
    }

    componentDidMount() {
        this.props.dispatch(ContactActions.loadContactsAsync());
    };

    save = () => {
        var contact: IContact = {
            id: new Date().getTime(),
            title: this.title
        }
        this.props.dispatch(ContactActions.saveContactAsync(contact) as any);
    };

    setTitle = (e: any) => {
        this.title = e.target.value;
    };

    contactRow = (c: IContact, idx: number): JSX.Element => {
        return <li key={idx}>{c.title}</li>;
    };

    render() {
        return (
            <div>
                <div>
                    <input type='text' onChange={this.setTitle} />&nbsp;&nbsp;&nbsp;
                    <button onClick={this.save}>Save</button>
                    {this.props.isSaving && 
                        <strong><i>&nbsp;&nbsp;&nbsp;saving, please wait...</i></strong>
                    }
                    {this.props.isLoading && 
                        <strong><i>&nbsp;&nbsp;&nbsp;loading contacts, please wait...</i></strong>
                    }
                </div>

                <div>
                    <ul>
                    { this.props.contacts.map(this.contactRow) }
                    </ul>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state: ApplicationRootState, props: ContactProps): ContactProps {
    return {
        contacts: state.contactState.contacts,
        isSaving: state.contactState.isSaving,
        isLoading: state.contactState.isLoading
    };
}

const ContactComponentContainer = connect(mapStateToProps)(ContactComponent);

export default ContactComponentContainer;