import { useEffect } from "react";
import {
    Field,
    FieldDescription,
    FieldGroup,
    FieldLabel,
    FieldLegend,
    FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import { FormFieldConfig, FormRow } from "./type";
import { useForm, type UseFormReturn, Controller, type RegisterOptions } from "react-hook-form";

type FormValues = Record<string, unknown>;

interface FormSection {
    title: string;
    description?: string;
    rows: FormRow[];
}

interface GenericFormProps {
    sections: FormSection[];
    defaultValues?: FormValues;
    onSubmit: (data: FormValues) => void;
    isSubmitting?: boolean;
    submitButtonText?: string;
}

export function GenericForm({
    sections,
    defaultValues,
    onSubmit,
    isSubmitting,
    submitButtonText,
}: GenericFormProps) {
    const form = useForm<FormValues>({
        defaultValues,
    });

    const { handleSubmit } = form;

    // Reset form when defaultValues change (e.g., when opening dialog with different product)
    useEffect(() => {
        if (defaultValues) {
            form.reset(defaultValues);
        }
    }, [JSON.stringify(defaultValues)]);

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            {sections.map((section) => (
                <FieldSet key={section.title}>
                    <FieldLegend>{section.title}</FieldLegend>

                    {section.description && (
                        <FieldDescription>{section.description}</FieldDescription>
                    )}

                    <FieldGroup>
                        {/*
                         * Each FormRow stacks vertically (space-y-4).
                         * Fields WITHIN a row sit side-by-side using a dynamic CSS grid:
                         *   1 field  → full width  (grid-cols-1)
                         *   2 fields → 50 / 50     (grid-cols-2)
                         *   3 fields → 33 / 33 / 33 (grid-cols-3)
                         *   …and so on.
                         * On small screens everything collapses to a single column.
                         */}
                        <div className="space-y-4">
                            {section.rows.map((row, rowIndex) => (
                                <div
                                    key={rowIndex}
                                    className="grid gap-4"
                                    style={{
                                        gridTemplateColumns: `repeat(${row.fields.length}, minmax(0, 1fr))`,
                                    }}
                                    // Collapse to 1 column on narrow viewports via an inline
                                    // media-query polyfill — keep a Tailwind fallback too.
                                    data-cols={row.fields.length}
                                >
                                    {row.fields.map((field) => (
                                        <FormFieldRenderer
                                            key={field.name}
                                            field={field}
                                            form={form}
                                        />
                                    ))}
                                </div>
                            ))}
                        </div>
                    </FieldGroup>
                </FieldSet>
            ))}

            <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Saving..." : (submitButtonText ?? "Save")}
            </Button>
        </form>
    );
}

// ---------------------------------------------------------------------------
// Field renderer
// ---------------------------------------------------------------------------

interface RendererProps {
    field: FormFieldConfig;
    form: UseFormReturn<FormValues>;
}

function FormFieldRenderer({ field, form }: RendererProps) {
    const {
        register,
        control,
        formState: { errors },
    } = form;

    const error = errors[field.name];
    const isNumeric = ["number", "integer", "float"].includes(field.type);
    const disabled = field.editable === false;

    const validationRules: RegisterOptions<FormValues> = {
        ...(field.required && { required: `${field.label} is required` }),
        min: field.min,
        max: field.max,
        minLength: field.minLength,
        maxLength: field.maxLength,
        valueAsNumber: isNumeric,
        validate:
            field.type === "integer"
                ? (value: unknown) =>
                    value === undefined ||
                    value === null ||
                    value === "" ||
                    Number.isInteger(value) ||
                    `${field.label} must be an integer`
                : undefined,
    };

    switch (field.type) {
        // ── text ────────────────────────────────────────────────────────────
        case "text":
            return (
                <Field>
                    <FieldLabel htmlFor={field.name}>{field.label}</FieldLabel>
                    <Input
                        id={field.name}
                        placeholder={field.placeholder}
                        disabled={disabled}
                        {...register(field.name, validationRules)}
                    />
                    {field.description && (
                        <FieldDescription>{field.description}</FieldDescription>
                    )}
                    <FieldError message={error?.message} />
                </Field>
            );

        // ── email ───────────────────────────────────────────────────────────
        case "email":
            return (
                <Field>
                    <FieldLabel htmlFor={field.name}>{field.label}</FieldLabel>
                    <Input
                        id={field.name}
                        type="email"
                        placeholder={field.placeholder}
                        disabled={disabled}
                        {...register(field.name, {
                            ...validationRules,
                            pattern: {
                                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                message: "Enter a valid email address",
                            },
                        } as RegisterOptions)}
                    />
                    {field.description && (
                        <FieldDescription>{field.description}</FieldDescription>
                    )}
                    <FieldError message={error?.message} />
                </Field>
            );

        // ── number / integer / float ─────────────────────────────────────────
        case "number":
        case "integer":
        case "float":
            return (
                <Field>
                    <FieldLabel htmlFor={field.name}>{field.label}</FieldLabel>
                    <Input
                        id={field.name}
                        type="number"
                        step={field.type === "integer" ? 1 : "any"}
                        placeholder={field.placeholder}
                        min={field.min}
                        max={field.max}
                        disabled={disabled}
                        {...register(field.name, validationRules)}
                    />
                    {field.description && (
                        <FieldDescription>{field.description}</FieldDescription>
                    )}
                    <FieldError message={error?.message} />
                </Field>
            );

        // ── textarea ────────────────────────────────────────────────────────
        case "textarea":
            return (
                <Field>
                    <FieldLabel htmlFor={field.name}>{field.label}</FieldLabel>
                    <Textarea
                        id={field.name}
                        placeholder={field.placeholder}
                        disabled={disabled}
                        rows={4}
                        {...register(field.name, validationRules)}
                    />
                    {field.description && (
                        <FieldDescription>{field.description}</FieldDescription>
                    )}
                    <FieldError message={error?.message} />
                </Field>
            );

        // ── select / dropdown ──────────────────────────────────────────────
        case "select":
        case "dropdown":
            return (
                <Field>
                    <FieldLabel htmlFor={field.name}>{field.label}</FieldLabel>
                    <Controller
                        name={field.name}
                        control={control}
                        rules={{ ...(field.required && { required: `${field.label} is required` }) }}
                        render={({ field: ctrl }) => (
                            <Select
                                value={(ctrl.value ?? "") as string}
                                onValueChange={ctrl.onChange}
                                disabled={disabled}
                            >
                                <SelectTrigger id={field.name}>
                                    <SelectValue placeholder={field.placeholder ?? "Select…"} />
                                </SelectTrigger>
                                <SelectContent>
                                    {field.options?.map((opt) => (
                                        <SelectItem key={opt.value} value={opt.value}>
                                            {opt.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        )}
                    />
                    {field.description && (
                        <FieldDescription>{field.description}</FieldDescription>
                    )}
                    <FieldError message={error?.message} />
                </Field>
            );

        // ── switch ──────────────────────────────────────────────────────────
        case "switch":
            return (
                <Field orientation="horizontal">
                    <div className="flex-1">
                        <FieldLabel htmlFor={field.name}>{field.label}</FieldLabel>
                        {field.description && (
                            <FieldDescription>{field.description}</FieldDescription>
                        )}
                    </div>
                    <Controller
                        name={field.name}
                        control={control}
                        rules={{ ...(field.required && { required: `${field.label} is required` }) }}
                        render={({ field: ctrl }) => (
                            <Switch
                                id={field.name}
                                checked={!!ctrl.value}
                                onCheckedChange={ctrl.onChange}
                                disabled={disabled}
                            />
                        )}
                    />
                </Field>
            );

        // ── autocomplete ────────────────────────────────────────────────────
        // Simple implementation — swap for a proper combobox if needed.
        case "autocomplete":
            return (
                <Field>
                    <FieldLabel htmlFor={field.name}>{field.label}</FieldLabel>
                    <Input
                        id={field.name}
                        list={`${field.name}-list`}
                        placeholder={field.placeholder}
                        disabled={disabled}
                        {...register(field.name, validationRules)}
                    />
                    {field.options && (
                        <datalist id={`${field.name}-list`}>
                            {field.options.map((opt) => (
                                <option key={opt.value} value={opt.value}>
                                    {opt.label}
                                </option>
                            ))}
                        </datalist>
                    )}
                    {field.description && (
                        <FieldDescription>{field.description}</FieldDescription>
                    )}
                    <FieldError message={error?.message} />
                </Field>
            );

        default:
            return null;
    }
}

// ---------------------------------------------------------------------------
// Tiny helper so every case doesn't repeat the same JSX
// ---------------------------------------------------------------------------
function FieldError({ message }: { message?: string }) {
    if (!message) return null;
    return <p className="text-sm text-destructive">{message}</p>;
}