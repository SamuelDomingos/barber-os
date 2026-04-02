"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Plus } from "lucide-react";
import { phoneMask } from "@/lib/utils";
import useFormTeam from "../../_hooks/useFormTeam";

const FormBarber = ({
  data,
  isEditing,
  onSuccess,
  onCancel,
}: {
  data?: {
    id: string;
    name: string;
    email: string;
    phone: string | null;
    avatar: string | null;
    active: boolean;
  };
  isEditing?: boolean;
  onSuccess?: () => void;
  onCancel?: () => void;
}) => {
  
  const {
    form,
    handleSubmit,
    handleAvatarFileChange,
    avatarPreviewUrl,
    isLoading,
    fileInputRef,
  } = useFormTeam({ data, isEditing, onSuccess });

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-3 py-2">
        <FormField
          control={form.control}
          name="avatar"
          render={() => (
            <FormItem className="col-span-2 flex justify-center">
              <FormControl>
                <div className="flex flex-col items-center">
                  <div className="relative w-fit">
                    <Avatar className="w-28 h-28 bg-cyan-100 text-foreground text-2xl">
                      <AvatarImage src={avatarPreviewUrl ?? ""} />
                      <AvatarFallback>
                        {form.watch("name")
                          ? form.watch("name").slice(0, 2).toUpperCase()
                          : "BB"}
                      </AvatarFallback>
                    </Avatar>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleAvatarFileChange}
                    />
                    <button
                      type="button"
                      className="absolute right-0 bottom-0 w-10 h-10 flex items-center justify-center rounded-full bg-secondary border-4 border-background shadow transition hover:bg-secondary/80 focus:outline-none focus:ring-2 focus:ring-secondary"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <Plus className="text-white" size={16} />
                    </button>
                  </div>
                  <div className="mt-3 space-y-1 text-center">
                    <p className="text-sm font-medium">Avatar do usuário</p>
                    <p className="text-xs text-muted-foreground">
                      Opcional. Use uma imagem ou deixe as iniciais.
                    </p>
                  </div>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome</FormLabel>
              <FormControl>
                <Input placeholder="Pedro Henrique" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Telefone</FormLabel>
              <FormControl>
                <Input
                  placeholder="(85) 99999-0000"
                  {...field}
                  onChange={(e) => field.onChange(phoneMask(e.target.value))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="col-span-2">
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="pedro@email.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {!isEditing && (
          <>
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Senha</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="••••••••" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirmar senha</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="••••••••" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </>
        )}

        <DialogFooter className="col-span-2 pt-2">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancelar
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading
              ? isEditing
                ? "Salvando..."
                : "Cadastrando..."
              : isEditing
                ? "Salvar"
                : "Cadastrar"}
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
};

export default FormBarber;
