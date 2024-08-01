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
import { Button } from '@/components/ui/button'
import { toast } from '@/components/ui/use-toast'
import { addPiloto, Piloto, updatePiloto } from '@/services/piloto'

const formSchema = z.object({
  nome: z.string({
    required_error: 'Digite o nome da temporada',
  }),
  urlImage: z.string({
    required_error: 'Coloque o url da Imagem',
  }),
})

export const SheetFormPiloto = ({
  children,
  open,
  onOpenChange,
  defaultValue,
  atualizarLista,
}: {
  children: React.ReactNode
  open: boolean
  onOpenChange: (open: boolean) => void
  defaultValue?: Piloto
  atualizarLista: () => void
}) => {
  const ref = useRef<HTMLDivElement>(null)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValue
      ? {
          nome: defaultValue.nome,
          urlImage: defaultValue.urlImage,
        }
      : {},
  })

  useEffect(() => {
    if (defaultValue) {
      form.reset({
        nome: defaultValue.nome,
        urlImage: defaultValue.urlImage,
      })
    } else {
      form.reset({
        nome: '',
        urlImage: '',
      })
    }
  }, [defaultValue, form])

  const onSubmit = form.handleSubmit(async (data) => {
    try {
      const novoPiloto: Piloto = {
        id: defaultValue?.id || '',
        nome: data.nome,
        urlImage: data.urlImage,
      }

      if (defaultValue) {
        await updatePiloto(novoPiloto)
      } else {
        await addPiloto(novoPiloto)
      }

      form.reset()
      ref.current?.click()
      atualizarLista()

      toast({
        title: `Piloto ${defaultValue ? 'atualizado' : 'adicionado'} com sucesso`,
      })
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Erro ao adicionar piloto',
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
          <SheetTitle>Adicionar Novo Piloto</SheetTitle>
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
              name="urlImage"
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
