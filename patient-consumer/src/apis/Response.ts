export interface Response<Status extends number, Payload> {
  status: Status;
  data: Payload;
}
