import { HttpHeaders } from "@angular/common/http";

export enum API {
  LOGIN = '/user/login'
}

const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
const options = { headers };
