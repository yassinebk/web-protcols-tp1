export enum TodoStatusEnum {

  'actif' = 'En cours',
  'waiting' = 'En attente',
  'done' = 'Finalise'
}


class TodoModel {
  constructor(
    public id: string,
    public name: string,
    public description: string,
    public creationDate: number,
    public state: TodoStatusEnum
  ) { }
}



export default TodoModel;
