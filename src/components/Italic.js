import React from "react";

const ItalicFont = props => (
    <em property= "italic">
        {props.children}
    </em>
);

export default ItalicFont;