import { Injectable } from '@nestjs/common';


// remove file?

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}
