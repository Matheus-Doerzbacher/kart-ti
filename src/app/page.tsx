'use client'
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
            Karting Race Manager
          </Link>
          <div className="flex items-center gap-4">
            <Link
              href="#"
              className="text-card-foreground hover:text-primary-foreground"
              prefetch={false}
            >
              Races
            </Link>
            <Link
              href="#"
              className="text-card-foreground hover:text-primary-foreground"
              prefetch={false}
            >
              Rankings
            </Link>
            <Button>
              <a href="/new-race">New Race</a>
            </Button>
          </div>
        </nav>
      </header>
      <main className="flex-1 py-8 px-6">
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-card-foreground">
              Recent Races
            </h2>
            <Link
              href="#"
              className="text-primary hover:text-primary-hover"
              prefetch={false}
            >
              View All
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Race at Racetrack</CardTitle>
                <CardDescription>June 15, 2024</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Pos</TableHead>
                      <TableHead>Driver</TableHead>
                      <TableHead>Time</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>1</TableCell>
                      <TableCell className="flex items-center gap-2">
                        <Avatar className="w-6 h-6">
                          <AvatarImage src="/placeholder-user.jpg" />
                          <AvatarFallback>JD</AvatarFallback>
                        </Avatar>
                        John Doe
                      </TableCell>
                      <TableCell>1:23.456</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>2</TableCell>
                      <TableCell className="flex items-center gap-2">
                        <Avatar className="w-6 h-6">
                          <AvatarImage src="/placeholder-user.jpg" />
                          <AvatarFallback>JS</AvatarFallback>
                        </Avatar>
                        Jane Smith
                      </TableCell>
                      <TableCell>1:24.789</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>3</TableCell>
                      <TableCell className="flex items-center gap-2">
                        <Avatar className="w-6 h-6">
                          <AvatarImage src="/placeholder-user.jpg" />
                          <AvatarFallback>BJ</AvatarFallback>
                        </Avatar>
                        Bob Johnson
                      </TableCell>
                      <TableCell>1:25.012</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Race at Riverside</CardTitle>
                <CardDescription>June 1, 2024</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Pos</TableHead>
                      <TableHead>Driver</TableHead>
                      <TableHead>Time</TableHead>
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
                        Jane Smith
                      </TableCell>
                      <TableCell>1:22.789</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>2</TableCell>
                      <TableCell className="flex items-center gap-2">
                        <Avatar className="w-6 h-6">
                          <AvatarImage src="/placeholder-user.jpg" />
                          <AvatarFallback>BJ</AvatarFallback>
                        </Avatar>
                        Bob Johnson
                      </TableCell>
                      <TableCell>1:23.012</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>3</TableCell>
                      <TableCell className="flex items-center gap-2">
                        <Avatar className="w-6 h-6">
                          <AvatarImage src="/placeholder-user.jpg" />
                          <AvatarFallback>JD</AvatarFallback>
                        </Avatar>
                        John Doe
                      </TableCell>
                      <TableCell>1:24.456</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Race at Lakeside</CardTitle>
                <CardDescription>May 15, 2024</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Pos</TableHead>
                      <TableHead>Driver</TableHead>
                      <TableHead>Time</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>1</TableCell>
                      <TableCell className="flex items-center gap-2">
                        <Avatar className="w-6 h-6">
                          <AvatarImage src="/placeholder-user.jpg" />
                          <AvatarFallback>BJ</AvatarFallback>
                        </Avatar>
                        Bob Johnson
                      </TableCell>
                      <TableCell>1:21.012</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>2</TableCell>
                      <TableCell className="flex items-center gap-2">
                        <Avatar className="w-6 h-6">
                          <AvatarImage src="/placeholder-user.jpg" />
                          <AvatarFallback>JD</AvatarFallback>
                        </Avatar>
                        John Doe
                      </TableCell>
                      <TableCell>1:22.456</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>3</TableCell>
                      <TableCell className="flex items-center gap-2">
                        <Avatar className="w-6 h-6">
                          <AvatarImage src="/placeholder-user.jpg" />
                          <AvatarFallback>JS</AvatarFallback>
                        </Avatar>
                        Jane Smith
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
              Driver Standings
            </h2>
            <Link
              href="#"
              className="text-primary hover:text-primary-hover"
              prefetch={false}
            >
              View All
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Overall Standings</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Pos</TableHead>
                      <TableHead>Driver</TableHead>
                      <TableHead>Points</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>1</TableCell>
                      <TableCell className="flex items-center gap-2">
                        <Avatar className="w-6 h-6">
                          <AvatarImage src="/placeholder-user.jpg" />
                          <AvatarFallback>JD</AvatarFallback>
                        </Avatar>
                        John Doe
                      </TableCell>
                      <TableCell>120</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>2</TableCell>
                      <TableCell className="flex items-center gap-2">
                        <Avatar className="w-6 h-6">
                          <AvatarImage src="/placeholder-user.jpg" />
                          <AvatarFallback>JS</AvatarFallback>
                        </Avatar>
                        Jane Smith
                      </TableCell>
                      <TableCell>100</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>3</TableCell>
                      <TableCell className="flex items-center gap-2">
                        <Avatar className="w-6 h-6">
                          <AvatarImage src="/placeholder-user.jpg" />
                          <AvatarFallback>BJ</AvatarFallback>
                        </Avatar>
                        Bob Johnson
                      </TableCell>
                      <TableCell>90</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Wins</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Pos</TableHead>
                      <TableHead>Driver</TableHead>
                      <TableHead>Wins</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>1</TableCell>
                      <TableCell className="flex items-center gap-2">
                        <Avatar className="w-6 h-6">
                          <AvatarImage src="/placeholder-user.jpg" />
                          <AvatarFallback>JD</AvatarFallback>
                        </Avatar>
                        John Doe
                      </TableCell>
                      <TableCell>4</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>2</TableCell>
                      <TableCell className="flex items-center gap-2">
                        <Avatar className="w-6 h-6">
                          <AvatarImage src="/placeholder-user.jpg" />
                          <AvatarFallback>JS</AvatarFallback>
                        </Avatar>
                        Jane Smith
                      </TableCell>
                      <TableCell>3</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>3</TableCell>
                      <TableCell className="flex items-center gap-2">
                        <Avatar className="w-6 h-6">
                          <AvatarImage src="/placeholder-user.jpg" />
                          <AvatarFallback>BJ</AvatarFallback>
                        </Avatar>
                        Bob Johnson
                      </TableCell>
                      <TableCell>2</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Fastest Laps</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Pos</TableHead>
                      <TableHead>Driver</TableHead>
                      <TableHead>Fastest Lap</TableHead>
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
                        Jane Smith
                      </TableCell>
                      <TableCell>1:21.789</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>2</TableCell>
                      <TableCell className="flex items-center gap-2">
                        <Avatar className="w-6 h-6">
                          <AvatarImage src="/placeholder-user.jpg" />
                          <AvatarFallback>BJ</AvatarFallback>
                        </Avatar>
                        Bob Johnson
                      </TableCell>
                      <TableCell>1:22.012</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>3</TableCell>
                      <TableCell className="flex items-center gap-2">
                        <Avatar className="w-6 h-6">
                          <AvatarImage src="/placeholder-user.jpg" />
                          <AvatarFallback>JD</AvatarFallback>
                        </Avatar>
                        John Doe
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
      <footer className="bg-card py-4 px-6 text-center text-card-foreground">
        <p>&copy; 2024 Karting Race Manager. All rights reserved.</p>
      </footer>
    </div>
  )
}
