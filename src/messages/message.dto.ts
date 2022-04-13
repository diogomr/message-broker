import { IsNotEmpty } from 'class-validator';

export class MessageDto {
  @IsNotEmpty()
  id: string;
  @IsNotEmpty()
  payload: object;
}
