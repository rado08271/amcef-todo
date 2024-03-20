import { FieldValues, UseFormRegister} from "react-hook-form";

type Props = {
    register?: UseFormRegister<FieldValues>
    id: string
    label?: string
    type?: 'text' | 'future' | 'past'
    required?: boolean
    placeholder?: string
    disabled?: boolean
    defaultValue?: string
    onValueChange?: (value: string) => void
}
const Input = ({register, id, label, placeholder, type = 'text', required = false, disabled, defaultValue, onValueChange}: Props) => {

    const handleType = () => {
        switch (type) {
            case "past":
            case 'future':
                return 'date'
            default:
                return type
        }
    }

    return (
        <div className={'w-full flex flex-col justify-center card-center relative'}>
            {/* onChange placed before register so it's overwritten by spreading register */}
            <input
                onChange={event => onValueChange(event.target.value)}
                {...(register ? register(id) : {})}
                aria-required={required} required={required}
                id={id} type={handleType()}
                placeholder={placeholder}
                disabled={disabled}
                min={new Date().toISOString().substring(0, 10)}
                defaultValue={handleType() === 'date' && !defaultValue ? new Date().toISOString().substring(0, 10) : defaultValue}
                className={
                    'ease-out duration-200 hover:ease-in focus:ease-in ' +
                    'bg-transparent border-2 rounded-md px-3 py-2 w-full border-slate-400 font-bold text-slate-400 ' +
                    'focus:text-blue-500 focus:border-blue-500 focus:outline-none ' +
                    'disabled:border-slate-200 disabled:text-slate-200 '}
            />
            {label && label.trim() != '' &&
                <label htmlFor={id} className={'uppercase font-bold w-full text-xs ps-4'}>{label}</label>
            }
        </div>
    )
}

export default Input