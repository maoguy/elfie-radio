import React from 'react';

interface TConfig {
  type:"default"|"static",
}

const initConfig:TConfig = {
  type:"default"
}

interface TContext {
  value:TConfig,
  setValue:(value:TConfig)=>any,
}

// 创建一个Context对象
const RadioConfigContext = React.createContext<TContext>({value:initConfig,setValue:()=>{}});

interface TProps {
  value:TConfig,
  children:React.ReactElement,
}

export function RadioConfigProvider({ value:initValue,children }: TProps) {
  const [value, setValue] = React.useState<TConfig>(initValue);
  return (
    <RadioConfigContext.Provider value={{value,setValue}}>{children}</RadioConfigContext.Provider>
  );
}


export default RadioConfigContext;