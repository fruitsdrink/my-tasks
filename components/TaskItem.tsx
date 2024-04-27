import { useGlobalState } from "@/context/GlobalContext";
import { formatDate } from "@/utils/formatDate";
import { edit, trash } from "@/utils/icons";
import styled from "styled-components";

interface Props {
  task: {
    id: string;
    title: string;
    description: string;
    date: string;
    isCompleted: boolean;
    isImportant: boolean;
    createdAt: Date;
    updatedAt: Date;
  };
}
export default function TaskItem({ task }: Props) {
  const { theme, deleteTask, updateTask } = useGlobalState();
  const { title, description, date, isCompleted, id } = task;
  return (
    <TaskItemStyled theme={theme}>
      <h1>{title}</h1>
      <p>{description}</p>
      <p className="date">{formatDate(date)}</p>
      <div className="task-footer">
        {isCompleted ? (
          <button
            className="completed"
            onClick={() => {
              updateTask({ ...task, isCompleted: false });
            }}
          >
            Completed
          </button>
        ) : (
          <button
            className="incompleted"
            onClick={() => {
              updateTask({ ...task, isCompleted: true });
            }}
          >
            Incomplete
          </button>
        )}
        <button className="edit">{edit}</button>
        <button
          className="delete"
          onClick={async () => {
            await deleteTask(id);
          }}
        >
          {trash}
        </button>
      </div>
    </TaskItemStyled>
  );
}

const TaskItemStyled = styled.div`
  padding: 1.2rem 1rem;
  border-radius: 1rem;
  background-color: ${(props) => props.theme.borderColor2};
  box-shadow: ${(props) => props.theme.shadow7};
  border: 2px solid ${(props) => props.theme.borderColor2};

  height: 16rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  > h1 {
    font-size: 1.5rem;
    font-weight: 600;
  }

  .date {
    margin-top: auto;
  }

  .task-footer {
    display: flex;
    align-items: center;
    gap: 1.2rem;

    button {
      border: none;
      outline: none;
      cursor: pointer;

      i {
        font-size: 1.4rem;
        color: ${(props) => props.theme.colorGrey2};
      }
    }

    .edit {
      margin-left: auto;
    }

    .completed,
    .incompleted {
      display: inline-block;
      padding: 0.4rem 1rem;
      background: ${(props) => props.theme.colorDanger};
      border-radius: 30px;
    }
    .completed {
      background: ${(props) => props.theme.colorGreenDark};
    }
  }
`;
