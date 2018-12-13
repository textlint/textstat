import * as React from "react";
import { createPage, createSwitch } from "navi";

export default createSwitch({
    paths: {
        "/": createPage({
            title: "textstat-viewer",
            content: (
                <div>
                    <ul>
                        <ol>Fill "State" with JSON string of textstat</ol>
                        <ol>Select a view from menu sidebar</ol>
                    </ul>
                </div>
            )
        }),
        "/textstat-rule-document-dependency": createPage({
            title: "textstat-rule-document-dependency",
            getContent: () => import("./textstat-rule-document-dependency")
        })
    }
});
