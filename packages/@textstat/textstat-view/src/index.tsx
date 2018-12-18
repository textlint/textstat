// index.js
import * as React from "react";
import * as ReactDOM from "react-dom";
import * as Navi from "navi";
import pages from "./pages/index";
import App from "./App";
import { unregister } from "./serviceWorker";

async function main() {
    let navigation = Navi.createBrowserNavigation({ pages });
    // Wait until async content is ready, or has failed.
    await navigation.steady();

    ReactDOM.render(<App navigation={navigation} />, document.getElementById("root"));
}

Navi.app({
    pages,
    main,
    exports: App
});
unregister();
