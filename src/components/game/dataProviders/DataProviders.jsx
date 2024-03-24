import React, {
} from "react";
import { TestChatProvider } from "./TestChatProvider";
import { CharacterProvider } from "./CharacterProvider";

// should hold every DataProvider for better overview
export const DataProviders = ({children, initChar}) =>{

  return (
    <TestChatProvider initChar={initChar}>
      <CharacterProvider initChar={initChar}>
        {children}
      </CharacterProvider>
    </TestChatProvider>
  )
} 