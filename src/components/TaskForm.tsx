import { useEffect, useState } from "react";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import { Editor } from "react-draft-wysiwyg";
import {
  EditorState,
  CompositeDecorator,
  SelectionState,
  Modifier,
  ContentState,
} from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import AddIntegerVariable from "./AddIntegerVariable";
import Button from "./Button";
import AddTextVariable from "./AddTextVariable";
import AddDecimalVariable from "./AddDecimalVariable";
import { generateIntegerVariable } from "../utils/generateIntegerVariable";
import Immutable from "immutable";
import DisplayTasks from "./DisplayTasks";
import { generateStringVariable } from "../utils/generateStringVariable";
const options = ["Legg til variabel", "Tekst", "Heltall", "Desimaltall"];

//Dropdown med valg av variabel (string, int, float osv), knapp legg til variabel, så dukker skjema opp
// Legge til alle variabler i en liste som kan gjemmes
// Preview for en eksempel oppgave
// Velge hvor mange varianter som skal genereres
const TaskForm = () => {
  const [submit, setSumbit] = useState<boolean>(false);
  const [displayTasks, setDisplayTasks] = useState<boolean>(false);
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const { OrderedSet } = Immutable;
  const [numberOfTasks, setNumberOfTasks] = useState<number>(10);
  const [tasks, setTasks] = useState<EditorState[]>([]);

  const [dropdownOption, setDropdownOption] = useState<string>("");

  const [integerVariables, setIntegerVariables] = useState<IntegerVariable[]>(
    []
  );

  const [stringVariables, setStringVariables] = useState<StringVariable[]>([]);

  const addIntegerVariable = (variable: IntegerVariable) => {
    let exists = false;
    integerVariables.forEach((v) => {
      if (v.name == variable.name) exists = true;
    });
    if (!exists) setIntegerVariables([...integerVariables, variable]);
  };

  const findWithRegex = (regex, contentBlock, callback) => {
    const text = contentBlock.getText();
    let matchArr, start, end;
    while ((matchArr = regex.exec(text)) !== null) {
      start = matchArr.index;
      end = start + matchArr[0].length;
      callback(start, end);
    }
  };

  const generate = () => {
    console.log(stringVariables);
    for (let i = 0; i < numberOfTasks; i++) {
      console.log(integerVariables);
      let state = EditorState.createWithContent(
        editorState.getCurrentContent()
      );
      for (let variable of integerVariables) {
        let contentState = state.getCurrentContent();
        const blockMap = state.getCurrentContent().getBlockMap();
        const regex = new RegExp("{{" + variable.name + "}}", "g");
        const selectionsToReplace = [];

        blockMap.forEach((contentBlock) =>
          findWithRegex(regex, contentBlock, (start, end) => {
            const blockKey = contentBlock.getKey();
            const blockSelection = SelectionState.createEmpty(blockKey).merge({
              anchorOffset: start,
              focusOffset: end,
            });

            console.log(start);
            console.log(end);

            selectionsToReplace.push(blockSelection);
          })
        );

        selectionsToReplace.forEach((selectionState) => {
          contentState = Modifier.replaceText(
            contentState,
            selectionState,
            `${generateIntegerVariable(variable.min, variable.max)}`
          );
        });

        state = EditorState.createWithContent(contentState);
      }

      for (let variable of stringVariables) {
        let contentState = state.getCurrentContent();
        const blockMap = state.getCurrentContent().getBlockMap();
        const regex = new RegExp("{{" + variable.name + "}}", "g");
        const selectionsToReplace = [];

        blockMap.forEach((contentBlock) =>
          findWithRegex(regex, contentBlock, (start, end) => {
            const blockKey = contentBlock.getKey();
            const blockSelection = SelectionState.createEmpty(blockKey).merge({
              anchorOffset: start,
              focusOffset: end,
            });

            console.log(start);
            console.log(end);

            selectionsToReplace.push(blockSelection);
          })
        );

        selectionsToReplace.forEach((selectionState) => {
          contentState = Modifier.replaceText(
            contentState,
            selectionState,
            `${generateStringVariable(variable.options)}`
          );
        });

        state = EditorState.createWithContent(contentState);
      }

      tasks.push(state);
    }
    setDisplayTasks(true);
  };

  const variableForm = () => {
    switch (dropdownOption) {
      case "Tekst":
        return (
          <AddTextVariable
            editorState={editorState}
            setEditorState={setEditorState}
            stringVariables={stringVariables}
            setStringVariables={setStringVariables}
          />
        );
      case "Heltall":
        return (
          <AddIntegerVariable
            editorState={editorState}
            setEditorState={setEditorState}
            integerVariables={integerVariables}
            setIntegerVariables={addIntegerVariable}
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
    <>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          if (submit) generate();
        }}
      >
        {!displayTasks ? (
          <>
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
                setDropdownOption(data.value);
              }}
              value={options[0]}
              placeholder="Legg til oppgave"
              className="mb-5 border-t-4 border-gray-700 pt-4"
            />
            {variableForm()}
            <div className="flex my-5">
              <h3 className="font-medium leading-tight text-lg text-gray-700 mr-4 my-auto">
                Antall oppgaver:
              </h3>
              <input
                type={"number"}
                value={numberOfTasks}
                placeholder="Antall oppgaver"
                onChange={(event) => {
                  setNumberOfTasks(parseInt(event.target.value));
                }}
                className="w-24 border-gray-600 border px-2 my-auto"
                required
              />
            </div>

            <Button
              text="Generer"
              onClick={() => {
                setSumbit(true);
              }}
              className="bg-gray-700"
            />
          </>
        ) : (
          <DisplayTasks tasks={tasks} />
        )}
      </form>
    </>
  );
};

export default TaskForm;
