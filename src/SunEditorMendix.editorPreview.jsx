import { Component, createElement } from "react";

import { parseInlineStyle } from "@mendix/pluggable-widgets-tools";

import SunEditorCustomWidget from "./components/SunEditor_CustomWidget";

export class preview extends Component {
    render() {
        return (
            <div ref={this.parentInline}>
                <SunEditorCustomWidget {...this.transformProps(this.props)}></SunEditorCustomWidget>
            </div>
        ); 
    }

    parentInline(node) {
        // Temporary fix, the web modeler add a containing div, to render inline we need to change it.
        if (node && node.parentElement && node.parentElement.parentElement) {
            node.parentElement.parentElement.style.display = "inline-block";
        }
    }

    transformProps(props) {
        return {
            type: props.suneditormendixType,
            bootstrapStyle: props.bootstrapStyle,
            className: props.class,
            clickable: false,
            style: parseInlineStyle(props.style),
            defaultValue: props.suneditormendixValue ? props.suneditormendixValue : "",
            value: props.valueAttribute
        };
    }
}

export function getPreviewCss() {
    return require("./ui/SunEditorMendix.css");
}
