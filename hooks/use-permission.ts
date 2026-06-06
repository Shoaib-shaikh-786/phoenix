export function usePermissions() {
    function hasPermission(permission: string): boolean {
        console.log(permission);
        return true;
    }

    const isLoading = false;
    return { hasPermission, isLoading };
}