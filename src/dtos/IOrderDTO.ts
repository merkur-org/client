export type IPaymentStatus =
  | 'processing'
  | 'awaiting_payment'
  | 'canceled'
  | 'expired'
  | 'paid'

export type IPaymentType =
  | 'credit_card'
  | 'money'
  | 'pix'
  | 'bank_slip'
  | 'bank_transfer'

export type ISalesType = 'wholesale' | 'retail'

export interface IOrderDTO {
  date: Date
  value: number
  final_value: number
  payment_type: IPaymentType
  payment_status: IPaymentStatus
  sales_type: ISalesType
  delivery_point_id: string
  user_id: string
  list_id: string
  details: {
    product_id: string
    unit_price: number
    quantity: number
    discount: number
  }[]
}
