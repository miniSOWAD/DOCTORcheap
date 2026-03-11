import { Controller, Get, Query } from '@nestjs/common';
import { SearchService } from './search.service';

@Controller('search')
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @Get()
  globalSearch(@Query('keyword') keyword: string) {
    return this.searchService.globalSearch(keyword || '');
  }
}