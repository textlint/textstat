import React from "react";

export default function Page() {
    return (
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
    );
}
