import React, { Component, createElement } from "react";

import SunEditorCustomWidget from "./components/SunEditor_CustomWidget";
import "./ui/SunEditorMendix.css";

export default class SunEditorMendix extends Component {
    constructor(props) {
        super(props);

        this.onClickHandler = this.onClick.bind(this);
        this.onUpdate = this.onUpdate.bind(this);
    }

    render() {
        return (
            <>
                {this.props.htmlAttribute.status === "available" && (
                    <SunEditorCustomWidget
                        className={this.props.class}
                        clickable={!!this.props.onClickAction}
                        defaultValue={this.props.defaultValue || ""}
                        onClickAction={this.onClickHandler}
                        style={this.props.style}
                        value={this.props.htmlAttribute.value || ""}
                        displayOnly={this.props.displayOnly}
                        onUpdate={this.onUpdate}
                        minWidth={this.props.minWidth}
                        minHeight={this.props.minHeight}                        
                        width={this.props.width}
                        height={this.props.height}                       
                        maxWidth={this.props.maxWidth}
                        maxHeight={this.props.maxHeight}
                        maxCharacters={this.props.maxCharacters}
                        charCounterType={this.props.charCounterType}
                        availableButtons={this.props.availableButtons}
                        saveAction={this.props.saveAction}
                        customButtons={this.props.customButtons}
                        fonts={this.props.fonts} 
                        imageFileInput={this.props.imageFileInput}
                        imageUrlInput={this.props.imageUrlInput}
                        imageUploadSizeLimit={this.props.imageUploadSizeLimit}
                        imageAccept={this.props.imageAccept}
                    />
                )}
            </> 
        );
    }

    onUpdate(value) {
        //check for empty input -> return empty string
        let match = value.match(/^<[A-Za-z]{1,3}>((<[A-Za-z]{1,3}(\/?)>|\s|&nbsp;)*)<\/[A-Za-z]{1,3}>$/g);
        if (match !== null){
            this.props.htmlAttribute.setValue("");
        } else {
            this.props.htmlAttribute.setValue(value);
        }
    }

    onClick() {
        if (this.props.onClickAction && this.props.onClickAction.canExecute) {
            this.props.onClickAction.execute();
        }
    }
}
