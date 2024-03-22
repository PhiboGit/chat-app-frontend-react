import React, {
} from "react";
import { TestChatProvider } from "./TestChatProvider";

// should hold every DataProvider for better overview
export const DataProviders = ({children, initChar}) =>{

  return (
    <TestChatProvider initChar={initChar}>
      {children}
    </TestChatProvider>
  )
} 