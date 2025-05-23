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
                    <p>Also support ?gist=gistID</p>
                    <p>
                        Example:
                        <a href="https://textstat-viewer.netlify.com/?gist=3216e61067d0239ed0fd71af0af18fe3">
                            https://textstat-viewer.netlify.com/?gist=3216e61067d0239ed0fd71af0af18fe3
                        </a>
                    </p>
                </div>
            )
        }),
        "/textstat-rule-document-dependency": createPage({
            title: "textstat-rule-document-dependency",
            getContent: () => import("./textstat-rule-document-dependency")
        }),
        "/textstat-rule-number-of-characters": createPage({
            title: "textstat-rule-number-of-characters",
            getContent: () => import("./textstat-rule-number-of-characters")
        })
    }
});
