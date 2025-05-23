import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ChatDto {
  @ApiProperty({
    description: 'User message or question for the chatbot',
    example: 'How much does a watch cost?',
  })
  @IsString()
  @IsNotEmpty()
  message: string;
}
