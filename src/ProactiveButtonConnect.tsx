import * as React from 'react';

import { Button } from 'primereact/button';

import 'primereact/resources/primereact.min.css';
import 'primereact/resources/themes/nova-light/theme.css';
import 'primeicons/primeicons.css';

interface ProactiveButtonConnectProps {}
interface ProactiveButtonConnectState {
    count: number;
}

class ProactiveButtonConnect extends React.Component<ProactiveButtonConnectProps, ProactiveButtonConnectState> {

    constructor(props: ProactiveButtonConnectProps) {
        super(props);
        this.state = {
            count: 0
        };
        this.increment = this.increment.bind(this);
    }

    increment() {
        this.setState({
            count: this.state.count + 1
        }, () => {
            console.log("Number of Clicks: " + this.state.count);
        });
    }

    render() {
        return (
            <div>
                <Button label="Connect" icon="pi pi-check" onClick={this.increment} />
            </div>
        );
    }
}

export default ProactiveButtonConnect;