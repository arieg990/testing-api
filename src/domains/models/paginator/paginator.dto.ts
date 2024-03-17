import { MetaDto } from '@domains/models/paginator/meta.dto';

export class PaginatorDto<Res> {
  data: Res[];
  meta: MetaDto;
}
