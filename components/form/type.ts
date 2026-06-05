export interface FormFieldConfig {
    name: string;
    label: string;
    type:
    | "text"
    | "email"
    | "number"
    | "integer"
    | "float"
    | "select"
    | "dropdown"
    | "switch"
    | "textarea"
    | "autocomplete"
    | "button-form";

    placeholder?: string;
    description?: string;
    required?: boolean;
    editable?: boolean;
    min?: number;
    max?: number;
    minLength?: number;
    maxLength?: number;

    options?: {
        label: string;
        value: string;
    }[];

    fetchOptions?: (
        search?: string
    ) => Promise<
        {
            label: string;
            value: string;
        }[]
    >;

    multiselect?: boolean;

    buttonConfig?: {
        buttonText: string;
        rows: FormRow[];
    };
}

export interface FormRow {
    fields: FormFieldConfig[];
}

export interface FormSection {
    title: string;
    description?: string;
    rows: FormRow[];
}