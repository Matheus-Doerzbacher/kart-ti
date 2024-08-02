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
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { cn } from '@/lib/utils'
import { CaretSortIcon } from '@radix-ui/react-icons'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import { CheckIcon } from 'lucide-react'
import { ScrollArea } from '@/components/ui/scroll-area'

const formSchema = z.object({
  idPista: z.string({
    required_error: 'Selecione a pista',
  }),
  idTemporada: z.string({
    required_error: 'Selecione a temporada',
  }),
  data: z.date({
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
  // const [temporadas, setTemporadas] = useState<Temporada[]>([])
  // const [pilotos, setPilotos] = useState<Piloto[]>([])

  const [openPistas, setOpenPistas] = useState<boolean>(false)
  // const [openTemporadas, setOpenTemporadas] = useState<boolean>(false)
  // const [openPilotos, setOpenPilotos] = useState<boolean>(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValue
      ? {
          idPista: defaultValue.idPista,
          idTemporada: defaultValue.idTemporada,
          data: defaultValue.data,
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
        data: defaultValue.data,
        voltas: defaultValue.voltas,
        tempo: defaultValue.tempo,
        idPiloto: defaultValue.idPiloto,
      })
    } else {
      form.reset({
        idPista: '',
        idTemporada: '',
        data: new Date(),
        voltas: 0,
        tempo: '',
        idPiloto: undefined,
      })
    }
  }, [defaultValue, form])

  useEffect(() => {
    const updateDatasSelect = async () => {
      // const dataTemporadas = await getAllTemporada()
      // const dataPilotos = await getAllPiloto()
      const dataPistas = await getAllPista()

      // setTemporadas(dataTemporadas)
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
        data: data.data,
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
      console.log(error)
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
                <FormItem>
                  <FormLabel>Nome</FormLabel>
                  <Popover open={openPistas} onOpenChange={setOpenPistas}>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          role="combobox"
                          aria-expanded={openPistas}
                          className={cn(
                            'w-full justify-between',
                            !field.value && 'text-muted-foreground',
                          )}
                        >
                          {field.value
                            ? pistas.find((pista) => pista.id === field.value)
                                ?.nome
                            : 'Selecione a Pista'}
                          <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="p-2 max-h-[400px]">
                      <Command>
                        <CommandInput
                          placeholder="Pesquise a pista..."
                          className="h-9"
                        />
                        <ScrollArea className="h-[300px]">
                          <CommandEmpty>No framework found.</CommandEmpty>
                          <CommandGroup>
                            <CommandList>
                              {pistas.map((pista) => (
                                <CommandItem
                                  value={pista.nome}
                                  key={pista.id}
                                  onSelect={() => {
                                    form.setValue('idPista', pista.id)
                                    setOpenPistas(false)
                                  }}
                                >
                                  {pista.nome}
                                  <CheckIcon
                                    className={cn(
                                      'ml-auto h-4 w-4',
                                      pista.id === field.value
                                        ? 'opacity-100'
                                        : 'opacity-0',
                                    )}
                                  />
                                </CommandItem>
                              ))}
                            </CommandList>
                          </CommandGroup>
                        </ScrollArea>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="idTemporada"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Local</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="tempo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Url da Imagem</FormLabel>
                  <FormControl>
                    <Input {...field} />
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
