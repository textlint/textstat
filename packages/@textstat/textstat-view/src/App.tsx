// App.js
import * as React from "react";
import { ChangeEvent } from "react";
import { NavProvider, NavRoute } from "react-navi";
import { BrowserNavigation } from "navi";
import { StatContext } from "./context/StatContext";
import { getStore, saveStore } from "./context/LocalStore";
import { AppMenu } from "./AppMenu";
import "./App.css";

export interface AppProps {
    navigation: BrowserNavigation<any>;
}

class App extends React.Component<AppProps> {
    state = getStore({
        input: "[]",
        results: []
    });

    private onChangeTextarea = (event: ChangeEvent<HTMLTextAreaElement>) => {
        const input = event.currentTarget.value;
        let results = this.state.results;
        try {
            results = JSON.parse(input);
        } catch (error) {
            // nope
        }
        const newState = {
            input: input,
            results: results
        };
        this.setState(newState);
        saveStore(newState);
    };

    render() {
        return (
            <NavProvider navigation={this.props.navigation}>
                <div className="App">
                    <header className="App-header">
                        <label>
                            State:
                            <textarea
                                className={"App-input"}
                                defaultValue={this.state.input}
                                onChange={this.onChangeTextarea}
                            />
                        </label>
                        <AppMenu />
                    </header>
                    <main className="App-main">
                        <StatContext.Provider value={this.state}>
                            <NavRoute />
                        </StatContext.Provider>
                    </main>
                </div>
            </NavProvider>
        );
    }
}

export default App;
