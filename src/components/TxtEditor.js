import React,{useCallback, useState,Fragment,Component } from "react";
import { createEditor, Transforms,Editor, Text } from 'slate';
import { Slate, Editable, withReact } from 'slate-react'
import Icon from "react-icons-kit";
import { bold } from "react-icons-kit/feather/bold";
import { italic } from "react-icons-kit/feather/italic";
import FormatToolbar from "./FormatToolbar";

const SlateApp = () => {
  
  const [editor] = useState(() => withReact(createEditor()),[]);

  const renderElement = useCallback(props => {
    switch (props.element.type) {
        case 'code':
            return <CodeElement {...props} />
        default :
            return <DefaultElement {...props} />
    }
  })

  return (
  <Fragment>
    <FormatToolbar>
        <button className="tooltip-icon-button">
            <Icon icon={bold} />
        </button>
        <button className="tooltip-icon-button">
            <Icon icon={italic} />
        </button>
    </FormatToolbar>
    <Slate editor={editor} value={initialValue} >
    <Editable 
         renderElement={renderElement}
         onKeyDown={ event => {
            if (event.key === '`' && event.ctrlKey){
                event.preventDefault();
                const [match] = Editor.nodes(editor, {
                    match:n => n.type === 'code',
                })
                Transforms.setNodes(
                    editor,
                    {type:match ? 'paragraph': 'code'},
                    {match: n => Editor.isBlock(editor,n)}
                )
            }
         }}
    />
  </Slate>
  </Fragment>

  )
}

const initialValue = [
  {
    type: 'paragraph',
    children: [{ text: 'A line of text in a paragraph.' }],
  },
]

const CodeElement = props => {
  return (
    <pre {...props.attributes}>
      <code>{props.children}</code>
    </pre>
  )
}

const DefaultElement = props => {
  return <p {...props.attributes}>{props.children}</p>
}

export default SlateApp;