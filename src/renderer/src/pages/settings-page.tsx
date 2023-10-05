import { Layout } from '@renderer/components'
import { useSettings } from '@renderer/context/index'

export const SettingsPage = () => {
  const {
    hotkeys: { isLoading, keys }
  } = useSettings()

  if (isLoading) {
    return <p>cargando...</p>
  }

  return (
    <Layout>
      <p>{JSON.stringify(keys)}</p>
    </Layout>
  )
}
