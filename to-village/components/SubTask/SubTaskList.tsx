"use client";

import { useEffect, useState } from "react";
import SubTaskFactory from "./SubTaskFactory";
import SubTaskItem from "./SubTaskItem";
import SubTask from "@/store/subTaskValidator";
import Task from "@/store/taskValidator";
import subTaskStore from "@/store/subTaskStore";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "@hello-pangea/dnd";
import axios from "axios";

interface Props {
  taskData: Task;
  projectId: number;
}

export default function SubTaskList({ projectId, taskData }: Props) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [subTasks, setSubTasks] = useState<SubTask[]>([]);
  const readSubTask = subTaskStore((state) => state.readSubTask);

  const onDragEnd = ({ draggableId, destination, source }: DropResult) => {
    if (!destination) return;

    const newList = JSON.parse(JSON.stringify(subTasks)) as typeof subTasks;
    let newIndexNum = 0;

    if (destination.index === 0) {
      newIndexNum = newList[0].indexNum / 2;
    } else if (destination.index === newList.length - 1) {
      newIndexNum = newList[newList.length - 1].indexNum + 1024;
    } else if (source.index < destination.index) {
      const preIndex = newList[destination.index].indexNum;
      const nextIndex = newList[destination.index + 1].indexNum;
      newIndexNum = Math.ceil((preIndex + nextIndex) / 2);
    } else if (source.index > destination.index) {
      const preIndex = newList[destination.index - 1].indexNum;
      const nextIndex = newList[destination.index].indexNum;
      newIndexNum = Math.ceil((preIndex + nextIndex) / 2);
    }

    newList[source.index].indexNum = newIndexNum;

    const [targetList] = newList.splice(source.index, 1);
    newList.splice(destination?.index, 0, targetList);
    setSubTasks(newList);
    updateIndexNum(newList);
  };

  const updateIndexNum = async (updatedList: SubTask[]) => {
    try {
      const response = await axios.put(
        `http://localhost:8080/to-do/order`,
        updatedList
      );
      const data = await response.data;
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    const readSubTaskList = async () => {
      const newList = await readSubTask(projectId, taskData.id);
      setSubTasks(newList);
    };
    readSubTaskList();
  }, [projectId, readSubTask, taskData]);

  useEffect(() => {
    console.log(subTasks);
  }, [subTasks]);

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="sub-droppable">
        {(provided) => (
          <div>
            <ul
              ref={provided.innerRef}
              {...provided.droppableProps}
              className="ml-10"
            >
              {isLoaded ? (
                subTasks.map((item, i) => (
                  <Draggable key={item.id} draggableId={item.id + ""} index={i}>
                    {(provided) => (
                      <li
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <SubTaskItem
                          setSubTasks={setSubTasks}
                          projectId={projectId}
                          taskId={taskData.id}
                          data={item}
                          key={i}
                        />
                      </li>
                    )}
                  </Draggable>
                ))
              ) : (
                <div></div>
              )}
              {provided.placeholder}
            </ul>
            <SubTaskFactory
              setSubTasks={setSubTasks}
              taskId={taskData.id}
              projectId={projectId}
            />
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}
