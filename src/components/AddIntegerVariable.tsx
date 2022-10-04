import { EditorState, Modifier } from "draft-js";
import { useState } from "react";
import Immutable from "immutable";

const AddIntegerVariable = ({
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
    <div className="my-10 border-t-4 border-gray-700 pt-4">
      <input
        type={"string"}
        placeholder="Navn"
        value={name}
        onChange={(event) => setName(event.target.value)}
      />
      <input type={"number"} placeholder="Minimum" />
      <input type={"number"} placeholder="Maximum" />
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

export default AddIntegerVariable;
