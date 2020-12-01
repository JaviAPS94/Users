import { Pagination } from "nestjs-typeorm-paginate";
import { ShippingAddress } from "../../entity/ShippingAddress";

export class ShippingAddressTransformer {
  public transformShippingAddress = (shippingAddres: ShippingAddress) => {
    const transformedNamesObject = {
      externalUpdateAt: shippingAddres.updatedAt
    };

    delete shippingAddres.updatedAt;
    delete shippingAddres.createdAt;
    delete shippingAddres.deleteAt;
    delete shippingAddres.user;
    shippingAddres.lat = parseFloat(shippingAddres.lat + '');
    shippingAddres.lng = parseFloat(shippingAddres.lng + '');
    shippingAddres.default = shippingAddres.default ? true : false;

    Object.assign(transformedNamesObject, shippingAddres)

    return transformedNamesObject;
  }

  public transformShippingAddressPaginated = (shippingAddressPaginated: Pagination<ShippingAddress>, orderBy: string, sortBy: string) => {
    const transformedNamesObject = {
      data: shippingAddressPaginated.items.map((shippingAddress) => {
        return this.transformShippingAddress(shippingAddress);
      }),
      total: shippingAddressPaginated.meta.totalItems,
      size: parseInt(shippingAddressPaginated.meta.itemsPerPage.toString()),
      page: parseInt(shippingAddressPaginated.meta.currentPage.toString()),
      sortBy,
      orderBy
    };

    return transformedNamesObject;
  }
}
