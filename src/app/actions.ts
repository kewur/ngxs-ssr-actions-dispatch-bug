export class RequestUserTasks {
  static readonly type = '[USER] RequestUserTasks';

  constructor(public readonly fetchCount: number) {}
}

export class FetchUserTasks {
  static readonly type = '[USER] FetchUserTasks';

  constructor(public readonly fetchCount: number) {}
}

export class SetSomeData {
   static readonly type = '[USER] SetSomeData';
    constructor(public readonly data: string) {}
}
