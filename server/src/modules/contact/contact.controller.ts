import { Controller, Post, Body, Get } from '@nestjs/common';
import { ContactService } from './contact.service';
import { CreateContactDto } from './dto/create-contact.dto';

@Controller('contact')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @Post()
  async create(@Body() createContactDto: CreateContactDto) {
    const savedMessage = await this.contactService.create(createContactDto);
    return {
      success: true,
      message: 'Message received successfully',
      data: savedMessage,
    };
  }

  //Endpoint for SuperAdmin dashboard
  @Get()
  async findAll() {
    const messages = await this.contactService.findAll();
    return {
      success: true,
      data: messages,
    };
  }
}