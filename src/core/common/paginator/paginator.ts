import { col, Op } from 'sequelize';

export default class Paginator {
  private model;
  constructor(model) {
    this.model = model;
  }
  async paginate(
    fieldSearch: string[],
    options: any,
    current: number,
    limitTo: number,
    filterOption?: any,
  ) {
    const offset = (current - 1) * limitTo;
    // const { encrypt } = ICryptoService;
    let query = null;
    let where = null;
    let crypto = null;
    let cryptoService = null;
    let funCrypto = null;
    let s3Service = null;
    if (filterOption) {
      if (filterOption?.crypto) {
        crypto = filterOption?.crypto;
        delete filterOption?.crypto;
      }
      if (filterOption?.cryptoService) {
        cryptoService = filterOption?.cryptoService;
        delete filterOption?.cryptoService;
      }
      if (filterOption?.func) {
        funCrypto = filterOption?.func;
        delete filterOption?.func;
      }
      if (filterOption?.s3Service) {
        s3Service = filterOption?.s3Service;
        delete filterOption?.s3Service;
      }
      query = { ...query, ...filterOption };
      if (filterOption?.where) {
        where = { ...where, ...filterOption?.where };
      }
    }

    if (options?.orderBy && options?.orderType) {
      query = {
        ...query,
        order: [[col(options?.orderBy), options?.orderType]],
      };
    }

    if (options?.distinct && options?.col) {
      query = {
        ...query,
        distinct: options?.distinct,
        col: options?.col,
      };
    }

    if (options?.search) {
      const setSearch = [];
      await Promise.all(
        fieldSearch.map((field) => {
          const itemSearch = {
            [field]: {
              [Op.iLike]: `%${options?.search}%`,
            },
          };
          setSearch.push(itemSearch);
        }),
      );
      where = { ...where, [Op.or]: await Promise.all(setSearch) };
      query = { ...query, where };
    }

    let model = this.model;

    if (filterOption?.scope) {
      model = model.scope(filterOption.scope);
    }
    const { count, rows } = await model.findAndCountAll({
      ...query,
      offset,
      limit: limitTo,
      where,
    });
    console.log(count);
    let setData = [];
    if (crypto) {
      for (const item of rows) {
        const setItem = item[funCrypto](cryptoService, s3Service);
        setData.push(setItem);
      }
    } else {
      setData = rows;
    }

    const total = count;

    const lastPage = total > 0 ? Math.ceil(total / limitTo) : 0;
    const hasMorePages = current < lastPage;
    // return results;
    return {
      meta: {
        lastPage,
        total,
        current,
        hasMorePages,
        pageSize: limitTo,
      },
      data: await Promise.all(setData),
    };
  }
}
