import { useState, useMemo } from "react";
import { createEditor } from "slate";
import { Slate, Editable, withReact } from "slate-react";
import { withHistory } from "slate-history";
import pipe from "lodash/fp/pipe";

import Toolbar from "./components/ToolBar";

import Paragraph from "./elements/Paragraph";
import Image from "./elements/Image";
import Link from "./elements/Link";

import withImages from "./plugins/withImages";
import withKeyCommands from "./plugins/withKeyCommands";
import withLinks from "./plugins/withLink";

import { createParagraphNode } from "./utils/paragraph";
import { createImageNode } from "./utils/image";
import { createLinkNode } from "./utils/link";

import "./styles.css";

const renderElement = (props) => {
  switch (props.element.type) {
    case "image":
      return <Image {...props} />;
    case "link":
      return <Link {...props} />;
    default:
      return <Paragraph {...props} />;
  }
};

const createEditorWithPlugins = pipe(
  withReact,
  withHistory,
  withImages,
  withLinks,
  withKeyCommands
);

const Editor = () => {
  const editor = useMemo(() => createEditorWithPlugins(createEditor()), []);
  const [value, setValue] = useState([
    createParagraphNode([
      {
        text:
          "Willard Carroll Smith II[3] (born September 25, 1968), also known by his stage name the Fresh Prince, is an American actor, rapper, and producer. Smith began his stardom starring as a fictionalized version of himself on the NBC sitcom The Fresh Prince of Bel-Air (1990–1996). Noted for his work in music, television, and film,[4] Smith has achieved and held several US and international box office records.[5][6][7] As of 2021, his films have grossed over $9.3 billion globally,[8] making him one of Hollywood's most bankable stars"
      },
      createLinkNode("https://en.wikipedia.org/wiki/Will_Smith", "This is my Link")
    ]),
    createImageNode("Will Smith GIF", "https://media.giphy.com/media/qyjexFwQwJp9yUvMxq/giphy.gif")
  ]);

  return (
    <div className="editor-wrapper">
      <Slate editor={editor} value={value} onChange={setValue}>
        <Toolbar />
        <Editable renderElement={renderElement} />
      </Slate>
    </div>
  );
};

export default Editor;
