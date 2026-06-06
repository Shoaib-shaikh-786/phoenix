import { useState, useCallback } from "react";
import { PackagePlus } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { GenericForm } from "@/components/form/form-wrapper";
import { FormSection } from "@/components/form/type";
import { Button } from "../ui/button";
import { GenericDataTable } from "../list-shell/data-list-wrapper";
import { productItems } from "@/types/product"

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


interface ProductModalState {
    open: boolean;
    saving: boolean;
    product: {
        id?: string;
        name?: string;
        category?: string;
        quantity?: string;
        unit?: string;
        price?: string;
        description?: string;
    } | null;
}

export function useProductModal({ openAddCategoryDialog }: { openAddCategoryDialog?: () => void }) {
    const [state, setState] =
        useState<ProductModalState>({
            open: false,
            saving: false,
            product: null
        });

    const openDialog = useCallback((product?: ProductModalState["product"]) => {
        setState({
            open: true,
            saving: false,
            product: product ?? null,
        });
    }, []);

    const closeDialog = useCallback(() => {
        setState({
            open: false,
            saving: false,
            product: null
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
                                { label: "Edible Oil", value: "Edible Oil" },
                                { label: "Rice", value: "Rice" },
                                { label: "Pulses", value: "Pulses" },
                                { label: "Sugar", value: "Sugar" },
                                { label: "Staples", value: "Staples" },  // ← added for itm-003
                                { label: "Wheat Flour", value: "Wheat Flour" },
                                { label: "Flour", value: "Flour" },  // ← added for itm-004
                                { label: "Spices", value: "Spices" },
                                { label: "Dry Fruits", value: "Dry Fruits" },
                                { label: "Tea & Coffee", value: "Tea & Coffee" },
                                { label: "Dairy Products", value: "Dairy Products" },
                                { label: "Packaged Foods", value: "Packaged Foods" },
                                { label: "Beverages", value: "Beverages" },
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
                            name: "unit",
                            label: "Unit",
                            type: "dropdown",
                            options: [
                                { label: 'kg', value: 'kg' },
                                { label: 'liter', value: 'liter' },
                                { label: 'pieces', value: 'pieces' },
                                { label: 'box', value: 'box' },
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
                            name: "description",
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
                            <DialogTitle className="text-lg leading-6">{state.product ? "Update Product" : "Add Product"}</DialogTitle>
                            <DialogDescription className="text-sm">
                                {state.product ? "Update an existing Product" : "Add a new Product"}
                            </DialogDescription>
                        </div>
                        {
                            !state.product &&
                            <Button onClick={openAddCategoryDialog}>Add Categories</Button>
                        }
                    </div>
                </DialogHeader>
                <div className="px-6 py-6">
                    <GenericForm
                        sections={sections}
                        onSubmit={handleSave}
                        defaultValues={{
                            name: state.product?.name ?? "",
                            category: state.product?.category ?? "",
                            quantity: state.product?.quantity ?? "",
                            unit: state.product?.unit ?? "",
                            price: state.product?.price ?? "",
                            description: state.product?.description ?? ""
                        }}
                        submitButtonText={state.product ? "Update Product" : "Add Product"}
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



interface AddCategoriesModalState {
    open: boolean;
    saving: boolean;
}

export function useAddCategoriesModal() {
    const [state, setState] =
        useState<AddCategoriesModalState>({
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

    const columns = [
        {
            header: "Category",
            accessorKey: "category",
        },
    ];

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
                    ],
                },
            ],
        },
    ];

    const dialog = (
        <>
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
                                    Add Category
                                </DialogDescription>
                            </div>
                        </div>
                    </DialogHeader>
                    <div className="px-6 py-6">
                        <GenericForm
                            sections={sections}
                            onSubmit={handleSave}
                            submitButtonText="Add Category"
                            isSubmitting={state.saving}
                        />
                    </div>
                    <GenericDataTable data={productItems} columns={columns} getRowId={(row) => row.id} enableDragAndDrop={false} enableSelection={false} enablePagination={true} enableColumnVisibility={false} pageSize={10} />
                </DialogContent>
            </Dialog>
        </>
    );

    return {
        dialog,
        openDialog,
        closeDialog,
    };
}