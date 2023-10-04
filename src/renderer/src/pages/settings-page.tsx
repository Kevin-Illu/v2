import { Layout } from '@renderer/components'
import { useSettigs } from '@renderer/context'

export const SettingsPage = () => {
  const {
    hotkeys: { isLoading, keys }
  } = useSettigs()

  if (isLoading) {
    return <p>cargando...</p>
  }

  return (
    <Layout>
      <p>{JSON.stringify(keys)}</p>
    </Layout>
  )
}
