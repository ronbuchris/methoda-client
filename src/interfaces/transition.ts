import { IStatus } from './status';
export interface ITransition {
  _id?: string;
  name: string;
  fromStatus: IStatus;
  toStatus: IStatus;
}
