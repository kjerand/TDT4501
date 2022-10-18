import { EditorState, Modifier } from "draft-js";
import { useState } from "react";
import Immutable from "immutable";
import Button from "./Button";

const AddDecimalVariable = ({
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
    <div className="my-5 pt-4 flex">
      <input
        type={"string"}
        placeholder="Navn"
        className="w-24 border-gray-600 border p-2 mr-2"
      />
      <input
        type={"number"}
        placeholder="Minimum"
        className="border-gray-600 border p-2 mr-2"
      />
      <input
        type={"number"}
        placeholder="Maximum"
        className="border-gray-600 border p-2 mr-2"
      />
      <Button
        onClick={() => {}}
        text="Legg til variabel"
        className="bg-blue-700 ml-auto mr-3"
      />
    </div>
  );
};

export default AddDecimalVariable;
