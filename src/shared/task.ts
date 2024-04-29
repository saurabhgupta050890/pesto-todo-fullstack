import { Entity, Fields, remult } from "remult";

@Entity("tasks", {
  allowApiCrud: true,
})
export class Task {
  @Fields.autoIncrement()
  id = 0;

  @Fields.string()
  title = "";

  @Fields.string()
  description = "";

  @Fields.integer()
  status = TaskStatusType.TO_DO;
}

export enum TaskStatusType {
  TO_DO = 1,
  IN_PROGRESS = 2,
  DONE = 3,
}

export const taskRepo = remult.repo(Task);
