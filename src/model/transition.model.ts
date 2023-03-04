import { StatusModel } from "./status.model";

export class TransitionModel {
    name: string = '';
    fromStatus: StatusModel = new StatusModel;
    toStatus: StatusModel = new StatusModel;
}