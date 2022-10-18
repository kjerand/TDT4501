import { EditorState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import { useState } from "react";

const DisplayTasks = ({ tasks }: { tasks: EditorState[] }) => {
  const [taskIndex, setTaskIndex] = useState<number>(0);
  return (
    <>
      <h3 className="font-medium leading-tight text-4xl mt-0 mb-2 text-gray-700 mb-12 text-center">
        Genererte oppgaver
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
        editorState={tasks[taskIndex]}
        toolbarClassName="toolbarClassName"
        wrapperClassName="wrapperClassName"
        editorClassName="editorClassName"
      />
      <h1 className="font-medium leading-tight text-lg mt-0 mb-2 text-gray-700 mt-10">
        Velg oppgave
      </h1>
      <div className="flex">
        {Array.from(Array(tasks.length)).map((v, index) => {
          return (
            <p
              onClick={() => {
                setTaskIndex(index);
              }}
              className="hover:text-gray-600 text-blue-600 px-1 cursor-pointer"
            >
              {index + 1}
            </p>
          );
        })}
      </div>
    </>
  );
};

export default DisplayTasks;
