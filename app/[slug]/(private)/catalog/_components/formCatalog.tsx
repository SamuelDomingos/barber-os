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
import { Switch } from "@/components/ui/switch";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useFieldArray } from "react-hook-form";
import { useState } from "react";
import { CatalogItem } from "@/lib/api/types/catalog";
import { Tab, typeOptions } from "../_types/catalogComponentType";
import useFormCatalog from "../_hooks/useFormCatalog";
import FormImageUpload from "@/components/formImageUpload";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item";
import Image from "next/image";
import { formatCurrency, parseCurrency } from "@/lib/utils";

const FormCatalog = ({
  data,
  isEditing,
  onSuccess,
  onCancel,
}: {
  data?: CatalogItem;
  isEditing?: boolean;
  onSuccess?: () => void;
  onCancel?: () => void;
}) => {
  const [tab, setTab] = useState<Tab>(data?.type ?? "SERVICE");

  const {
    form,
    isLoading,
    imagePreview,
    fileInputRef,
    handleImageChange,
    handleSubmit,
    // availableItems,
  } = useFormCatalog({ tab, data, isEditing, onSuccess });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "items" as never,
  });

  return (
    <Form {...form}>
      <form
        key={tab}
        onSubmit={handleSubmit}
        className="grid grid-cols-2 gap-3 py-2"
      >
        <FormImageUpload
          preview={imagePreview}
          fileInputRef={fileInputRef}
          onChange={handleImageChange}
          variant="card"
        />

        {!isEditing && (
          <div className="col-span-2">
            <p className="text-sm font-medium mb-2">Tipo</p>
            <RadioGroup
              value={tab}
              onValueChange={(v) => setTab(v as Tab)}
              className="flex gap-4"
            >
              {typeOptions.map((opt) => (
                <div key={opt.value} className="flex items-center gap-2">
                  <RadioGroupItem value={opt.value} id={opt.value} />
                  <label htmlFor={opt.value} className="text-sm cursor-pointer">
                    {opt.label}
                  </label>
                </div>
              ))}
            </RadioGroup>
          </div>
        )}

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className={tab === "PACKAGE" ? "col-span-2" : ""}>
              <FormLabel>Nome</FormLabel>
              <FormControl>
                <Input
                  placeholder={
                    tab === "SERVICE"
                      ? "Corte masculino"
                      : tab === "PRODUCT"
                        ? "Pomada modeladora"
                        : "Combo completo"
                  }
                  {...field}
                  value={field.value as string}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {tab === "SERVICE" && (
          <FormField
            control={form.control}
            name="duration"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Duração (min)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="30"
                    {...field}
                    value={field.value as number}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Categoria</FormLabel>
              <FormControl>
                <Input
                  placeholder="pomada, shampoo..."
                  {...field}
                  value={field.value as string}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem className="col-span-2">
              <FormLabel>Descrição</FormLabel>
              <FormControl>
                <Input
                  placeholder="Descrição opcional"
                  {...field}
                  value={field.value as string}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Preço (R$)</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="R$ 0,00"
                  value={formatCurrency(field.value || 0)}
                  onChange={(e) => {
                    const parsed = parseCurrency(e.target.value);
                    field.onChange(parsed);
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="active"
          render={({ field }) => (
            <FormItem
              className={`flex items-center justify-between rounded-lg border p-3 ${tab === "PRODUCT" ? "" : "col-span-2"}`}
            >
              <FormLabel className="mb-0">Ativo</FormLabel>
              <FormControl>
                <Switch
                  checked={field.value as boolean}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />

        {/* {tab === "PACKAGE" && (
        <ScrollArea className="h-48 mt-2 border rounded-md p-2">
          {isLoading && (
            <p className="text-sm text-muted-foreground">Carregando...</p>
          )}
          {!isLoading && data?.length === 0 && (
            <p className="text-sm text-muted-foreground">
              Nenhum serviço encontrado
            </p>
          )}
          <div className="flex flex-col gap-2">
            <ItemGroup>
              {data?.map((service) => (
                <Item
                  asChild
                  className={`bg-background ${isServiceSelected(form, service.id) ? "bg-primary/10 border-primary" : "hover:bg-muted"}`}
                  key={service.id}
                  onClick={() => toggleService(form, service)}
                  variant="outline"
                >
                  <a href="#">
                    <ItemMedia variant="image">
                      <Image
                        src={service.image}
                        alt={service.name}
                        className="object-cover grayscale"
                        height={32}
                        width={32}
                      />
                    </ItemMedia>
                    <ItemContent>
                      <ItemTitle className="line-clamp-1">
                        {service.name} - {service.duration} min
                      </ItemTitle>
                      <ItemDescription>{service.description}</ItemDescription>
                    </ItemContent>
                    <ItemContent className="flex-none text-center">
                      <ItemDescription>R$ {service.price}</ItemDescription>
                    </ItemContent>
                  </a>
                </Item>
              ))}
            </ItemGroup>
          </div>
        </ScrollArea>
        )} */}

        <DialogFooter className="col-span-2 pt-2">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancelar
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Salvando..." : isEditing ? "Salvar" : "Criar"}
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
};

export default FormCatalog;
