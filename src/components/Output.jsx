
import { Box, Button, Text } from "@chakra-ui/react";
import { useState } from "react";
import { executeCode } from "../api";
const Output = ({ editorRef, language }) => {
  const [output, setOutput] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null); // Track potential errors

  const runCode = async () => {
    setIsLoading(true);
    setError(null); // Clear any previous errors

    try {
      const sourceCode = editorRef.current.getValue();
      if (!sourceCode) return;

      const { run: result } = await executeCode(language, sourceCode);
      setOutput(result.output); // No need to split for basic output display
    } catch (error) {
      setError(error); // Store the error for display
      console.error(error); // Log for debugging
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Box w="50%">
      <Text mb={2} fontSize="lg">
        Output
      </Text>
      <Button variant="outline" colorScheme="green"mb={4} 
       isLoading={isLoading}
onClick={runCode}
>
        Run Code
      </Button>
      <Box
        height="75vh"
        p={2}
        border="1px solid"
        borderRadius={4}
        borderColor="#333"
        color="#333"
      >
        {output}
      </Box>
    </Box>
  );
};
export default Output; 