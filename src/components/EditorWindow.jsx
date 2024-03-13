import React, { useRef, useState } from "react";
import { Box, HStack } from "@chakra-ui/react";
import { Editor } from "@monaco-editor/react";
import LangSwitch from "./LangSwitch";
import { CODE_TEMPLATES } from "../constants";
import Output from "./Output";

function EditorWindow() {
  const [language, setLanguage] = useState("javascript");
  const [code, setCode] = useState(CODE_TEMPLATES.javascript); // Initial code from template

  const editorRef = useRef(null);
  const handleEditorMount = (editor) => {
    editorRef.current = editor;
    editor.focus();
  }; 

  const handleLanguageChange = (newLanguage) => {
    setLanguage(newLanguage);
    setCode(CODE_TEMPLATES[newLanguage]); // Load new language template
  };

  return (
    <Box>
      <HStack spacing={4}>
        <Box w="50%">
          <LangSwitch language={language} onSelect={handleLanguageChange} />
          <Editor
            height="75vh"
            language={language}
            value={code}
            onMount={handleEditorMount} 

          />
        </Box>
        {<Output editorRef={editorRef} language={language}/>} //new
      </HStack>
    </Box>
  );
}

export default EditorWindow;
