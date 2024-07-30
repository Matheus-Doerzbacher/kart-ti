import Link from 'next/link'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card'
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '@/components/ui/table'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'

export default function Page() {
  return (
    <div className="flex flex-col w-full min-h-screen bg-background">
      <header className="bg-card py-4 px-6 shadow">
        <nav className="flex items-center justify-between">
          <Link
            href="#"
            className="text-2xl font-bold text-card-foreground"
            prefetch={false}
          >
            Gerenciador de Corridas de Kart
          </Link>
          <div className="flex items-center gap-4">
            <Link
              href="#"
              className="text-card-foreground hover:text-primary-foreground"
              prefetch={false}
            >
              Corridas
            </Link>
            <Link
              href="#"
              className="text-card-foreground hover:text-primary-foreground"
              prefetch={false}
            >
              Classificações
            </Link>
            <Link
              href="#"
              className="text-card-foreground hover:text-primary-foreground"
              prefetch={false}
            >
              Pistas
            </Link>
            <Link
              href="#"
              className="text-card-foreground hover:text-primary-foreground"
              prefetch={false}
            >
              Pilotos
            </Link>
            <Button>
              <a href="/new-race">Nova Corrida</a>
            </Button>
          </div>
        </nav>
      </header>
      <main className="flex-1 py-8 px-6">
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-card-foreground">
              Corridas Recentes
            </h2>
            <Link
              href="#"
              className="text-primary hover:text-primary-hover"
              prefetch={false}
            >
              Ver Todas
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Corrida na Pista de Corrida</CardTitle>
                <CardDescription>15 de Junho de 2024</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Pos</TableHead>
                      <TableHead>Piloto</TableHead>
                      <TableHead>Tempo</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>1</TableCell>
                      <TableCell className="flex items-center gap-2">
                        <Avatar className="w-6 h-6">
                          <AvatarImage src="/placeholder-user.jpg" />
                          <AvatarFallback>JS</AvatarFallback>
                        </Avatar>
                        João da Silva
                      </TableCell>
                      <TableCell>1:23.456</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>2</TableCell>
                      <TableCell className="flex items-center gap-2">
                        <Avatar className="w-6 h-6">
                          <AvatarImage src="/placeholder-user.jpg" />
                          <AvatarFallback>MO</AvatarFallback>
                        </Avatar>
                        Maria Oliveira
                      </TableCell>
                      <TableCell>1:24.789</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>3</TableCell>
                      <TableCell className="flex items-center gap-2">
                        <Avatar className="w-6 h-6">
                          <AvatarImage src="/placeholder-user.jpg" />
                          <AvatarFallback>PA</AvatarFallback>
                        </Avatar>
                        Pedro Almeida
                      </TableCell>
                      <TableCell>1:25.012</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Corrida em Riverside</CardTitle>
                <CardDescription>1 de Junho de 2024</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Pos</TableHead>
                      <TableHead>Piloto</TableHead>
                      <TableHead>Tempo</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>1</TableCell>
                      <TableCell className="flex items-center gap-2">
                        <Avatar className="w-6 h-6">
                          <AvatarImage src="/placeholder-user.jpg" />
                          <AvatarFallback>MO</AvatarFallback>
                        </Avatar>
                        Maria Oliveira
                      </TableCell>
                      <TableCell>1:22.789</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>2</TableCell>
                      <TableCell className="flex items-center gap-2">
                        <Avatar className="w-6 h-6">
                          <AvatarImage src="/placeholder-user.jpg" />
                          <AvatarFallback>PA</AvatarFallback>
                        </Avatar>
                        Pedro Almeida
                      </TableCell>
                      <TableCell>1:23.012</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>3</TableCell>
                      <TableCell className="flex items-center gap-2">
                        <Avatar className="w-6 h-6">
                          <AvatarImage src="/placeholder-user.jpg" />
                          <AvatarFallback>JS</AvatarFallback>
                        </Avatar>
                        João da Silva
                      </TableCell>
                      <TableCell>1:24.456</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Corrida em Lakeside</CardTitle>
                <CardDescription>15 de Maio de 2024</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Pos</TableHead>
                      <TableHead>Piloto</TableHead>
                      <TableHead>Tempo</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>1</TableCell>
                      <TableCell className="flex items-center gap-2">
                        <Avatar className="w-6 h-6">
                          <AvatarImage src="/placeholder-user.jpg" />
                          <AvatarFallback>PA</AvatarFallback>
                        </Avatar>
                        Pedro Almeida
                      </TableCell>
                      <TableCell>1:21.012</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>2</TableCell>
                      <TableCell className="flex items-center gap-2">
                        <Avatar className="w-6 h-6">
                          <AvatarImage src="/placeholder-user.jpg" />
                          <AvatarFallback>JS</AvatarFallback>
                        </Avatar>
                        João da Silva
                      </TableCell>
                      <TableCell>1:22.456</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>3</TableCell>
                      <TableCell className="flex items-center gap-2">
                        <Avatar className="w-6 h-6">
                          <AvatarImage src="/placeholder-user.jpg" />
                          <AvatarFallback>MO</AvatarFallback>
                        </Avatar>
                        Maria Oliveira
                      </TableCell>
                      <TableCell>1:23.789</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </section>
        <section className="mt-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-card-foreground">
              Classificação de Pilotos
            </h2>
            <Link
              href="#"
              className="text-primary hover:text-primary-hover"
              prefetch={false}
            >
              Ver Todas
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Classificação Geral</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Pos</TableHead>
                      <TableHead>Piloto</TableHead>
                      <TableHead>Pontos</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>1</TableCell>
                      <TableCell className="flex items-center gap-2">
                        <Avatar className="w-6 h-6">
                          <AvatarImage src="/placeholder-user.jpg" />
                          <AvatarFallback>JS</AvatarFallback>
                        </Avatar>
                        João da Silva
                      </TableCell>
                      <TableCell>120</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>2</TableCell>
                      <TableCell className="flex items-center gap-2">
                        <Avatar className="w-6 h-6">
                          <AvatarImage src="/placeholder-user.jpg" />
                          <AvatarFallback>MO</AvatarFallback>
                        </Avatar>
                        Maria Oliveira
                      </TableCell>
                      <TableCell>100</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>3</TableCell>
                      <TableCell className="flex items-center gap-2">
                        <Avatar className="w-6 h-6">
                          <AvatarImage src="/placeholder-user.jpg" />
                          <AvatarFallback>PA</AvatarFallback>
                        </Avatar>
                        Pedro Almeida
                      </TableCell>
                      <TableCell>90</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Vitórias</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Pos</TableHead>
                      <TableHead>Piloto</TableHead>
                      <TableHead>Vitórias</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>1</TableCell>
                      <TableCell className="flex items-center gap-2">
                        <Avatar className="w-6 h-6">
                          <AvatarImage src="/placeholder-user.jpg" />
                          <AvatarFallback>JS</AvatarFallback>
                        </Avatar>
                        João da Silva
                      </TableCell>
                      <TableCell>4</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>2</TableCell>
                      <TableCell className="flex items-center gap-2">
                        <Avatar className="w-6 h-6">
                          <AvatarImage src="/placeholder-user.jpg" />
                          <AvatarFallback>MO</AvatarFallback>
                        </Avatar>
                        Maria Oliveira
                      </TableCell>
                      <TableCell>3</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>3</TableCell>
                      <TableCell className="flex items-center gap-2">
                        <Avatar className="w-6 h-6">
                          <AvatarImage src="/placeholder-user.jpg" />
                          <AvatarFallback>PA</AvatarFallback>
                        </Avatar>
                        Pedro Almeida
                      </TableCell>
                      <TableCell>2</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Voltas Mais Rápidas</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Pos</TableHead>
                      <TableHead>Piloto</TableHead>
                      <TableHead>Volta Mais Rápida</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>1</TableCell>
                      <TableCell className="flex items-center gap-2">
                        <Avatar className="w-6 h-6">
                          <AvatarImage src="/placeholder-user.jpg" />
                          <AvatarFallback>MO</AvatarFallback>
                        </Avatar>
                        Maria Oliveira
                      </TableCell>
                      <TableCell>1:21.789</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>2</TableCell>
                      <TableCell className="flex items-center gap-2">
                        <Avatar className="w-6 h-6">
                          <AvatarImage src="/placeholder-user.jpg" />
                          <AvatarFallback>PA</AvatarFallback>
                        </Avatar>
                        Pedro Almeida
                      </TableCell>
                      <TableCell>1:22.012</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>3</TableCell>
                      <TableCell className="flex items-center gap-2">
                        <Avatar className="w-6 h-6">
                          <AvatarImage src="/placeholder-user.jpg" />
                          <AvatarFallback>JS</AvatarFallback>
                        </Avatar>
                        João da Silva
                      </TableCell>
                      <TableCell>1:22.456</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
    </div>
  )
}
