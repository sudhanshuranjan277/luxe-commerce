import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, CreditCard, Wallet, Smartphone, ChevronRight, Lock, PartyPopper } from "lucide-react";
import { useStore, cartTotals } from "@/store/useStore";
import { formatPrice } from "@/lib/format";

export const Route = createFileRoute("/checkout")({ component: Checkout });

const steps = ["Shipping", "Payment", "Review"];

function Checkout() {
  const items = useStore((s) => s.items);
  const clear = useStore((s) => s.clear);
  const { subtotal, shipping, tax, total } = cartTotals(items);
  const [step, setStep] = useState(0);
  const [success, setSuccess] = useState(false);
  const [pay, setPay] = useState("card");

  if (success) return <SuccessScreen />;

  const next = () => {
    if (step === steps.length - 1) {
      setSuccess(true);
      setTimeout(() => clear(), 800);
    } else setStep(step + 1);
  };

  return (
    <div className="mx-auto max-w-[1400px] px-5 lg:px-10 py-12 lg:py-16">
      <h1 className="font-display text-4xl lg:text-6xl mb-2">Checkout</h1>

      <div className="flex items-center gap-2 mt-8 mb-12">
        {steps.map((s, i) => (
          <div key={s} className="flex items-center gap-2">
            <div className={`size-8 rounded-full grid place-items-center text-xs font-medium transition ${
              i < step ? "bg-emerald-600 text-white" : i === step ? "bg-foreground text-background" : "bg-secondary text-muted-foreground"
            }`}>
              {i < step ? <Check className="size-4" /> : i + 1}
            </div>
            <span className={`text-sm ${i === step ? "font-medium" : "text-muted-foreground"}`}>{s}</span>
            {i < steps.length - 1 && <ChevronRight className="size-4 text-muted-foreground mx-2" />}
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-[1fr_420px] gap-12">
        <div>
          <AnimatePresence mode="wait">
            <motion.div key={step} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              {step === 0 && <ShippingForm />}
              {step === 1 && <PaymentForm pay={pay} setPay={setPay} />}
              {step === 2 && <ReviewStep />}
            </motion.div>
          </AnimatePresence>

          <div className="mt-10 flex justify-between items-center">
            {step > 0 ? (
              <button onClick={() => setStep(step - 1)} className="text-sm text-muted-foreground hover:text-foreground">← Back</button>
            ) : (
              <Link to="/cart" className="text-sm text-muted-foreground hover:text-foreground">← Back to bag</Link>
            )}
            <button onClick={next} className="px-8 h-12 rounded-full bg-foreground text-background font-medium inline-flex items-center gap-2">
              {step === steps.length - 1 ? "Place order" : "Continue"} <ChevronRight className="size-4" />
            </button>
          </div>
        </div>

        <aside className="lg:sticky lg:top-28 self-start space-y-4">
          <div className="p-6 rounded-2xl border border-border bg-card">
            <h3 className="font-display text-xl mb-4">Order</h3>
            <div className="space-y-3 max-h-72 overflow-y-auto pr-2">
              {items.map((i) => (
                <div key={`${i.id}-${i.size}-${i.color}`} className="flex gap-3">
                  <div className="size-14 rounded-lg overflow-hidden bg-secondary"><img src={i.image} className="size-full object-cover" /></div>
                  <div className="flex-1 text-sm">
                    <div>{i.name}</div>
                    <div className="text-xs text-muted-foreground">Qty {i.qty}</div>
                  </div>
                  <div className="text-sm font-medium">{formatPrice(i.price * i.qty)}</div>
                </div>
              ))}
            </div>
            <div className="border-t border-border mt-4 pt-4 space-y-1.5 text-sm">
              <Row l="Subtotal" v={formatPrice(subtotal)} />
              <Row l="Shipping" v={shipping ? formatPrice(shipping) : "Free"} />
              <Row l="Tax" v={formatPrice(tax)} />
              <div className="flex justify-between text-lg font-display pt-3 border-t border-border mt-3">
                <span>Total</span><span>{formatPrice(total)}</span>
              </div>
            </div>
          </div>
          <div className="text-xs text-muted-foreground text-center inline-flex items-center justify-center gap-2 w-full">
            <Lock className="size-3" /> Encrypted checkout
          </div>
        </aside>
      </div>
    </div>
  );
}

function Field({ label, ...props }: React.InputHTMLAttributes<HTMLInputElement> & { label: string }) {
  return (
    <label className="relative block">
      <input {...props} placeholder=" " className="peer w-full h-14 rounded-xl border border-border bg-card px-4 pt-4 outline-none focus:border-foreground transition" />
      <span className="absolute left-4 top-1.5 text-[10px] uppercase tracking-widest text-muted-foreground peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-placeholder-shown:tracking-normal peer-focus:top-1.5 peer-focus:text-[10px] peer-focus:tracking-widest transition-all">
        {label}
      </span>
    </label>
  );
}

function ShippingForm() {
  return (
    <div className="space-y-4">
      <h2 className="font-display text-2xl mb-2">Shipping address</h2>
      <div className="grid grid-cols-2 gap-4">
        <Field label="First name" />
        <Field label="Last name" />
      </div>
      <Field label="Email" type="email" />
      <Field label="Address" />
      <div className="grid grid-cols-2 gap-4">
        <Field label="City" />
        <Field label="ZIP" />
      </div>
      <Field label="Country" defaultValue="United States" />
    </div>
  );
}

function PaymentForm({ pay, setPay }: { pay: string; setPay: (v: string) => void }) {
  const methods = [
    { v: "card", l: "Credit card", i: CreditCard },
    { v: "paypal", l: "PayPal", i: Wallet },
    { v: "apple", l: "Apple Pay", i: Smartphone },
  ];
  return (
    <div className="space-y-5">
      <h2 className="font-display text-2xl">Payment</h2>
      <div className="grid grid-cols-3 gap-3">
        {methods.map((m) => (
          <button key={m.v} onClick={() => setPay(m.v)} className={`p-4 rounded-2xl border-2 text-left transition ${pay === m.v ? "border-foreground bg-foreground/5" : "border-border"}`}>
            <m.i className="size-6 mb-3" />
            <div className="text-sm font-medium">{m.l}</div>
          </button>
        ))}
      </div>
      {pay === "card" && (
        <div className="space-y-4">
          <Field label="Card number" defaultValue="4242 4242 4242 4242" />
          <div className="grid grid-cols-2 gap-4">
            <Field label="Expires" defaultValue="12/28" />
            <Field label="CVC" defaultValue="123" />
          </div>
          <Field label="Name on card" />
        </div>
      )}
    </div>
  );
}

function ReviewStep() {
  return (
    <div className="space-y-4">
      <h2 className="font-display text-2xl">Review</h2>
      <p className="text-muted-foreground">Please confirm your details before placing the order. By proceeding you agree to our terms.</p>
      <div className="p-5 rounded-2xl border border-border bg-card text-sm space-y-2">
        <div className="text-xs uppercase tracking-widest text-muted-foreground">Delivery to</div>
        <div>1 Park Ave · New York, NY 10016 · United States</div>
        <div className="text-muted-foreground text-xs">Estimated delivery: 2–4 business days</div>
      </div>
    </div>
  );
}

function Row({ l, v }: { l: string; v: string }) {
  return <div className="flex justify-between"><span className="text-muted-foreground">{l}</span><span>{v}</span></div>;
}

function SuccessScreen() {
  return (
    <div className="min-h-[80vh] grid place-items-center px-5 text-center relative overflow-hidden">
      {Array.from({ length: 24 }).map((_, i) => (
        <motion.span key={i}
          initial={{ y: -20, x: Math.random() * 800 - 400, opacity: 1, rotate: 0 }}
          animate={{ y: 800, rotate: 720, opacity: 0 }}
          transition={{ duration: 3 + Math.random() * 2, delay: Math.random(), ease: "easeOut" }}
          className="absolute top-0 size-2 rounded-sm"
          style={{ background: ["#caa45a", "#cdb898", "#ed6b3a", "#324b3f"][i % 4] }}
        />
      ))}
      <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="relative">
        <div className="size-24 mx-auto rounded-full bg-emerald-100 dark:bg-emerald-900/30 grid place-items-center mb-6">
          <PartyPopper className="size-12 text-emerald-600" />
        </div>
        <h1 className="font-display text-5xl lg:text-7xl">Thank you.</h1>
        <p className="mt-4 text-muted-foreground max-w-md mx-auto">
          Your order #ML-{Math.floor(Math.random() * 90000 + 10000)} is confirmed. A receipt is on its way to your inbox.
        </p>
        <Link to="/shop" className="mt-10 inline-flex px-8 py-4 rounded-full bg-foreground text-background">Continue shopping</Link>
      </motion.div>
    </div>
  );
}
