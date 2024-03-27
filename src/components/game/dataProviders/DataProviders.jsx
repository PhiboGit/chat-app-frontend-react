import React, {
} from "react";
import { TestChatProvider } from "./TestChatProvider";
import { CharacterProvider } from "./CharacterProvider";
import { ItemProvider } from "./ItemProvider";

// should hold every DataProvider for better overview
export const DataProviders = ({children, initChar}) =>{

  return (
    <TestChatProvider initChar={initChar}>
      <ItemProvider initChar={initChar}>
        <CharacterProvider initChar={initChar}>
          {children}
        </CharacterProvider>
      </ItemProvider>
    </TestChatProvider>
  )
} 