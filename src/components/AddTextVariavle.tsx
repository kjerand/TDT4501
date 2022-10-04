import { EditorState, Modifier } from "draft-js";
import { useState } from "react";
import Immutable from "immutable";

const AddTextVariable = ({
  editorState,
  setEditorState,
}: {
  editorState: EditorState;
  setEditorState: Function;
}) => {
  const { OrderedSet } = Immutable;
  const [name, setName] = useState<string>("");

  const onSumbit = () => {
    if (name != "") {
      let newContent = Modifier.insertText(
        editorState.getCurrentContent(),
        editorState.getSelection(),
        `{{${name}}}`,
        OrderedSet.of("BOLD", "ITALIC")
      );

      setEditorState(
        EditorState.push(editorState, newContent, "insert-characters")
      );
    }
  };
  return (
    <div className="my-10 border-t-4 p-4 border-gray-700">
      <input
        type={"string"}
        placeholder="Navn"
        value={name}
        onChange={(event) => setName(event.target.value)}
      />
      <input type={"text"} placeholder="Text" />

      <button
        onClick={(event) => {
          event.preventDefault();
          onSumbit();
        }}
      >
        Legg til variabel
      </button>
    </div>
  );
};

export default AddTextVariable;
