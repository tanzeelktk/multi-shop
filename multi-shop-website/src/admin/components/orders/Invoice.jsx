const Invoice = ({ order }) => {

  return (
    <div className="max-w-3xl mx-auto bg-white p-8 shadow-lg rounded-xl">

      {/* Header */}
      <div className="flex justify-between items-center border-b pb-4">
        <div>
          <h1 className="text-2xl font-bold">INVOICE</h1>
          <p className="text-sm text-gray-500">
            Invoice #INV-{order?.id}
          </p>
        </div>

        <div className="text-right">
          <h2 className="font-bold text-lg">Your Store</h2>
          <p className="text-sm">support@store.com</p>
          <p className="text-sm">+92 300 0000000</p>
        </div>
      </div>

      {/* Customer */}
      <div className="grid grid-cols-2 gap-4 mt-6">
        <div>
          <p className="text-xs text-gray-500">Bill To</p>
          <p className="font-semibold">{order?.customer.name}</p>
          <p className="text-sm">{order?.customer.address}</p>
          <p className="text-sm">{order?.customer.phone}</p>
        </div>

        <div className="text-right">
          <p><span className="font-medium">Date:</span> {order?.orderDate}</p>
          <p><span className="font-medium">Payment:</span> {order?.paymentMethod}</p>
          <p><span className="font-medium">Status:</span> {order?.status}</p>
        </div>
      </div>

      {/* Table */}
      <div className="mt-6 overflow-x-auto">
        <table className="w-full text-sm border">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">Item</th>
              <th className="p-3 text-center">Qty</th>
              <th className="p-3 text-right">Price</th>
              <th className="p-3 text-right">Total</th>
            </tr>
          </thead>

          <tbody>
            {order?.items?.map((item, i) => (
              <tr key={i} className="border-t">
                <td className="p-3">{item.title}</td>
                <td className="p-3 text-center">{item.quantity}</td>
                <td className="p-3 text-right">${item.price}</td>
                <td className="p-3 text-right">
                  ${item.quantity * item.price}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Summary */}
      <div className="flex justify-end mt-6">
        <div className="w-64 space-y-2 text-sm">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>${order?.subtotal}</span>
          </div>

          <div className="flex justify-between">
            <span>Shipping</span>
            <span>$10</span>
          </div>

          <div className="flex justify-between font-bold text-base border-t pt-2">
            <span>Total</span>
            <span>${order?.total}</span>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-8 border-t pt-4 text-center text-sm text-gray-500">
        Thank you for your purchase ❤️  
        <br />
        www.yourstore.com
      </div>

    </div>
  )
}

export default Invoice
