import { useState } from 'react'

type initialValues = Record<string, string>

interface useFormArgs {
  initialValues: initialValues
  onSubmit: (values: Record<keyof initialValues, string>) => void
  validateSchema: Record<keyof initialValues, string>
}

export function useForm(args: useFormArgs): {
  values: initialValues
  errors: Record<keyof initialValues, string>
  isSubmitting: boolean
  handleChange: (e: any) => void
  handleSubmit: (e: any) => void
  resetForm: () => void
} {
  const { initialValues, onSubmit } = args
  const [values, setValues] = useState(initialValues)
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e): void => {
    const { name, value } = e.target
    setValues({
      ...values,
      [name]: value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const validationErrors = validate(values)
    setErrors(validationErrors)
    setIsSubmitting(true)
    onSubmit(values)
  }

  const validate = (values): Record<string, string> => {
    // Implementa tu lógica de validación aquí
    // Devuelve un objeto con los errores encontrados
    // Ejemplo: { fieldName: 'Mensaje de error' }
    return {}
  }

  const resetForm = (): void => {
    setValues(initialValues)
    setErrors({})
    setIsSubmitting(false)
  }

  return {
    values,
    errors,
    isSubmitting,
    handleChange,
    handleSubmit,
    resetForm
  }
}
