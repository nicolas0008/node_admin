import { Injectable } from '@nestjs/common';
import { Termmed } from './interfaces/termmed.interface';

@Injectable()
export class TermmedService {
    private readonly termmed: Termmed[] = [];

    create(cat: Termmed) {
      this.termmed.push(cat);
    }

    findOne(id: number): Termmed {
      return this.termmed[id];
    }
}
