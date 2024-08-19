import { HeaderResultados } from './_components/header_resultados'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <HeaderResultados />
      {children}
    </>
  )
}
