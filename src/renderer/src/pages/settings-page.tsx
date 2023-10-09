import { Layout } from '@renderer/components'
import { useSettingsContext } from '@renderer/hooks'

export const SettingsPage = () => {
  const {
    hotkeys: { isLoading, keys }
  } = useSettingsContext()

  if (isLoading) {
    return <p>cargando...</p>
  }

  return (
    <Layout>
      <p>{JSON.stringify(keys)}</p>
    </Layout>
  )
}
