using { BusinessPartner } from './external/BusinessPartner';
using { Product         } from './external/Product';    
using { SalesOrder      } from './external/SalesOrder';    

service Proxy @(path: '/proxy'){
    
    // Business Parter
    @readonly
    entity A_BusinessPartner as projection on BusinessPartner.A_BusinessPartner;
    
    // Product
    @readonly
    entity A_Product         as projection on Product.A_Product {
        *,
        to_Description: redirected to A_ProductDescription
    };

    @readonly
    entity A_ProductDescription as projection on Product.A_ProductDescription;
    
    // Sales Order        
    @restrict: [{grant: [
        'CREATE',
        'READ' 
    ]}]
    entity A_SalesOrder as projection on SalesOrder.A_SalesOrder {
        *,
        to_Item: redirected to A_SalesOrderItem
    }
    
    @restrict: [{grant: [
        'CREATE',
        'READ' 
    ]}]
    entity A_SalesOrderItem as projection on SalesOrder.A_SalesOrderItem;

}