const cds = require('@sap/cds');

module.exports = async (srv) => {
    
    const bupa    = await cds.connect.to('BusinessPartner');
    const product = await cds.connect.to('Product');
    const sord    = await cds.connect.to('SalesOrder');

    srv.on('READ','A_BusinessPartner', async (req) => bupa.run(req.query));

    // srv.on('READ','A_Product', async (req) => product.run(req.query));

    srv.on('READ','A_Product', async (req) => product.get(req.http.req.url));

    //srv.on('READ','A_SalesOrder', async (req) => sord.get(req.http.req.url));

    srv.on('READ','A_SalesOrder', async (req) => sord.run(req.query));
    srv.on('CREATE','A_SalesOrder', async (req) => {
        const salesOrder = await sord.run(
            INSERT(req.data).into(sord.entities.A_SalesOrder)
        )

        const items = await sord.run(
            SELECT.from(sord.entities.A_SalesOrderItem).where({ SalesOrder: salesOrder.SalesOrder })
        )

        return {
            ...salesOrder,
            to_Item: items
        }
                
    });
}