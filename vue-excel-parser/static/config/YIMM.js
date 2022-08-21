export const schema = {
    "current": [
        {
            column: '客戶',
            type: String,
            value: info => info.client
        },
        {
            column: 'Consignee',
            type: String,
            value: info => info.consignee
        },
        {
            column: '訂單日',
            type: Date,
            format: 'yyyy/mm/dd',
            value: info => info.order_date
        },
        {
            column: 'Part NO',
            type: String,
            value: info => info.part_no
        },
        {
            column: 'Order NO',
            type: String,
            value: info => info.order_no
        },
        {
            column: 'QTY',
            type: Number,
            value: info => info.QTY
        },
        {
            column: '出貨日',
            type: Date,
            format: 'yyyy/mm/dd',
            value: info => info.order_date
        },
        {
            column: '結關日',
            type: Date,
            format: 'yyyy/mm/dd',
            value: info => info.order_date
        },
        {
            column: 'ETD',
            type: Date,
            format: 'yyyy/mm/dd',
            value: info => info.order_date
        },
        {
            column: 'ETA',
            type: Date,
            format: 'yyyy/mm/dd',
            value: info => info.order_date
        },
        {
            column: 'MODE',
            type: String,
            value: info => ""
        },
        {
            column: 'SHIP',
            type: String,
            value: info => ""
        },
        {
            column: 'YMTT Remark',
            type: String,
            value: info => ""
        },
        {
            column: 'Supplier Remark',
            type: String,
            value: info => ""
        }
    ],

    "future": [
        {
            column: 'ETD',
            type: Date,
            format: 'yyyy/mm/dd',
            value: info => new Date()
        },
        {
            column: '客戶名稱',
            type: String,
            value: info => info.client
        },
        {
            column: 'SET 名稱',
            type: String,
            value: info => ""
        },
        {
            column: '零件號碼',
            type: String,
            value: info => info.part_no
        },
        {
            column: '數量',
            type: Number,
            value: info => info.QTY
        },
    ]
}