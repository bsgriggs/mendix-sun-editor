import React, { createElement } from "react";
import SunEditor, { buttonList } from "./suneditor-react";
import "./suneditor/dist/css/suneditor.min.css";

const SunEditorCustomWidget = props => {
    const {
        className,
        clickable,
        onClickAction,
        getRef,
        style,
        displayOnly,
        value,
        defaultValue,
        onUpdate,
        minWidth,
        minHeight,      
        width,
        height,     
        maxWidth,
        maxHeight,
        maxCharacters,
        charCounterType,
        availableButtons,
        saveAction,
        customButtons,
        fonts,
        imageFileInput,
        imageUrlInput,
        imageUploadSizeLimit,
        imageAccept,
    } = props;

    const defaultValueText = value ? value : defaultValue;
    const customButtonsList = customButtons
        ? customButtons.map(buttonArray => buttonArray.customButtonArray.split(","))
        : [];
    const availableButtonList = availableButtons != "custom" ? buttonList[availableButtons] : customButtonsList;
    const fontList = fonts.length > 0 ? fonts.map(font => font.font) : [ 'Arial', 'Comic Sans MS', 'Courier New', 'Impact', 'Georgia','tahoma', 'Trebuchet MS', 'Verdana']

    let charCounterTypeString = charCounterType;
    if (charCounterType === 'html'){
        charCounterTypeString = 'byte-html';
    }

    const options = {
        templates: [
            {
                name: "Default",
                html: "<div>" + defaultValueText + "</div>"
            }
        ],
        minWidth: minWidth,
        minHeight: minHeight,        
        width: width,
        height: height,        
        maxWidth: maxWidth, 
        maxHeight: maxHeight,
        buttonList: availableButtonList,
        charCounterType: charCounterTypeString,
        maxCharCount: maxCharacters,
        defaultStyles: 'font-family: Arial; font-size: 13px;',
        fonts: fontList,
        imageFileInput: imageFileInput,
        imageUrlInput: imageUrlInput,
        imageUploadSizeLimit: imageUploadSizeLimit,
        imageAccept:imageAccept,
        callBackSave: function(contents, isChanged) {
            if (isChanged && saveAction) {
                onUpdate(contents);
                saveAction.execute();
            } else if (!saveAction) {
                alert("There is no Save Action defined.");
            }
        }
    }

    const clickableClass = clickable ? " clickable" : "";

    const handleSunEditorChange = content => {
        if (onUpdate) {
            onUpdate(content);
        }
    };

    return (
        <div
            className={"widget-suneditormendix " + className + clickableClass}
            onClick={onClickAction}
            ref={getRef}
            style={style}
        >
            {!displayOnly && (
                <SunEditor
                    defaultValue={defaultValueText}
                    onChange={handleSunEditorChange}
                    setOptions={options}
                    width="100%"
                />
            )}
            {displayOnly && <span className="mx-text" dangerouslySetInnerHTML={{ __html: defaultValueText }} />}
        </div>
    );
};

export default SunEditorCustomWidget;
