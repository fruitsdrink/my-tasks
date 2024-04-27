"use client";

import { useGlobalState } from "@/context/GlobalContext";
import styled from "styled-components";
import TaskItem from "./TaskItem";
import { plus } from "@/utils/icons";
import Modal from "./Modals/Modal";
import CreateContent from "./Modals/CreateContent";

interface Props {
  title: string;
  tasks: any[];
}
export default function Tasks({ title, tasks }: Props) {
  const { theme, modal, openModal } = useGlobalState();
  console.log({ modal });
  return (
    <TasksStyled theme={theme}>
      {modal && <Modal content={<CreateContent />} />}
      <h1>{title}</h1>
      <div className="tasks grid">
        {tasks?.map((task) => (
          <TaskItem key={task.id} task={{ ...task }} />
        ))}
        <button className="create-task" onClick={openModal}>
          {plus} Add New Task
        </button>
      </div>
    </TasksStyled>
  );
}

const TasksStyled = styled.main`
  width: 100%;
  height: 100%;
  padding: 2rem;
  background-color: ${(props) => props.theme.colorBg2};
  border: 2px solid ${(props) => props.theme.borderColor2};
  border-radius: 1rem;

  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 0.5rem;
  }

  > h1 {
    font-size: clamp(1.5rem, 2vw, 2rem);
    font-weight: 800;
    position: relative;

    &::after {
      position: absolute;
      content: "";
      bottom: -0.5rem;
      left: 0;
      width: 3rem;
      height: 0.2rem;
      background-color: ${(porps) => porps.theme.colorPrimaryGreen};
      border-radius: 0.5rem;
    }
  }

  .create-task {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;

    height: 16rem;
    color: ${(props) => props.theme.colorGrey2};
    font-weight: 600;
    cursor: pointer;
    border-radius: 1rem;
    border: 3px dashed ${(props) => props.theme.colorGrey5};
    transition: all 0.3s ease;

    &:hover {
      background-color: ${(props) => props.theme.colorGrey5};
      color: ${(props) => props.theme.colorGery0};
    }
  }

  .tasks {
    margin: 2rem 0;
  }
`;
