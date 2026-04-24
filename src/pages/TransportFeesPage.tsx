import { IndianRupee, CheckCircle, Clock, AlertCircle, CreditCard, Smartphone, Receipt } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useUser } from "@/contexts/UserContext";

const feeHistory = [
  { id: "TXN001", date: "01 Aug 2024", amount: "₹18,000", type: "Annual Pass", status: "paid", method: "UPI" },
  { id: "TXN002", date: "15 Jan 2024", amount: "₹9,500", type: "Semester Pass", status: "paid", method: "Card" },
  { id: "TXN003", date: "01 Aug 2023", amount: "₹16,000", type: "Annual Pass", status: "paid", method: "UPI" },
];

const TransportFeesPage = () => {
  const { toast } = useToast();
  const { user } = useUser();
  const [paymentMethod, setPaymentMethod] = useState("upi");
  const [upiId, setUpiId] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handlePayment = async () => {
    if (paymentMethod === "upi" && !upiId.trim()) {
      toast({ title: "Enter UPI ID", description: "Please enter your UPI ID to proceed", variant: "destructive" });
      return;
    }
    setIsProcessing(true);
    // Simulate payment processing
    await new Promise((r) => setTimeout(r, 2000));
    setIsProcessing(false);
    setShowSuccess(true);
    toast({ title: "Payment Successful! ✅", description: "₹500 late fee paid successfully via " + paymentMethod.toUpperCase() });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h2 className="text-xl font-bold text-foreground">Transport Fees</h2>
        <p className="text-sm text-muted-foreground">View payment history and pay pending fees</p>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="hover-lift border-0 shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-success/10 flex items-center justify-center">
                <CheckCircle className="h-5 w-5 text-success" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground font-medium">Total Paid</p>
                <p className="text-xl font-bold text-foreground">₹43,500</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="hover-lift border-0 shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-warning/10 flex items-center justify-center">
                <Clock className="h-5 w-5 text-warning" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground font-medium">Pending</p>
                <p className="text-xl font-bold text-foreground">₹500</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="hover-lift border-0 shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-info/10 flex items-center justify-center">
                <CreditCard className="h-5 w-5 text-info" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground font-medium">Next Due</p>
                <p className="text-xl font-bold text-foreground">30 Apr</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Pending Fees with Pay Now */}
      <Card className="border-warning/30 hover-lift shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-warning" /> Pending Fees
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between p-4 bg-warning/5 rounded-xl">
            <div>
              <p className="font-medium text-sm text-foreground">Late Fee - March 2025</p>
              <p className="text-xs text-muted-foreground">Due: 30 Apr 2025 • Student: {user?.name}</p>
            </div>
            <div className="flex items-center gap-3">
              <p className="font-bold text-lg text-foreground">₹500</p>
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="gradient-primary text-primary-foreground gap-2">
                    <IndianRupee className="h-4 w-4" /> Pay Now
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>Pay Transport Fee</DialogTitle>
                  </DialogHeader>
                  {!showSuccess ? (
                    <div className="space-y-6 pt-4">
                      <div className="bg-muted/50 rounded-xl p-4">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Late Fee - March 2025</span>
                          <span className="font-bold text-foreground">₹500</span>
                        </div>
                        <div className="flex justify-between text-sm mt-1">
                          <span className="text-muted-foreground">Student</span>
                          <span className="text-foreground">{user?.name}</span>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <Label className="text-sm font-semibold">Payment Method</Label>
                        <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="space-y-2">
                          <div className={`flex items-center gap-3 p-3 rounded-xl border-2 cursor-pointer transition-all ${paymentMethod === "upi" ? "border-primary bg-accent/50" : "border-border"}`}>
                            <RadioGroupItem value="upi" id="upi" />
                            <Label htmlFor="upi" className="flex items-center gap-2 cursor-pointer flex-1">
                              <Smartphone className="h-4 w-4 text-primary" />
                              <div>
                                <p className="text-sm font-medium">UPI / Google Pay</p>
                                <p className="text-xs text-muted-foreground">Pay via GPay, PhonePe, Paytm</p>
                              </div>
                            </Label>
                          </div>
                          <div className={`flex items-center gap-3 p-3 rounded-xl border-2 cursor-pointer transition-all ${paymentMethod === "card" ? "border-primary bg-accent/50" : "border-border"}`}>
                            <RadioGroupItem value="card" id="card" />
                            <Label htmlFor="card" className="flex items-center gap-2 cursor-pointer flex-1">
                              <CreditCard className="h-4 w-4 text-primary" />
                              <div>
                                <p className="text-sm font-medium">Debit / Credit Card</p>
                                <p className="text-xs text-muted-foreground">Visa, Mastercard, RuPay</p>
                              </div>
                            </Label>
                          </div>
                          <div className={`flex items-center gap-3 p-3 rounded-xl border-2 cursor-pointer transition-all ${paymentMethod === "netbanking" ? "border-primary bg-accent/50" : "border-border"}`}>
                            <RadioGroupItem value="netbanking" id="netbanking" />
                            <Label htmlFor="netbanking" className="flex items-center gap-2 cursor-pointer flex-1">
                              <Receipt className="h-4 w-4 text-primary" />
                              <div>
                                <p className="text-sm font-medium">Net Banking</p>
                                <p className="text-xs text-muted-foreground">All major banks supported</p>
                              </div>
                            </Label>
                          </div>
                        </RadioGroup>
                      </div>

                      {paymentMethod === "upi" && (
                        <div className="space-y-2">
                          <Label>UPI ID</Label>
                          <Input
                            placeholder="yourname@gpay"
                            value={upiId}
                            onChange={(e) => setUpiId(e.target.value)}
                            maxLength={50}
                          />
                        </div>
                      )}

                      <Button
                        className="w-full gradient-primary text-primary-foreground h-12 text-base"
                        onClick={handlePayment}
                        disabled={isProcessing}
                      >
                        {isProcessing ? (
                          <span className="flex items-center gap-2">
                            <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                            Processing...
                          </span>
                        ) : (
                          <>Pay ₹500</>
                        )}
                      </Button>
                    </div>
                  ) : (
                    <div className="text-center py-8 space-y-4">
                      <div className="w-16 h-16 rounded-full bg-success/10 flex items-center justify-center mx-auto">
                        <CheckCircle className="h-8 w-8 text-success" />
                      </div>
                      <h3 className="text-lg font-bold text-foreground">Payment Successful!</h3>
                      <p className="text-sm text-muted-foreground">₹500 paid via {paymentMethod.toUpperCase()}</p>
                      <p className="text-xs text-muted-foreground">Transaction ID: TXN{Date.now().toString().slice(-6)}</p>
                      <DialogClose asChild>
                        <Button variant="outline" className="mt-4" onClick={() => setShowSuccess(false)}>Close</Button>
                      </DialogClose>
                    </div>
                  )}
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Payment History */}
      <Card className="hover-lift border-0 shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <Receipt className="h-4 w-4 text-primary" /> Payment History
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Transaction ID</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Method</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {feeHistory.map((txn) => (
                <TableRow key={txn.id} className="hover:bg-muted/30">
                  <TableCell className="font-mono text-xs">{txn.id}</TableCell>
                  <TableCell className="text-sm">{txn.date}</TableCell>
                  <TableCell className="text-sm">{txn.type}</TableCell>
                  <TableCell className="text-sm">{txn.method}</TableCell>
                  <TableCell className="font-semibold">{txn.amount}</TableCell>
                  <TableCell>
                    <Badge className="bg-success/10 text-success border-0 capitalize gap-1">
                      <CheckCircle className="h-3 w-3" />{txn.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default TransportFeesPage;
