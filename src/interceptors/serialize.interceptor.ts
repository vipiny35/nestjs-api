import { CallHandler, ExecutionContext, NestInterceptor, UseInterceptors } from "@nestjs/common";
import { plainToClass } from "class-transformer";
import { map, Observable } from "rxjs";

interface ClassConstructor {
  new(...args: any[]): {}
}

export function Serialize(dto: ClassConstructor) {
  return UseInterceptors(new SerializeInterceptor(dto))
}

export class SerializeInterceptor implements NestInterceptor {

  constructor(private dto: any) { }

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    //Run before a request is handled
    console.log('Run before a request is handled');

    return next.handle().pipe(
      map((data: any) => {
        //Run before sending the response
        console.log('Run before sending the response');
        return plainToClass(this.dto, data, {
          excludeExtraneousValues: true
        })
      })
    )
  }

}