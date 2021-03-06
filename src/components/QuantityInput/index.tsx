import { Container } from './styles'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  quantity: number
}

const NumInput: React.FC<InputProps> = ({ quantity }) => {
  const updateValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ quantity: e.target.value })
  }

  return (
    <div className="quantity-input">
      <button
        className="quantity-input_modifier quantity-input_modifier-left"
        onClick={}
      ></button>
      <input
        className="quantity-input__screen"
        type="text"
        value={updateValue}
        readOnly
      />
      <button
        className="quantity-input_modifier quantity-input_modifier-right"
        onClick={}
      ></button>
    </div>
  )
}

export default NumInput
