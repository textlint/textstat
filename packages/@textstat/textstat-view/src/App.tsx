"use client";
import * as React from "react";
import * as url from "url";
import { ChangeEvent, useEffect, useState } from "react"; // useEffectとuseStateをインポート
// import { NavLoading, NavProvider, NavRoute } from "react-navi"; // react-navi関連を削除
// import { BrowserNavigation } from "navi"; // react-navi関連を削除
import { Result, StatProvider } from "./context/StatContext"; // Result型をインポート
import { getStore, saveStore } from "./context/LocalStore";
import { AppMenu } from "./AppMenu";
import "./App.css";
import { fetchGistContent } from "./context/GistStore";

// AppPropsからnavigationを削除
// export interface AppProps {
//     navigation: BrowserNavigation<any>;
// }

// クラスコンポーネントを関数コンポーネントに変換
const App = () => {
    // AppPropsを削除
    const [state, setState] = useState(
        getStore({
            input: "[]",
            results: [] as Result[] // resultsの型を明示
        })
    );

    const onChangeTextarea = (event: ChangeEvent<HTMLTextAreaElement>) => {
        const input = event.currentTarget.value;
        let results = state.results;
        try {
            results = JSON.parse(input);
        } catch (error) {
            // nope
        }
        const newState = {
            input: input,
            results: results
        };
        setState(newState);
        saveStore(newState);
    };

    useEffect(() => {
        const urlObject = url.parse(location.href, true);
        if (urlObject.query && typeof urlObject.query.gist === "string") {
            fetchGistContent(urlObject.query.gist)
                .then(content => {
                    try {
                        const parsedResults = JSON.parse(content); // 変数名を変更
                        setState({
                            input: content,
                            results: parsedResults
                        });
                    } catch (error) {
                        console.error("parse error ?gist", error);
                    }
                })
                .catch(error => {
                    console.error("Gist Fetch Error", error);
                });
        }
    }, []); // componentDidMountの代わりにuseEffectを使用

    return (
        // <NavProvider navigation={props.navigation}> // react-navi関連を削除
        <div className="App">
            <header className="App-header">
                <label>
                    State:
                    <textarea className={"App-input"} value={state.input} onChange={onChangeTextarea} />
                </label>
                <AppMenu />
            </header>
            <main className="App-main">
                {/* <NavLoading> // react-navi関連を削除
                        {isLoading => {
                            return isLoading ? <p className={"App-mainLoading"}>Loading</p> : null;
                        }}
                    </NavLoading> */}
                <StatProvider value={state}>
                    {/* <NavRoute /> // react-navi関連を削除。代わりにchildrenや具体的なコンポーネントを配置 */}
                    {/* Next.jsのルーティングでは、ページコンポーネントがここに表示されることを期待します。 */}
                    {/* この部分は、Appコンポーネントがどのようにページコンテンツを表示するかに依存します。 */}
                    {/* 今回はAppがレイアウトの役割を担い、ページ内容はNext.jsがsrc/app以下のpage.tsxで制御すると仮定 */}
                </StatProvider>
            </main>
        </div>
        // </NavProvider> // react-navi関連を削除
    );
};

export default App;
