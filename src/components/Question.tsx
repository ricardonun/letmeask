import { ReactNode } from "react";

import "../styles/question.scss";

type Questions = {
  content: string;
  author: {
    name: string;
    avatar: string;
  };
  children?: ReactNode;
  isAnswer?: boolean;
  isHighlighted?: boolean;
};

export function Question({ content, author, children, isAnswer = false, isHighlighted = false}: Questions) {
  return (
      
    <div className={`question ${isAnswer ? 'answered' : ''} ${isHighlighted && !isAnswer ? 'highlighted' : ''} `}>
      <p>{content}</p>
      <footer>
        <div className="user-info">
          <img src={author.avatar} alt={author.name} />
          <span>{author.name}</span>
        </div>
        <div>{children}</div>
      </footer>
    </div>
  );


}
