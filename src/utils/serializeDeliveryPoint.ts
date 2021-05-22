import IDeliveryPointsDTO from '@/dtos/IDeliveryPointsDTO'

const serializeDeliveryPoint = (deliveryPoint: IDeliveryPointsDTO): string => {
  console.log(deliveryPoint)

  return (
    deliveryPoint.city +
    ', ' +
    deliveryPoint.state +
    ', ' +
    deliveryPoint.street +
    ', ' +
    deliveryPoint.suburb +
    ', ' +
    deliveryPoint.cep
  )
}

export default serializeDeliveryPoint
