export interface IUsecase<Req, Res> {
  execute(request: Req): Promise<Res>;
}
