import { createContext, useState, type ReactNode } from "react";

interface problemInterface {
      id: string;
      problemSetId: string;
      problemName: string;
      optionA: string;
      optionB: string;
      optionC: string;
      optionD: string;
}

interface QuizContextInterface {
    problems: problemInterface[];
    setProblems: React.Dispatch<React.SetStateAction<problemInterface[]>>;
}

export const quizContext = createContext<QuizContextInterface>({
    problems: [],
    setProblems: () => {}
});

export default function QuizDataProvider ({children}:{children:ReactNode}) {
    const [problems, setProblems] = useState<problemInterface[]>([]);
    // @ts-ignore
    return <quizContext.Provider value={{problems, setProblems}}>
        {children}
    </quizContext.Provider>
}