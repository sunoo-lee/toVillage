"use client";

import { useState, useEffect } from "react";
import TaskItem from "./TaskItem";
import ProjectBox from "../UI/ProjectBox";
import taskStore from "@/store/taskStore";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "@hello-pangea/dnd";
import Task from "@/store/taskValidator";
import axios from "axios";

interface dataList {
  parentId: number;
}

export default function TaskList({ parentId }: any) {
  const [isLoaded, setIsLoaded] = useState(false);
  const readTask = taskStore((state) => state.readTask);
  const taskList = taskStore((state) => state.tasks);
  const [tasks, setTasks] = useState<Task[]>([]);

  const onDragEnd = ({ draggableId, destination, source }: DropResult) => {
    if (!destination) return;

    const newList = JSON.parse(JSON.stringify(tasks)) as typeof tasks;
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
    setTasks(newList);
    updateIndexNum(newList);
  };

  const updateIndexNum = async (updatedList: Task[]) => {
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
    readTask(parentId);
  }, [readTask, parentId]);

  useEffect(() => {
    setTasks(taskList);
  }, [taskList]);

  useEffect(() => {
    // console.log(tasks);
  }, [tasks]);

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="list-droppable">
        {(provided) => (
          <div>
            <ul ref={provided.innerRef} {...provided.droppableProps}>
              {isLoaded ? (
                tasks.map((item, i) => (
                  <Draggable key={item.id} draggableId={item.id + ""} index={i}>
                    {(provided) => (
                      <li
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <TaskItem projectId={parentId} taskData={item} />
                      </li>
                    )}
                  </Draggable>
                ))
              ) : (
                <div></div>
              )}
              {provided.placeholder}
            </ul>
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}
