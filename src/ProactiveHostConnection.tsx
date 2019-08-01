import * as React from 'react';

import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';

import 'primereact/resources/primereact.min.css';
import 'primereact/resources/themes/nova-light/theme.css';
import 'primeicons/primeicons.css';

import '../style/ProactiveHostConnection.css'

type ProactiveHostParams = {
    host: string;
    port: string;
    user: string;
    pass: string;
}

interface ProactiveHostConnectionProps {
    callback: ((params: ProactiveHostParams) => void);
    //callback: ((host: string) => void);
    //callback: Function;
    //callback: any;
}

interface ProactiveHostConnectionState {
    count: number;
    host: string;
    user: string;
    pass: string;
}

function isEmpty(val: any){
    return (val === undefined || val == null || val.length <= 0) ? true : false;
}

class ProactiveHostConnection extends React.Component<ProactiveHostConnectionProps, ProactiveHostConnectionState> {

    constructor(props: ProactiveHostConnectionProps) {
        super(props);
        this.state = {
            count: 0,
            host: "try.activeeon.com:8080",
            user: "",
            pass: ""
        };
        this.connect = this.connect.bind(this);
        this.updateHost = this.updateHost.bind(this);
        this.updateUser = this.updateUser.bind(this);
        this.updatePass = this.updatePass.bind(this);
    }

    getProactiveHostParams() {
        let host_split = this.state.host.split(":", 2);
        let host = host_split[0];
        let port = "";
        if(isEmpty(host_split[1])){
            port = "8080";
        }else{
            port = host_split[1];
        }
        let params: ProactiveHostParams = {
            host: host,
            port: port,
            user: this.state.user,
            pass: this.state.pass
        };
        return params;
    }

    connect() {
        this.setState({
            count: this.state.count + 1
        }, () => {
            let params = this.getProactiveHostParams();
            //console.log("Number of clicks: " + this.state.count);
            //console.log("Connecting to");
            //console.log(params);
            this.props.callback(params)
        });
    }

    updateHost(e: React.ChangeEvent<HTMLInputElement>) {
        this.setState({
            host: e.target.value
        }, () => {
            // console.log("Host: " + this.state.host);
        });
    }

    updateUser(e: React.ChangeEvent<HTMLInputElement>) {
        this.setState({
            user: e.target.value
        }, () => {
            // console.log("User: " + this.state.user);
        });
    }

    updatePass(e: React.ChangeEvent<HTMLInputElement>) {
        this.setState({
            pass: e.target.value
        }, () => {
            // console.log("Pass: " + this.state.pass);
        });
    }

    render() {
        const host = this.state.host;
        const user = this.state.user;
        const pass = this.state.pass;
        //  icon="pi pi-check"
        return (
            <div>
                <Button id="btn_connect" label="Connect" onClick={this.connect} className="p-button-secondary ui-button-connect" />
                <span className="p-text"> Host: </span>
                <InputText id="host-input" type="text" value={host} onChange={this.updateHost} className="ui-input-text-host" />
                <span className="p-text"> User: </span>
                <InputText id="user-input" type="text" value={user} onChange={this.updateUser} className="ui-input-text-user" />
                <span className="p-text"> Password: </span>
                <Password id="pass-input" type="text" value={pass} onChange={this.updatePass} className="ui-input-text-pass" feedback={false} />
            </div>
        );
    }
}

export default ProactiveHostConnection;