// import { FormEvent, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import logoImg from "../assets/images/logo.svg";
import deleteImg from "../assets/images/delete.svg";
import { Button } from "../components/Button";
import { Question } from "../components/Question";
import { RoomCode } from "../components/RoomCode";
import { useRoom } from "../hooks/useRoom";

import "../styles/room.scss";
import { database } from "../services/firebase";
type RoomParams = {
  id: string;
};

export function AdminRoom() {
  const history = useHistory();
  const params = useParams<RoomParams>();
  const roomId = params.id;
  const { question, title } = useRoom(roomId);

  async function handleDeleteQuestion(questionId: string) {
    if (window.confirm("Tem certeza que deseja excluir essa pergunta?")) {
      const questionRef = await database
        .ref(`rooms/${roomId}/question/${questionId}`)
        .remove();
    }
  }

  async function handleEndRoom(){
    database.ref(`rooms/${roomId}`).update({
      endedAt: new Date()
    })

    history.push('/')
  }
  
  return (
    <div id="page-room">
      <header>
        <div className="content">
          <img src={logoImg} alt="Letmeask" />
          <div>
            <RoomCode code={roomId} />
            <Button isOutline onClick={handleEndRoom}>Encerrar Sala</Button>
          </div>
        </div>
      </header>

      <main className="content">
        <div className="room-title">
          <h1>Sala {title}</h1>
          {question.length > 0 && <span>{question.length} pergunta(s)</span>}
        </div>

        <div className="question-list">
          {question.map((question) => {
            return (
              <Question
                key={question.id}
                content={question.content}
                author={question.author}
              >
                <button
                  type="button"
                  onClick={() => handleDeleteQuestion(question.id)}
                >
                  <img src={deleteImg} alt="Remover pergunta" />
                </button>
              </Question>
            );
          })}
        </div>
      </main>
    </div>
  );
}