import { Pagination } from "nestjs-typeorm-paginate";
import { BillingData } from "../../../src/entity/BillingData";

export default class BillingDataTransformer {
  public transformBillingData = (billingData: BillingData) => {
    const transformedNamesObject = {
      idInt: billingData.id
    };

    delete billingData.createdAt;
    delete billingData.updatedAt;
    delete billingData.deleteAt;
    delete billingData.user;

    Object.assign(transformedNamesObject, billingData)

    return transformedNamesObject;
  }

  public transformBillingDataPaginated = (billingDataPaginated: Pagination<BillingData>, orderBy: string, sortBy: string) => {
    const transformedNamesObject = {
      data: billingDataPaginated.items.map((billingData) => {
        return this.transformBillingData(billingData);
      }),
      total: billingDataPaginated.meta.totalItems,
      size: parseInt(billingDataPaginated.meta.itemsPerPage.toString()),
      page: parseInt(billingDataPaginated.meta.currentPage.toString()),
      sortBy,
      orderBy
    };

    return transformedNamesObject;
  }
}
