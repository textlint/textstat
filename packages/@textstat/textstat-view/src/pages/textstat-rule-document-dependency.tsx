import * as React from "react";
import { StatContext } from "../context/StatContext";
import { DocumentDependencyView } from "../components/DocumentDependencyView/DocumentDependencyView";

export class TextstatRuleDocumentDependency extends React.Component {
    state = {
        reverse: false
    };

    private onChangeCheckbox = () => {
        this.setState({
            reverse: !this.state.reverse
        });
    };

    render() {
        return (
            <StatContext.Consumer>
                {({ results }) => {
                    return (
                        <div style={{ width: "100%", height: "100%" }}>
                            <input
                                type="checkbox"
                                id="dependency-reverse"
                                checked={this.state.reverse}
                                onChange={this.onChangeCheckbox}
                            />
                            <label htmlFor="dependency-reverse">Reverse dependency flow?</label>
                            <DocumentDependencyView results={results} reverse={this.state.reverse} />
                        </div>
                    );
                }}
            </StatContext.Consumer>
        );
    }
}

export default function() {
    return <TextstatRuleDocumentDependency />;
}
