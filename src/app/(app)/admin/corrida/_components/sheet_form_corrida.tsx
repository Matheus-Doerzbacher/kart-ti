'use client'

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useEffect, useRef, useState } from 'react'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { toast } from '@/components/ui/use-toast'
import { addCorrida, Corrida, updateCorrida } from '@/services/corrida'
import { getAllPista, Pista } from '@/services/pista'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { getAllTemporada, Temporada } from '@/services/temporada'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { cn } from '@/lib/utils'
import { format } from 'date-fns'
import { CalendarIcon } from 'lucide-react'
import { Calendar } from '@/components/ui/calendar'
import { Timestamp } from 'firebase/firestore'

const formSchema = z.object({
  idPista: z.string({
    required_error: 'Selecione a pista',
  }),
  idTemporada: z.string({
    required_error: 'Selecione a temporada',
  }),
  data: z.string({
    required_error: 'Selecione a data da corrida',
  }),
  voltas: z.number({
    required_error: 'Digite o número de voltas',
  }),
  tempo: z.string({
    required_error: 'Digite o tempo da corrida',
  }),
  idPiloto: z.string().optional(),
})

export const SheetFormCorrida = ({
  children,
  open,
  onOpenChange,
  defaultValue,
  atualizarLista,
}: {
  children: React.ReactNode
  open: boolean
  onOpenChange: (open: boolean) => void
  defaultValue?: Corrida
  atualizarLista: () => void
}) => {
  const ref = useRef<HTMLDivElement>(null)
  const [pistas, setPistas] = useState<Pista[]>([])
  const [temporadas, setTemporadas] = useState<Temporada[]>([])
  // const [pilotos, setPilotos] = useState<Piloto[]>([])

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValue
      ? {
          idPista: defaultValue.idPista,
          idTemporada: defaultValue.idTemporada,
          data:
            defaultValue.data instanceof Timestamp
              ? format(defaultValue.data.toDate(), 'yyyy-MM-dd')
              : format(new Date(defaultValue.data), 'yyyy-MM-dd'),
          voltas: defaultValue.voltas,
          tempo: defaultValue.tempo,
          idPiloto: defaultValue.idPiloto,
        }
      : {},
  })

  useEffect(() => {
    if (defaultValue) {
      form.reset({
        idPista: defaultValue.idPista,
        idTemporada: defaultValue.idTemporada,
        data:
          defaultValue.data instanceof Timestamp
            ? format(defaultValue.data.toDate(), 'yyyy-MM-dd')
            : format(new Date(defaultValue.data), 'yyyy-MM-dd'),
        voltas: defaultValue.voltas,
        tempo: defaultValue.tempo,
        idPiloto: defaultValue.idPiloto,
      })
    } else {
      form.reset({
        idPista: '',
        idTemporada: '',
        data: format(new Date(), 'yyyy-MM-dd'),
        voltas: 0,
        tempo: '',
        idPiloto: '',
      })
    }
  }, [defaultValue, form])

  useEffect(() => {
    const updateDatasSelect = async () => {
      const dataTemporadas = await getAllTemporada()
      // const dataPilotos = await getAllPiloto()
      const dataPistas = await getAllPista()

      setTemporadas(dataTemporadas)
      // setPilotos(dataPilotos)
      setPistas(dataPistas)
    }

    updateDatasSelect()
  }, [])

  const onSubmit = form.handleSubmit(async (data) => {
    try {
      const novaCorrida: Corrida = {
        id: defaultValue?.id || '',
        idPista: data.idPista,
        idTemporada: data.idTemporada,
        data: Timestamp.fromDate(new Date(data.data)),
        voltas: data.voltas,
        tempo: data.tempo,
        idPiloto: data.idPiloto,
      }

      if (defaultValue) {
        await updateCorrida(novaCorrida)
      } else {
        await addCorrida(novaCorrida)
      }

      form.reset()
      ref.current?.click()
      atualizarLista()

      toast({
        title: `Corrida ${defaultValue ? 'atualizada' : 'adicionada'} com sucesso`,
      })
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Erro ao adicionar Corrida',
        description: 'Ocorreu um erro inesperado',
      })
      console.error(error)
    }
  })

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetTrigger asChild>
        <div ref={ref}>{children}</div>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>
            {defaultValue ? 'Atualizar Pista' : 'Adicionar Nova Pista'}
          </SheetTitle>
        </SheetHeader>
        <Form {...form}>
          <form onSubmit={onSubmit} className="space-y-5 pt-5">
            <FormField
              control={form.control}
              name="idPista"
              render={({ field }) => (
                // SELECIONE A PISTA
                <FormItem>
                  <FormLabel>Pista</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione a pista" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {pistas.map((pista) => (
                        <SelectItem key={pista.id} value={pista.id}>
                          {pista.nome}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* SELECIONE A TEMPORADA */}
            <FormField
              control={form.control}
              name="idTemporada"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Temporada</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione a temporada" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {temporadas.map((temporada) => (
                        <SelectItem key={temporada.id} value={temporada.id}>
                          {temporada.nome}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* SELECIONE A DATA */}
            <FormField
              control={form.control}
              name="data"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Data</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={'outline'}
                          className={cn(
                            'w-full pl-3 text-left font-normal',
                            !field.value && 'text-muted-foreground',
                          )}
                        >
                          {field.value ? (
                            format(field.value, 'dd/MM/yyyy')
                          ) : (
                            <span>Selecione a data</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={
                          field.value ? new Date(field.value) : undefined
                        }
                        onSelect={(date) => {
                          field.onChange(date ? date.toISOString() : undefined)
                          form.clearErrors('data')
                        }}
                        disabled={(date) =>
                          date > new Date() || date < new Date('1900-01-01')
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="tempo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tempo</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="voltas"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Voltas</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">
              Salvar
            </Button>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  )
}
