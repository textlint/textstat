// App.js
import * as React from "react";
import * as url from "url";
import { ChangeEvent } from "react";
import { NavLoading, NavProvider, NavRoute } from "react-navi";
import { BrowserNavigation } from "navi";
import { StatContext } from "./context/StatContext";
import { getStore, saveStore } from "./context/LocalStore";
import { AppMenu } from "./AppMenu";
import "./App.css";
import { fetchGistContent } from "./context/GistStore";

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

    componentDidMount(): void {
        const urlObject = url.parse(location.href, true);
        if (urlObject.query && typeof urlObject.query.gist === "string") {
            fetchGistContent(urlObject.query.gist)
                .then(content => {
                    try {
                        const state = JSON.parse(content);
                        this.setState({
                            input: content,
                            results: state
                        });
                    } catch (error) {
                        console.error("parse error ?gist", error);
                    }
                })
                .catch(error => {
                    console.error("Gist Fetch Error", error);
                });
        }
    }

    render() {
        return (
            <NavProvider navigation={this.props.navigation}>
                <div className="App">
                    <header className="App-header">
                        <label>
                            State:
                            <textarea
                                className={"App-input"}
                                value={this.state.input}
                                onChange={this.onChangeTextarea}
                            />
                        </label>
                        <AppMenu />
                    </header>
                    <main className="App-main">
                        <NavLoading>
                            {isLoading => {
                                return isLoading ? <p className={"App-mainLoading"}>Loading</p> : null;
                            }}
                        </NavLoading>
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
