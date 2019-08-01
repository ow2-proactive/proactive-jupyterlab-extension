import * as React from 'react';

import {InputText} from 'primereact/inputtext';

import 'primereact/resources/primereact.min.css';
import 'primereact/resources/themes/nova-light/theme.css';
import 'primeicons/primeicons.css';

interface ProactiveHostInputTextProps {}
interface ProactiveHostInputTextState {
    hostValue: string;
}

export class ProactiveHostInputText extends React.Component<ProactiveHostInputTextProps, ProactiveHostInputTextState> {

    constructor(props: ProactiveHostInputTextProps) {
        super(props);
        this.state = {
            hostValue: ""
        };
        this.updateHostValue = this.updateHostValue.bind(this);
    }

    updateHostValue(e: React.ChangeEvent<HTMLInputElement>) {
        this.setState({
            hostValue: e.target.value
        }, () => {
            console.log("Host value: " + this.state.hostValue);
        });
    }

    render() {
        const hostValue = this.state.hostValue;
        return (
            <div>
                <span className="p-float-label">
                    <InputText id="float-input" type="text" value={hostValue} onChange={this.updateHostValue} />
                    <label htmlFor="float-input">Host</label>
                </span>
            </div>
        )
    }
}

export default ProactiveHostInputText;