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
import {
  addResultadoPiloto,
  getPontos,
  ResultadoPiloto,
  updateResultadoPiloto,
} from '@/services/resultadoPiloto'
import { getAllPiloto, Piloto } from '@/services/piloto'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { mask } from 'remask'

const formSchema = z.object({
  idPiloto: z.string({
    required_error: 'Selecione o piloto',
  }),
  posicao: z.number({
    required_error: 'Digite a posição do piloto',
  }),
  melhorVolta: z.string({
    required_error: 'Digite a melhor volta do piloto',
  }),
  numeroDaMelhorVolta: z.number({
    required_error: 'Digite o número da melhor volta',
  }),
  tempoDoPilotoDaFrente: z.string({
    required_error: 'Digite o tempo do piloto da frente',
  }),
  tempoDoPilotoLider: z.string({
    required_error: 'Digite o tempo do piloto líder',
  }),
  totalDeVoltas: z.number({
    required_error: 'Digite o total de voltas',
  }),
  velocidadeMedia: z.string({
    required_error: 'Digite a velocidade média',
  }),
  numeroKart: z.number({
    required_error: 'Digite o número do kart',
  }),
  posicaoQualificacao: z.number({
    required_error: 'Digite a posição de qualificação',
  }),
  tempoQualificacao: z.string({
    required_error: 'Digite o tempo de qualificação',
  }),
})

export const SheetFormResultado = ({
  children,
  open,
  onOpenChange,
  defaultValue,
  idCorrida,
  atualizarLista,
}: {
  children: React.ReactNode
  open: boolean
  onOpenChange: (open: boolean) => void
  defaultValue?: ResultadoPiloto
  atualizarLista: () => void
  idCorrida: string
}) => {
  const ref = useRef<HTMLDivElement>(null)
  const [selectPilotos, setSelectPilotos] = useState<Piloto[]>([])

  useEffect(() => {
    const buscarPilotos = async () => {
      const pilotos = await getAllPiloto()
      setSelectPilotos(pilotos)
    }
    buscarPilotos()
  }, [])

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValue
      ? {
          idPiloto: defaultValue.idPiloto,
          posicao: defaultValue.posicao,
          melhorVolta: defaultValue.melhorVolta,
          numeroDaMelhorVolta: defaultValue.numeroDaMelhorVolta,
          tempoDoPilotoDaFrente: defaultValue.tempoDoPilotoDaFrente,
          tempoDoPilotoLider: defaultValue.tempoDoPilotoLider,
          totalDeVoltas: defaultValue.totalDeVoltas,
          velocidadeMedia: defaultValue.velocidadeMedia,
          numeroKart: defaultValue.numeroKart,
          posicaoQualificacao: defaultValue.posicaoQualificacao,
          tempoQualificacao: defaultValue.tempoQualificacao,
        }
      : {},
  })

  useEffect(() => {
    if (defaultValue) {
      form.reset({
        idPiloto: defaultValue.idPiloto,
        posicao: defaultValue.posicao,
        melhorVolta: defaultValue.melhorVolta,
        numeroDaMelhorVolta: defaultValue.numeroDaMelhorVolta,
        tempoDoPilotoDaFrente: defaultValue.tempoDoPilotoDaFrente,
        tempoDoPilotoLider: defaultValue.tempoDoPilotoLider,
        totalDeVoltas: defaultValue.totalDeVoltas,
        velocidadeMedia: defaultValue.velocidadeMedia,
        numeroKart: defaultValue.numeroKart,
        posicaoQualificacao: defaultValue.posicaoQualificacao,
        tempoQualificacao: defaultValue.tempoQualificacao,
      })
    } else {
      form.reset({
        idPiloto: '',
        posicao: 0,
        melhorVolta: '',
        numeroDaMelhorVolta: 0,
        tempoDoPilotoDaFrente: '',
        tempoDoPilotoLider: '',
        totalDeVoltas: 0,
        velocidadeMedia: '',
        numeroKart: 0,
        posicaoQualificacao: 0,
        tempoQualificacao: '',
      })
    }
  }, [defaultValue, form])

  const onSubmit = form.handleSubmit(async (data) => {
    try {
      const novoResultado: ResultadoPiloto = {
        id: defaultValue?.id || '',
        idPiloto: data.idPiloto,
        idCorrida,
        posicao: data.posicao,
        pontos: getPontos(data.posicao),
        melhorVolta: data.melhorVolta,
        numeroDaMelhorVolta: data.numeroDaMelhorVolta,
        tempoDoPilotoDaFrente: data.tempoDoPilotoDaFrente,
        tempoDoPilotoLider: data.tempoDoPilotoLider,
        totalDeVoltas: data.totalDeVoltas,
        velocidadeMedia: data.velocidadeMedia,
        numeroKart: data.numeroKart,
        posicaoQualificacao: data.posicaoQualificacao,
        tempoQualificacao: data.tempoQualificacao,
      }

      console.log(novoResultado)

      if (novoResultado.id) {
        await updateResultadoPiloto(novoResultado)
      } else {
        await addResultadoPiloto(novoResultado)
      }

      form.reset()
      ref.current?.click()
      atualizarLista()

      toast({
        title: `Resultado ${defaultValue ? 'atualizado' : 'adicionado'} com sucesso`,
      })
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Erro ao adicionar Resultado',
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
          <SheetTitle>Adicionar Nova Temporada</SheetTitle>
        </SheetHeader>
        <Form {...form}>
          <form onSubmit={onSubmit} className="space-y-5 pt-5">
            <div className="flex gap-2">
              <FormField
                control={form.control}
                name="posicao"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Posição</FormLabel>
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
              <FormField
                control={form.control}
                name="numeroKart"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Numero Kart</FormLabel>
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
            </div>
            <FormField
              control={form.control}
              name="idPiloto"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Piloto</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o piloto" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {selectPilotos.map((piloto) => (
                        <SelectItem key={piloto.id} value={piloto.id}>
                          {piloto.nome}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex gap-2">
              <FormField
                control={form.control}
                name="numeroDaMelhorVolta"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>N Melhor Volta</FormLabel>
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
              <FormField
                control={form.control}
                name="melhorVolta"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Melhor Volta</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        onChange={(e) =>
                          field.onChange(mask(e.target.value, '99:99.999'))
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex gap-2">
              <FormField
                control={form.control}
                name="tempoDoPilotoLider"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tempo Piloto Líder</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        onChange={(e) =>
                          field.onChange(mask(e.target.value, '99:99.999'))
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="tempoDoPilotoDaFrente"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tempo Piloto Frente</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        onChange={(e) =>
                          field.onChange(mask(e.target.value, '99:99.999'))
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex gap-2">
              <FormField
                control={form.control}
                name="totalDeVoltas"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Total de Voltas</FormLabel>
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
              <FormField
                control={form.control}
                name="velocidadeMedia"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Velocidade Média</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        onChange={(e) =>
                          field.onChange(mask(e.target.value, '99.99'))
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex gap-2">
              <FormField
                control={form.control}
                name="posicaoQualificacao"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Posição Qualificação</FormLabel>
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
              <FormField
                control={form.control}
                name="tempoQualificacao"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tempo Qualificação</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        onChange={(e) =>
                          field.onChange(mask(e.target.value, '99:99.999'))
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button type="submit" className="w-full">
              Salvar
            </Button>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  )
}
