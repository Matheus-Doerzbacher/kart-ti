import { HeaderCustom } from './_components/header'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <HeaderCustom />
      {children}
    </>
  )
}
