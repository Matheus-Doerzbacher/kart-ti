import { HeaderAdmin } from './_components/header_admin'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <HeaderAdmin />
      {children}
    </>
  )
}
