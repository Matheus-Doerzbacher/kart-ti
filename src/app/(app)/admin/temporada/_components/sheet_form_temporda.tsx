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
import { addTemporada, Temporada, updateTemporada } from '@/services/temporada'
import { useEffect, useRef } from 'react'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Checkbox } from '@/components/ui/checkbox'
import { Button } from '@/components/ui/button'
import { toast } from '@/components/ui/use-toast'

const formSchema = z.object({
  nome: z.string({
    required_error: 'Digite o nome da temporada',
  }),
  ano: z
    .number({
      required_error: 'Digite o ano da temporada',
    })
    .max(9999, 'O ano deve ter no máximo 4 dígitos')
    .min(1111, 'O ano deve ter no mínimo 4 dígitos'),
  atual: z.boolean().optional(),
})

export const SheetFormTemporada = ({
  children,
  open,
  onOpenChange,
  defaultValue,
  atualizarLista,
}: {
  children: React.ReactNode
  open: boolean
  onOpenChange: (open: boolean) => void
  defaultValue?: Temporada
  atualizarLista: () => void
}) => {
  const ref = useRef<HTMLDivElement>(null)
  // const [isLoading, setIsLoading] = useState(false)
  // const [nomeTemporada, setNomeTemporada] = useState<string>('')
  // const [anoTemporada, setAnoTemporada] = useState<number | null>(null)
  // const [atualTemporada, setAtualTemporada] = useState<boolean>(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValue
      ? {
          nome: defaultValue.nome,
          ano: defaultValue.ano,
          atual: defaultValue.atual,
        }
      : {},
  })

  useEffect(() => {
    if (defaultValue) {
      form.reset({
        nome: defaultValue.nome,
        ano: defaultValue.ano,
        atual: defaultValue.atual,
      })
    } else {
      form.reset({
        nome: '',
        ano: 0,
        atual: false,
      })
    }
  }, [defaultValue, form])

  const onSubmit = form.handleSubmit(async (data) => {
    try {
      const navaTemporada = {
        nome: data.nome,
        ano: data.ano,
        atual: data.atual ?? false,
      }

      if (defaultValue) {
        await updateTemporada(defaultValue.id, navaTemporada)
      } else {
        await addTemporada(navaTemporada)
      }

      form.reset()
      ref.current?.click()
      atualizarLista()

      toast({
        title: `Temporada ${defaultValue ? 'atualizada' : 'adicionada'} com sucesso`,
      })
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Erro ao adicionar temporada',
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
            <FormField
              control={form.control}
              name="nome"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="ano"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ano</FormLabel>
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
              name="atual"
              render={({ field }) => (
                <FormItem className="space-x-2">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormLabel>Atual</FormLabel>
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
