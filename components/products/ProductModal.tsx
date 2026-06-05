import { useState, useCallback } from "react";
import { PackagePlus } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { GenericForm } from "@/components/form/form-wrapper";
import { FormSection } from "@/components/form/type";

interface AddToCartModalState {
    open: boolean;
    saving: boolean;
    product: {
        id?: string;
        name?: string;
        category?: string;
    } | null;
}

export function useAddToCartModal() {
    const [state, setState] =
        useState<AddToCartModalState>({
            open: false,
            saving: false,
            product: null,
        });

    const openDialog = useCallback(
        (product?: AddToCartModalState["product"]) => {
            setState({
                open: true,
                saving: false,
                product: product ?? null,
            });
        },
        []
    );

    const closeDialog = useCallback(() => {
        setState({
            open: false,
            saving: false,
            product: null,
        });
    }, []);

    const handleSave = useCallback(
        async (values: Record<string, unknown>) => {
            try {
                setState((prev) => ({
                    ...prev,
                    saving: true,
                }));
                console.log(values);

                closeDialog();
            } catch (error) {
                console.error(error);
            }
        },
        [closeDialog]
    );

    const sections: FormSection[] = [
        {
            title: "Add To Cart",
            rows: [
                {
                    fields: [
                        {
                            name: "name",
                            label: "Name",
                            type: "text",
                            editable: false,
                            required: true,
                        },
                        {
                            name: "category",
                            label: "Category",
                            type: "text",
                            required: true,
                            editable: false,
                        },
                        {
                            name: "quantity",
                            label: "Quantity",
                            type: "integer",
                            required: true,
                        },
                        {
                            name: "Units",
                            label: "Unit",
                            type: "dropdown",
                            options: [
                                {
                                    label: 'kg',
                                    value: 'Kg',
                                },
                                {
                                    label: 'liter',
                                    value: 'Liters',
                                },
                                {
                                    label: 'pieces',
                                    value: 'Pieces',
                                },
                                {
                                    label: 'box',
                                    value: 'Box',
                                },
                            ],
                            required: true,
                        },
                    ],
                },
                {
                    fields: [
                        {
                            name: "remark",
                            label: "Remark",
                            type: "text",
                        }
                    ]
                }
            ],
        },
    ];

    const dialog = (
        <Dialog
            open={state.open}
            onOpenChange={(isOpen) =>
                !isOpen &&
                !state.saving &&
                closeDialog()
            }
        >
            <DialogContent className="max-w-2xl overflow-hidden bg-card p-0 sm:max-w-2xl [&_form]:space-y-6 [&_button[type=submit]]:ml-auto [&_button[type=submit]]:flex">
                <DialogHeader className="border-b bg-muted/35 px-6 py-5 pr-14 text-left">
                    <div className="flex items-start gap-3">
                        <div className="flex size-10 shrink-0 items-center justify-center rounded-lg border bg-background text-primary shadow-xs">
                            <PackagePlus className="size-5" />
                        </div>
                        <div className="space-y-1">
                            <DialogTitle className="text-lg leading-6">Add To Cart</DialogTitle>
                            <DialogDescription className="text-sm">
                                Add items to cart
                            </DialogDescription>
                        </div>
                    </div>
                </DialogHeader>
                <div className="px-6 py-6">
                    <GenericForm
                        sections={sections}
                        defaultValues={{
                            name: state.product?.name ?? "",
                            category: state.product?.category ?? ""
                        }}
                        onSubmit={handleSave}
                        submitButtonText="Add to Cart"
                        isSubmitting={state.saving}
                    />
                </div>
            </DialogContent>
        </Dialog>
    );

    return {
        dialog,
        openDialog,
        closeDialog,
    };
}


interface AddProductModalState {
    open: boolean;
    saving: boolean;
}

export function useAddProductModal() {
    const [state, setState] =
        useState<AddProductModalState>({
            open: false,
            saving: false,
        });

    const openDialog = useCallback(() => {
        setState({
            open: true,
            saving: false,
        });
    }, []);

    const closeDialog = useCallback(() => {
        setState({
            open: false,
            saving: false,
        });
    }, []);

    const handleSave = useCallback(
        async (values: Record<string, unknown>) => {
            try {
                setState((prev) => ({
                    ...prev,
                    saving: true,
                }));
                console.log(values);

                closeDialog();
            } catch (error) {
                console.error(error);
            }
        },
        [closeDialog]
    );

    const sections: FormSection[] = [
        {
            title: "Product Details",
            rows: [
                {
                    fields: [
                        {
                            name: "name",
                            label: "Name",
                            type: "text",
                            required: true,
                        },
                        {
                            name: "category",
                            label: "Category",
                            type: "dropdown",
                            options: [
                                {
                                    label: "Edible Oil",
                                    value: "edibleOil"
                                },
                                {
                                    label: "Rice",
                                    value: "rice"
                                },
                                {
                                    label: "Pulses",
                                    value: "pulses"
                                },
                                {
                                    label: "Sugar",
                                    value: "sugar"
                                },
                                {
                                    label: "Wheat Flour",
                                    value: "wheatFlour"
                                },
                                {
                                    label: "Spices",
                                    value: "spices"
                                },
                                {
                                    label: "Dry Fruits",
                                    value: "dryFruits"
                                },
                                {
                                    label: "Tea & Coffee",
                                    value: "teaCoffee"
                                },
                                {
                                    label: "Dairy Products",
                                    value: "dairyProducts"
                                },
                                {
                                    label: "Packaged Foods",
                                    value: "packagedFoods"
                                }
                            ]
                        },

                    ],
                },
                {
                    fields: [
                        {
                            name: "quantity",
                            label: "Quantity",
                            type: "integer",
                            required: true,
                        },
                        {
                            name: "Units",
                            label: "Unit",
                            type: "dropdown",
                            options: [
                                {
                                    label: 'kg',
                                    value: 'Kg',
                                },
                                {
                                    label: 'liter',
                                    value: 'Liters',
                                },
                                {
                                    label: 'pieces',
                                    value: 'Pieces',
                                },
                            ],
                            required: true,
                        },
                    ]
                },
                              {
                    fields: [
                        {
                            name: "price",
                            label: "Price",
                            type: "integer",
                            required: true,
                        },
                       
                    ]
                },
                {
                    fields: [
                        {
                            name: "descritpion",
                            label: "Description",
                            type: "text",
                        },
                    ]
                },
            ],
        },
    ];

    const dialog = (
        <Dialog
            open={state.open}
            onOpenChange={(isOpen) =>
                !isOpen &&
                !state.saving &&
                closeDialog()
            }
        >
            <DialogContent className="max-w-2xl overflow-hidden bg-card p-0 sm:max-w-2xl [&_form]:space-y-6 [&_button[type=submit]]:ml-auto [&_button[type=submit]]:flex">
                <DialogHeader className="border-b bg-muted/35 px-6 py-5 pr-14 text-left">
                    <div className="flex items-start gap-3">
                        <div className="flex size-10 shrink-0 items-center justify-center rounded-lg border bg-background text-primary shadow-xs">
                            <PackagePlus className="size-5" />
                        </div>
                        <div className="space-y-1">
                            <DialogTitle className="text-lg leading-6">Add Product</DialogTitle>
                            <DialogDescription className="text-sm">
                                Add a new product to the system.
                            </DialogDescription>
                        </div>
                    </div>
                </DialogHeader>
                <div className="px-6 py-6">
                    <GenericForm
                        sections={sections}
                        onSubmit={handleSave}
                        submitButtonText="Add Product"
                        isSubmitting={state.saving}
                    />
                </div>
            </DialogContent>
        </Dialog>
    );

    return {
        dialog,
        openDialog,
        closeDialog,
    };
}