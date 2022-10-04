import { useEffect, useState } from "react";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import { Editor } from "react-draft-wysiwyg";
import { EditorState } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import AddIntegerVariable from "./AddIntegerVariable";
import Button from "./Button";
import AddTextVariable from "./AddTextVariavle";
import AddDecimalVariable from "./AddDecimalVariable";

type IntegerVariable = {
  name: string;
  min: number;
  max: number;
};

const options = ["Tekst", "Heltall", "Desimaltall"];

//Dropdown med valg av variabel (string, int, float osv), knapp legg til variabel, så dukker skjema opp
// Legge til alle variabler i en liste som kan gjemmes
// Preview for en eksempel oppgave
// Velge hvor mange varianter som skal genereres
const TaskForm = () => {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  const [dropdownOption, setDropdownOption] = useState<string>("");

  const [variables, setVariables] = useState();

  useEffect(() => {
    console.log(editorState.getCurrentContent().getPlainText());
  }, [editorState]);

  const variableForm = () => {
    switch (dropdownOption) {
      case "Tekst":
        return (
          <AddTextVariable
            editorState={editorState}
            setEditorState={setEditorState}
          />
        );
      case "Heltall":
        return (
          <AddIntegerVariable
            editorState={editorState}
            setEditorState={setEditorState}
          />
        );
      case "Desimaltall":
        return (
          <AddDecimalVariable
            editorState={editorState}
            setEditorState={setEditorState}
          />
        );
    }
  };

  return (
    <form>
      <h3 className="font-medium leading-tight text-4xl mt-0 mb-2 text-gray-700 mb-12 text-center">
        Generer varianter av oppgave
      </h3>
      <Editor
        toolbar={{
          options: [
            "inline",
            "fontSize",
            "fontFamily",
            "list",
            "textAlign",
            "colorPicker",
            "history",
          ],
        }}
        editorState={editorState}
        toolbarClassName="toolbarClassName"
        wrapperClassName="wrapperClassName"
        editorClassName="editorClassName"
        onEditorStateChange={setEditorState}
      />
      <Dropdown
        options={options}
        onChange={(data) => {
          console.log(data.value);
          setDropdownOption(data.value);
        }}
        value={options[0]}
        placeholder="Select an option"
      />
      {variableForm()}
      <Button text="Generer" onChange={() => {}} />
    </form>
  );
};

export default TaskForm;
