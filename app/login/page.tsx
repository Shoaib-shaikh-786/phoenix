'use client'
import { useState, useRef, useEffect, KeyboardEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";
import {
    Loader2, Shield, Building2, User, Briefcase, Users, ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

// ─── Types ────────────────────────────────────────────────────────────────────

type Role = "Wholesaler" | "Dealer" | "Salesman" | "Staff";

interface RoleInfo {
    role: Role;
    wholesaler_name: string;
}

// ─── Role config ──────────────────────────────────────────────────────────────

const ROLE_META: Record<Role, { icon: React.ReactNode; color: string; description: string }> = {
    Wholesaler: {
        icon: <Building2 className="h-4 w-4" />,
        color: "bg-violet-100 text-violet-700 border-violet-200",
        description: "Wholesale account access",
    },
    Dealer: {
        icon: <Briefcase className="h-4 w-4" />,
        color: "bg-blue-100 text-blue-700 border-blue-200",
        description: "Dealer portal access",
    },
    Salesman: {
        icon: <User className="h-4 w-4" />,
        color: "bg-emerald-100 text-emerald-700 border-emerald-200",
        description: "Sales dashboard access",
    },
    Staff: {
        icon: <Users className="h-4 w-4" />,
        color: "bg-amber-100 text-amber-700 border-amber-200",
        description: "Staff portal access",
    },
};

// ─── PIN Input ────────────────────────────────────────────────────────────────

function PinInput({
    value,
    onChange,
    length = 6,
    disabled,
}: {
    value: string;
    onChange: (v: string) => void;
    length?: number;
    disabled?: boolean;
}) {
    const inputs = useRef<(HTMLInputElement | null)[]>([]);

    const handleChange = (index: number, char: string) => {
        if (!/^\d*$/.test(char)) return;
        const digits = value.split("");
        digits[index] = char.slice(-1);
        const next = digits.join("");
        onChange(next);
        if (char && index < length - 1) inputs.current[index + 1]?.focus();
    };

    const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Backspace" && !value[index] && index > 0) {
            inputs.current[index - 1]?.focus();
            const digits = value.split("");
            digits[index - 1] = "";
            onChange(digits.join(""));
        }
    };

    const handlePaste = (e: React.ClipboardEvent) => {
        const paste = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, length);
        onChange(paste.padEnd(length, "").slice(0, length));
        if (paste.length > 0) inputs.current[Math.min(paste.length, length - 1)]?.focus();
        e.preventDefault();
    };

    return (
        <div className="flex gap-2 justify-center" onPaste={handlePaste}>
            {Array.from({ length }).map((_, i) => (
                <input
                    key={i}
                    ref={(el) => { inputs.current[i] = el; }}
                    type="password"
                    inputMode="numeric"
                    maxLength={1}
                    value={value[i] ?? ""}
                    disabled={disabled}
                    onChange={(e) => handleChange(i, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(i, e)}
                    onFocus={(e) => e.target.select()}
                    className={cn(
                        "w-11 h-12 text-center text-lg font-semibold rounded-lg border-2 bg-background",
                        "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-1",
                        "transition-all duration-150",
                        value[i] ? "border-primary text-primary" : "border-input text-foreground",
                        disabled && "opacity-50 cursor-not-allowed"
                    )}
                />
            ))}
        </div>
    );
}

// ─── Background Page ──────────────────────────────────────────────────────────

function BackgroundPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 flex items-center justify-center p-4">
            <div className="text-center space-y-3">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary mb-2">
                    <Shield className="h-7 w-7 text-primary-foreground" />
                </div>
                <h1 className="text-3xl font-bold tracking-tight text-foreground">Wholesaler Portal</h1>
                <p className="text-muted-foreground text-sm">Secure access for authorised users</p>
            </div>
        </div>
    );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function LoginPage() {
    const [open, setOpen] = useState(true);
    const [phone, setPhone] = useState("");
    const [pin, setPin] = useState("");
    const [roleInfo, setRoleInfo] = useState<RoleInfo | null>(null);
    const [phoneLoading, setPhoneLoading] = useState(false);
    const [loginLoading, setLoginLoading] = useState(false);
    const [phoneError, setPhoneError] = useState("");
    const [pinError, setPinError] = useState("");

    useEffect(() => { setPhoneError(""); }, [phone]);
    useEffect(() => { setPinError(""); }, [pin]);

    const formatPhone = (raw: string) => {
        const digits = raw.replace(/\D/g, "").slice(0, 10);
        if (digits.length <= 5) return digits;
        if (digits.length <= 8) return `${digits.slice(0, 5)}-${digits.slice(5)}`;
        return `${digits.slice(0, 5)}-${digits.slice(5, 8)}-${digits.slice(8)}`;
    };

    // ── Step 1: look up role ──────────────────────────────────────────────────

    const handlePhoneContinue = async () => {
        const cleaned = phone.replace(/\D/g, "");
        if (cleaned.length < 10) {
            setPhoneError("Please enter a valid 10-digit phone number.");
            return;
        }

        setPhoneLoading(true);
        setPhoneError("");

        try {
            const res = await fetch("/api/auth/role", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ phone: cleaned }),
            });

            if (!res.ok) {
                const body = await res.json().catch(() => ({}));
                throw new Error(body?.message ?? "No account found for this number.");
            }

            const data: RoleInfo = await res.json();
            setRoleInfo({
                role: (data.role.charAt(0).toUpperCase() + data.role.slice(1)) as Role,
                wholesaler_name: data.wholesaler_name || "",
            });
        } catch (err: unknown) {
            setPhoneError(err instanceof Error ? err.message : "Something went wrong.");
        } finally {
            setPhoneLoading(false);
        }
    };

    // ── Step 2: login with PIN ────────────────────────────────────────────────

    const handleLogin = async () => {
        if (pin.length < 4) {
            setPinError("Please enter all 4 digits.");
            return;
        }

        setLoginLoading(true);
        setPinError("");

        try {
            const res = await fetch("/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ phone: phone.replace(/\D/g, ""), pin }),
            });

            if (!res.ok) {
                const body = await res.json().catch(() => ({}));
                throw new Error(body?.message ?? "Incorrect PIN. Please try again.");
            }

            const { token } = await res.json();
            localStorage.setItem("session_token", token);
            window.location.href = "/dashboard";
        } catch (err: unknown) {
            setPinError(err instanceof Error ? err.message : "Login failed.");
            setPin("");
        } finally {
            setLoginLoading(false);
        }
    };

    const roleMeta = roleInfo ? ROLE_META[roleInfo.role] : null;
    const phoneDigits = phone.replace(/\D/g, "");

    return (
        <>
            <BackgroundPage />

            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="sm:max-w-sm gap-0 p-0 overflow-hidden">

                    {/* Header */}
                    <DialogHeader className="px-6 pt-6 pb-4 border-b">
                        <div className="flex items-center gap-3">
                            <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-primary shrink-0">
                                <Shield className="h-4 w-4 text-primary-foreground" />
                            </div>
                            <div>
                                <DialogTitle className="text-base leading-tight">Sign in</DialogTitle>
                                <DialogDescription className="text-xs mt-0.5">

                                </DialogDescription>
                            </div>
                        </div>
                    </DialogHeader>

                    {/* Body */}
                    <div className="px-6 py-5 space-y-5">

                        {/* Phone field */}
                        <div className="space-y-2">
                            <Label htmlFor="phone">Mobile number</Label>
                            <div className="flex">
                                <div className="flex items-center px-3 rounded-l-md border border-r-0 border-input bg-muted text-sm text-muted-foreground select-none">
                                    +91
                                </div>
                                <Input
                                    id="phone"
                                    type="tel"
                                    placeholder="98765-43210"
                                    value={formatPhone(phone)}
                                    onChange={(e) => {
                                        setPhone(e.target.value.replace(/\D/g, "").slice(0, 10));
                                        if (roleInfo) { setRoleInfo(null); setPin(""); }
                                    }}
                                    onKeyDown={(e) => e.key === "Enter" && !roleInfo && handlePhoneContinue()}
                                    className="rounded-l-none"
                                    autoFocus
                                    disabled={phoneLoading || loginLoading}
                                />
                                {/* Inline "Check" button when role not yet resolved */}
                                {!roleInfo && (
                                    <Button
                                        variant="default"
                                        size="sm"
                                        className="ml-2 shrink-0"
                                        onClick={handlePhoneContinue}
                                        disabled={phoneLoading || phoneDigits.length < 10}
                                    >
                                        {phoneLoading
                                            ? <Loader2 className="h-4 w-4 animate-spin" />
                                            : <ChevronRight className="h-4 w-4" />
                                        }
                                    </Button>
                                )}
                            </div>

                            {phoneError && (
                                <p className="text-xs text-destructive bg-destructive/10 px-3 py-2 rounded-md">
                                    {phoneError}
                                </p>
                            )}
                        </div>

                        {/* Role pill + PIN — only shown after successful role lookup */}
                        {roleInfo && roleMeta && (
                            <div className="space-y-5 animate-in fade-in slide-in-from-top-2 duration-300">

                                {/* Role pill */}
                                <div className={cn(
                                    "flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-medium",
                                    roleMeta.color
                                )}>
                                    {roleMeta.icon}
                                    <span className="font-semibold">{roleInfo.wholesaler_name}</span>
                                    <span className="opacity-40 mx-0.5">·</span>
                                    <span className="opacity-70">{roleInfo.role}</span>
                                    <Badge variant="outline" className={cn("ml-auto text-xs border shrink-0", roleMeta.color)}>
                                        {roleMeta.description}
                                    </Badge>
                                </div>

                                {/* PIN field */}
                                <div className="space-y-3">
                                    <Label className="block text-center text-sm text-muted-foreground">
                                        Enter your 4-digit PIN
                                    </Label>
                                    <PinInput
                                        value={pin}
                                        onChange={setPin}
                                        length={4}
                                        disabled={loginLoading}
                                    />
                                    {pinError && (
                                        <p className="text-xs text-destructive bg-destructive/10 px-3 py-2 rounded-md text-center">
                                            {pinError}
                                        </p>
                                    )}
                                </div>

                                <Button
                                    className="w-full"
                                    onClick={handleLogin}
                                    disabled={loginLoading || pin.length < 4}
                                >
                                    {loginLoading ? (
                                        <><Loader2 className="h-4 w-4 mr-2 animate-spin" />Signing in…</>
                                    ) : (
                                        <>Sign in <Shield className="h-4 w-4 ml-1" /></>
                                    )}
                                </Button>
                            </div>
                        )}
                    </div>

                    {/* Footer */}
                    <div className="px-6 pb-5">
                        <p className="text-center text-xs text-muted-foreground">
                            Need help? Contact your administrator.
                        </p>
                    </div>

                </DialogContent>
            </Dialog>
        </>
    );
}